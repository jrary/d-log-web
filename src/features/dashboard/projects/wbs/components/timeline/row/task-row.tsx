import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { usePutProjectTaskDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/usePutProjectTaskDetailQueryObject"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import wbsToast from "@features/dashboard/projects/wbs/components/shared/wbs-toast"
import TaskBar from "@features/dashboard/projects/wbs/components/timeline/bar/task-bar"
import useGetTaskCardHeight from "@features/dashboard/projects/wbs/components/timeline/hooks/useGetTaskCardHeight"
import useGetTaskCardPosition from "@features/dashboard/projects/wbs/components/timeline/hooks/useGetTaskCardPosition"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { useQueryClient } from "@tanstack/react-query"
import {
  addDays,
  differenceInDays,
  format,
  isAfter,
  isBefore,
  min,
  startOfDay,
} from "date-fns"
import { memo, useCallback, useMemo, useState } from "react"
import DateItem from "./DateItem"
import HighlightBar from "./highlight-bar"
import { BarPosition, RowWrapper } from "./index.styled"
import type {
  MilestoneViewModel,
  TaskViewModel,
} from "@features/dashboard/projects/wbs/types"

type RowProps = {
  milestone: MilestoneViewModel
  task: TaskViewModel
  dates: Date[]
  className?: string
}

function TaskRow({ dates, task, className, milestone }: RowProps) {
  const queryClient = useQueryClient()
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const clientProjectContractId = useProjectStore((state) =>
    state.getProjectContractId(),
  )
  const { mutateAsync: updateTaskMutate } = usePutProjectTaskDetailQueryObject(
    Number(clientProjectContractId),
    Number(milestone.id),
    Number(task.id),
  )

  // useCallback은 DateItem의 리렌더링을 방지하기 위함
  const handleSetHoverIndex = useCallback((index: number | null) => {
    setHoverIndex(index)
  }, [])

  const taskCardHeight = useGetTaskCardHeight(task)
  const { taskCardLeft, taskCardWidth } = useGetTaskCardPosition(task, dates)

  const handleClickDate = useCallback(
    async (date: Date) => {
      if (!clientProjectContractId || !milestone.id || !task.id) return

      const startDate = startOfDay(date)
      let endDate = addDays(startDate, 6) // 기본 7일

      // 마일스톤 종료일이 있는 경우, 종료일을 넘지 않도록 조정
      if (milestone.date?.endDate) {
        const milestoneEndDate = startOfDay(new Date(milestone.date.endDate))
        endDate = min([endDate, milestoneEndDate])
      }

      const response = await updateTaskMutate({
        taskName: task.title,
        expectedStartDate: format(startDate, "yyyy-MM-dd"),
        expectedEndDate: format(endDate, "yyyy-MM-dd"),
        projectWorkerIdList:
          task.projectWorkerList?.map((worker) => worker.id) ?? [],
      })

      if (response.status === 200) {
        queryClient.invalidateQueries({
          queryKey: milestonesQueryKey.tasks(
            clientProjectContractId,
            milestone.id,
            undefined,
          ),
        })
        queryClient.invalidateQueries({
          queryKey: dashboardTaskQueryKey.taskDetail(
            clientProjectContractId,
            task.id,
          ),
        })
      } else {
        wbsToast.error("태스크 업데이트 중 오류가 발생했습니다.")
      }
    },
    [
      updateTaskMutate,
      task.id,
      task.projectWorkerList,
      task.title,
      milestone.id,
      milestone.date?.endDate,
      clientProjectContractId,
      queryClient,
    ],
  )

  const isDateOutOfMilestoneRange = useCallback(
    (date: Date) => {
      if (!milestone.date?.startDate || !milestone.date?.endDate) return false
      const currentDate = startOfDay(date)
      const milestoneStartDate = startOfDay(new Date(milestone.date.startDate))
      const milestoneEndDate = startOfDay(new Date(milestone.date.endDate))

      return (
        isBefore(currentDate, milestoneStartDate) ||
        isAfter(currentDate, milestoneEndDate)
      )
    },
    [milestone.date?.startDate, milestone.date?.endDate],
  )

  const getHighlightBarWidth = useCallback(
    (hoverIndex: number | null) => {
      if (hoverIndex === null || !milestone.date?.endDate) return 7

      const hoverDate = dates[hoverIndex]
      const milestoneEndDate = startOfDay(new Date(milestone.date.endDate))
      const daysUntilEnd = differenceInDays(milestoneEndDate, hoverDate) + 1

      // 남은 일수가 7일보다 작으면 남은 일수만큼만 표시, 아니면 7일
      return Math.min(7, Math.max(1, daysUntilEnd))
    },
    [dates, milestone.date?.endDate],
  )

  const highlightBarWidth = useMemo(
    () => getHighlightBarWidth(hoverIndex),
    [getHighlightBarWidth, hoverIndex],
  )

  return (
    <RowWrapper height={taskCardHeight} className={className}>
      {dates.map((date, index) => (
        <DateItem
          key={task.id + date.getTime()}
          date={date}
          index={index}
          disabled={!!task.date || isDateOutOfMilestoneRange(date)}
          setHoverIndex={handleSetHoverIndex}
          onClick={handleClickDate}
        />
      ))}

      {!task.date && (
        <HighlightBar
          hoverIndex={hoverIndex}
          isVisible={hoverIndex !== null}
          count={highlightBarWidth}
        />
      )}

      {task.date && (
        <BarPosition left={taskCardLeft} width={taskCardWidth}>
          <TaskBar task={task} />
        </BarPosition>
      )}
    </RowWrapper>
  )
}

export default memo(TaskRow)
