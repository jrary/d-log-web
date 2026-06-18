import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useUpdateMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useUpdateMilestoneMutation"
import useDateRangeText from "@features/dashboard/projects/wbs/components/milestone/hooks/useDateRangeText"
import useDraggableDate from "@features/dashboard/projects/wbs/components/timeline/bar/hooks/useDraggableDate"
import useStickyContent from "@features/dashboard/projects/wbs/components/timeline/bar/hooks/useStickyContent"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { useCallback, useRef } from "react"
import { useNavigate } from "react-router"
import { useSimpleResizeObserver } from "./hooks/useResizeObserver"
import {
  Content,
  ContentWrapper,
  DateTextWrapper,
  MilestoneBarContainer,
  MilestoneBarWrapper,
  MilestoneCalendar,
  MilestoneDateText,
  MilestoneName,
  ResizableMilestoneBarWrapper,
} from "./index.styled"
import type { MilestoneViewModel } from "@features/dashboard/projects/wbs/types"

type MilestoneBarProps = {
  milestone: MilestoneViewModel
}

export default function MilestoneBar({ milestone }: MilestoneBarProps) {
  const navigate = useNavigate()
  const { name } = milestone
  const queryClient = useQueryClient()

  const { isSticky, containerRef, contentWrapperRef } = useStickyContent()

  const updateMilestone = useMilestoneStore((state) => state.updateMilestone)

  const isMoveable = useRef(true)
  const mouseDownTimeRef = useRef<number>(0)
  const isDraggingRef = useRef(false)
  const updatedMilestoneRef = useRef<{
    milestoneId: number
    startDate: Date
    endDate: Date
  } | null>(null)

  const clientProjectContractId = useProjectStore((state) =>
    state.getProjectContractId(),
  )
  const { mutateAsync: updateMilestoneMutate } = useUpdateMilestoneMutation(
    clientProjectContractId || 0,
    Number(milestone.id) || 0,
  )

  // PADDING = 16 * 2 = 32
  const {
    containerRef: wrapperRef,
    contentRef,
    containerWidth: wrapperWidth,
  } = useSimpleResizeObserver(32)

  const dateRangeText = useDateRangeText(milestone)

  const { findClosestCell, resetFindClosestCell } =
    useDraggableDate<MilestoneViewModel>(
      milestone,
      updateMilestone,
      updatedMilestoneRef,
    )

  const handleMouseMove = useCallback(
    (e: MouseEvent, position: "left" | "right" | "center") => {
      if (!isMoveable.current) return

      const currentTime = Date.now()
      const mouseDownDuration = currentTime - mouseDownTimeRef.current

      // 200ms 이상 마우스를 누르고 있을 때만 이동 동작 실행
      if (mouseDownDuration < 200) return

      isDraggingRef.current = true
      findClosestCell(e, position)
    },
    [findClosestCell],
  )

  const handleMouseDown = useCallback(() => {
    mouseDownTimeRef.current = Date.now()
    isDraggingRef.current = false
  }, [])

  const handleMouseUp = useCallback(() => {
    isMoveable.current = true
    resetFindClosestCell()

    const mouseUpTime = Date.now()
    const mouseDownDuration = mouseUpTime - mouseDownTimeRef.current

    // 드래그 했거나 200ms 이상 눌렀을 때만 업데이트 실행
    if (!isDraggingRef.current && mouseDownDuration < 200) {
      navigate(`${milestone.id}`)
      return
    }

    if (!milestone.date?.startDate || !milestone.date?.endDate) return
    if (!clientProjectContractId) return

    updateMilestoneMutate({
      milestoneName: milestone.name,
      milestoneStartDate: format(milestone.date?.startDate, "yyyy-MM-dd"),
      milestoneEndDate: format(milestone.date?.endDate, "yyyy-MM-dd"),
      milestoneObjective: milestone.objective,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKey.milestones(clientProjectContractId),
      })
      queryClient.invalidateQueries({
        queryKey: milestonesQueryKey.detail(
          clientProjectContractId,
          milestone.id,
        ),
      })
    })
  }, [
    resetFindClosestCell,
    milestone,
    updateMilestoneMutate,
    queryClient,
    clientProjectContractId,
    navigate,
  ])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      navigate(`${milestone.id}`)
    },
    [navigate, milestone.id],
  )

  return (
    <MilestoneBarContainer ref={containerRef} onClick={handleClick}>
      <MilestoneBarWrapper>
        <ResizableMilestoneBarWrapper
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </MilestoneBarWrapper>
      <ContentWrapper ref={contentWrapperRef} wrapperWidth={wrapperWidth}>
        <Content
          ref={contentRef}
          wrapperWidth={wrapperWidth}
          isSticky={isSticky}>
          <MilestoneName>{name}</MilestoneName>
          <DateTextWrapper>
            <MilestoneCalendar />
            <MilestoneDateText>{dateRangeText}</MilestoneDateText>
          </DateTextWrapper>
        </Content>
      </ContentWrapper>
    </MilestoneBarContainer>
  )
}
