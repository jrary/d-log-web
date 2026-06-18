import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { usePutProjectTaskDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/usePutProjectTaskDetailQueryObject"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useUpdateMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useUpdateMilestoneMutation"
import wbsToast from "@features/dashboard/projects/wbs/components/shared/wbs-toast"
import useDraggableDate from "@features/dashboard/projects/wbs/components/timeline/bar/hooks/useDraggableDate"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { useTaskStore } from "@features/dashboard/projects/wbs/stores/task"
import { useQueryClient } from "@tanstack/react-query"
import { differenceInDays, format } from "date-fns"
import { useCallback, useRef } from "react"
import { useNavigate } from "react-router"
import EmptyUserProfile from "~icons/local/empty_user_profile.svg"
import UserProfileIcon from "~icons/local/user_profile2.svg"
import { useDualContentResizeObserver } from "./hooks/useResizeObserver"
import {
  ProgressBar,
  ResizeableTaskBarWrapper,
  TaskBarContent,
  TaskBarInfo,
  TaskBarWrapper,
  Tooltip,
} from "./index.styled"
import type { TaskViewModel } from "@features/dashboard/projects/wbs/types"

type TaskBarProps = {
  task: TaskViewModel
}

export default function TaskBar({ task }: TaskBarProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clientProjectContractId = useProjectStore((state) =>
    state.getProjectContractId(),
  )

  const { title, progress } = task
  const updateTask = useTaskStore((state) => state.updateTask)
  const milestones = useMilestoneStore((state) => state.milestones)

  const isMoveable = useRef(true)
  const mouseDownTimeRef = useRef<number>(0)
  const isDraggingRef = useRef(false)

  // 마일스톤 업데이트 여부를 추적하기 위한 ref
  const updatedMilestoneRef = useRef<{
    milestoneId: number
    startDate: Date
    endDate: Date
  } | null>(null)

  // 원래 태스크 상태를 저장하기 위한 ref
  const originalTaskRef = useRef<TaskViewModel | null>(null)

  const projectId = useProjectStore((state) => state.getProjectContractId())
  const { mutateAsync: updateTaskMutate } = usePutProjectTaskDetailQueryObject(
    projectId || 0,
    Number(task.milestoneId) || 0,
    Number(task.id) || 0,
  )

  // 마일스톤 업데이트 mutation 추가
  const { mutateAsync: updateMilestoneMutate } = useUpdateMilestoneMutation(
    projectId || 0,
    Number(task.milestoneId) || 0,
  )

  // GAP = 10 + 20 + 20 = 50
  const {
    containerRef: wrapperRef,
    content1Ref: titleRef,
    content2Ref: infoRef,
    containerWidth: wrapperWidth,
  } = useDualContentResizeObserver(50)

  // useDraggableDate의 반환값으로 마일스톤 업데이트 정보도, updatedMilestoneRef를 추가로 전달
  const { handleCenterDrag, handleLeftRightDrag, resetFindClosestCell } =
    useDraggableDate<TaskViewModel>(task, updateTask, updatedMilestoneRef)

  const handleMouseMove = useCallback(
    (e: MouseEvent, position: "left" | "right" | "center") => {
      if (!isMoveable.current) return

      const currentTime = Date.now()
      const mouseDownDuration = currentTime - mouseDownTimeRef.current

      // 200ms 이상 마우스를 누르고 있을 때만 이동 동작 실행
      if (mouseDownDuration < 200) return

      // 드래그 시작 시 원래 태스크 정보 저장
      if (!isDraggingRef.current) {
        originalTaskRef.current = { ...task }
      }

      isDraggingRef.current = true
      const containerInfo = {
        scrollX:
          document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      }

      if (position === "center") {
        handleCenterDrag(e, containerInfo)
      } else {
        handleLeftRightDrag(e, position === "left", containerInfo)
      }
    },

    [handleCenterDrag, handleLeftRightDrag, task],
  )

  const handleMouseDown = useCallback(() => {
    mouseDownTimeRef.current = Date.now()
    isDraggingRef.current = false
  }, [])

  // 원래 태스크 상태로 되돌리는 함수
  const restoreOriginalTask = useCallback(() => {
    if (originalTaskRef.current) {
      updateTask(originalTaskRef.current.id, originalTaskRef.current)
      originalTaskRef.current = null
    }
  }, [updateTask])

  const handleMouseUp = useCallback(async () => {
    isMoveable.current = true
    resetFindClosestCell()

    const mouseUpTime = Date.now()
    const mouseDownDuration = mouseUpTime - mouseDownTimeRef.current

    // 드래그 했거나 200ms 이상 눌렀을 때만 업데이트 실행
    if (!isDraggingRef.current && mouseDownDuration < 200) {
      navigate(`${task.milestoneId}/tasks/${task.id}`)
      return
    }

    if (!clientProjectContractId) return

    try {
      // 마일스톤도 함께 업데이트해야 하는 경우 마일스톤 업데이트 API 호출
      if (updatedMilestoneRef.current) {
        const { milestoneId, startDate, endDate } = updatedMilestoneRef.current

        // 마일스톤 이름 가져오기
        const milestone = milestones.find((m) => m.id === milestoneId)
        if (!milestone) return

        await updateMilestoneMutate({
          milestoneName: milestone.name,
          milestoneObjective: milestone.objective,
          milestoneStartDate: format(startDate, "yyyy-MM-dd"),
          milestoneEndDate: format(endDate, "yyyy-MM-dd"),
        })

        // 업데이트 후 ref 초기화
        updatedMilestoneRef.current = null
      }

      // 태스크 업데이트 API 호출
      await updateTaskMutate({
        taskName: task.title,
        expectedStartDate: task.date?.startDate
          ? format(task.date?.startDate, "yyyy-MM-dd")
          : undefined,
        expectedEndDate: task.date?.endDate
          ? format(task.date?.endDate, "yyyy-MM-dd")
          : undefined,
        projectWorkerIdList: task.projectWorkerList?.map((worker) => worker.id),
      })

      // 성공 시 원본 태스크 참조 초기화
      originalTaskRef.current = null

      // 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: milestonesQueryKey.tasks(
          clientProjectContractId,
          Number(task.milestoneId),
          undefined,
        ),
      })
      queryClient.invalidateQueries({
        queryKey: milestonesQueryKey.sideMenuTasks(
          clientProjectContractId,
          Number(task.milestoneId),
          undefined,
        ),
      })
      queryClient.invalidateQueries({
        queryKey: dashboardTaskQueryKey.taskDetail(
          clientProjectContractId,
          task.id,
        ),
      })
    } catch (error) {
      console.error("태스크 수정 중 오류 발생:", error)
      wbsToast.error("태스크 수정 중 오류가 발생했습니다.")

      // 에러 발생 시 원래 상태로 되돌림
      restoreOriginalTask()

      // 쿼리 다시 가져오기
      queryClient.invalidateQueries({
        queryKey: milestonesQueryKey.tasks(
          clientProjectContractId,
          Number(task.milestoneId),
          undefined,
        ),
      })
      queryClient.invalidateQueries({
        queryKey: milestonesQueryKey.sideMenuTasks(
          clientProjectContractId,
          Number(task.milestoneId),
          undefined,
        ),
      })
      queryClient.invalidateQueries({
        queryKey: dashboardTaskQueryKey.taskDetail(
          clientProjectContractId,
          task.id,
        ),
      })
    }
  }, [
    resetFindClosestCell,
    task,
    updateTaskMutate,
    updatedMilestoneRef,
    milestones,
    updateMilestoneMutate,
    clientProjectContractId,
    queryClient,
    navigate,
    restoreOriginalTask,
  ])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      navigate(`${task.milestoneId}/tasks/${task.id}`)
    },
    [navigate, task.milestoneId, task.id],
  )

  return (
    <TaskBarWrapper onClick={handleClick}>
      <ResizeableTaskBarWrapper
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        <ProgressBar progress={progress} />
      </ResizeableTaskBarWrapper>
      <TaskBarContent wrapperWidth={wrapperWidth}>
        <Text
          ref={titleRef}
          className="task-bar-title-text"
          typo="body3"
          weight="medium"
          color={COLOR.NEUTRAL_100}>
          {title}
        </Text>
        <TaskBarInfo className="task-bar-info" ref={infoRef}>
          <Text
            className="task-bar-progress-text"
            typo="body3"
            weight="medium"
            color={COLOR.NEUTRAL_100}>
            {progress}%
          </Text>
          <UserProfile projectWorkerList={task.projectWorkerList} />
        </TaskBarInfo>
        <Tooltip>
          {task.date?.startDate && task.date?.endDate
            ? `${format(task.date.startDate, "M")}월 ${format(
                task.date.startDate,
                "d",
              )}일 ~ ${format(task.date.endDate, "M")}월 ${format(
                task.date.endDate,
                "d",
              )}일 (${
                differenceInDays(task.date.endDate, task.date.startDate) + 1
              }일)`
            : "기간이 설정되지 않았습니다"}
        </Tooltip>
      </TaskBarContent>
    </TaskBarWrapper>
  )
}

// TODO: 서버에서 반환해주는 정보에 따라 로직 작성
const UserProfile = ({
  projectWorkerList,
}: Pick<TaskViewModel, "projectWorkerList">) => {
  if (!projectWorkerList || projectWorkerList.length === 0)
    return <EmptyUserProfile />

  return <UserProfileIcon width={24} height={24} />
}
