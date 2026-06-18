import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useUpdateMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useUpdateMilestoneMutation"
import MilestoneBar from "@features/dashboard/projects/wbs/components/timeline/bar/milestone-bar"
import useGetMilestoneCardHeight from "@features/dashboard/projects/wbs/components/timeline/hooks/useGetMilestoneCardHeight"
import useGetMilestoneCardPosition from "@features/dashboard/projects/wbs/components/timeline/hooks/useGetMilestoneCardPosition"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { memo, useCallback, useState } from "react"
import DateItem from "./DateItem"
import HighlightBar from "./highlight-bar"
import { BarPosition, RowWrapper } from "./index.styled"
import type { MilestoneViewModel } from "@features/dashboard/projects/wbs/types"

type RowProps = {
  milestone: MilestoneViewModel
  dates: Date[]
}

function MilestoneRow({ dates, milestone }: RowProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const queryClient = useQueryClient()

  const clientProjectContractId = useProjectStore((state) =>
    state.getProjectContractId(),
  )

  const { mutateAsync: updateMilestoneMutate } = useUpdateMilestoneMutation(
    clientProjectContractId || 0,
    Number(milestone.id) || 0,
  )
  // useCallback은 DateItem의 리렌더링을 방지하기 위함
  const handleSetHoverIndex = useCallback((index: number | null) => {
    setHoverIndex(index)
  }, [])

  const updateMilestone = useMilestoneStore((state) => state.updateMilestone)
  const milestoneCardHeight = useGetMilestoneCardHeight(milestone)
  const { milestoneCardLeft, milestoneCardWidth } = useGetMilestoneCardPosition(
    milestone,
    dates,
  )

  const handleClickDate = useCallback(
    async (date: Date) => {
      if (!clientProjectContractId) return

      const response = await updateMilestoneMutate({
        milestoneName: milestone.name,
        milestoneObjective: milestone.objective,
        milestoneStartDate: format(date, "yyyy-MM-dd"),
        milestoneEndDate: format(
          new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000),
          "yyyy-MM-dd",
        ),
      })

      if (response.status) {
        // 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: dashboardQueryKey.milestones(
            Number(clientProjectContractId),
          ),
        })
        queryClient.invalidateQueries({
          queryKey: milestonesQueryKey.detail(
            clientProjectContractId,
            milestone.id,
          ),
        })
      }

      updateMilestone(milestone.id, {
        date: {
          startDate: date,
          endDate: new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000),
        },
      })
    },
    [
      milestone.id,
      milestone.name,
      milestone.objective,
      updateMilestone,
      updateMilestoneMutate,
      queryClient,
      clientProjectContractId,
    ],
  )

  return (
    <RowWrapper height={milestoneCardHeight}>
      {dates.map((date, index) => (
        <DateItem
          key={milestone.id + date.getTime()}
          date={date}
          index={index}
          disabled={!!milestone.date}
          setHoverIndex={handleSetHoverIndex}
          onClick={handleClickDate}
        />
      ))}

      {!milestone.date && (
        <HighlightBar hoverIndex={hoverIndex} isVisible={hoverIndex !== null} />
      )}

      {milestone.date && (
        <BarPosition left={milestoneCardLeft} width={milestoneCardWidth}>
          <MilestoneBar milestone={milestone} />
        </BarPosition>
      )}
    </RowWrapper>
  )
}

export default memo(MilestoneRow)
