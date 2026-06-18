import { DATE_ITEM_WIDTH } from "@features/dashboard/projects/wbs/components/timeline/row/constant"
import { useMemo } from "react"
import type { TaskViewModel } from "@features/dashboard/projects/wbs/types"

export default function useGetTaskCardPosition(
  task: TaskViewModel,
  dates: Date[],
) {
  const { taskCardLeft, taskCardWidth } = useMemo(() => {
    if (!task.date) return { taskCardLeft: 0, taskCardWidth: 0 }

    const startDateIndex = dates.findIndex(
      (date) => date.toDateString() === task.date?.startDate.toDateString(),
    )

    const endDateIndex = dates.findIndex(
      (date) => date.toDateString() === task.date?.endDate.toDateString(),
    )

    // 시작 날짜가 dates 배열에 없는 경우 0을 반환
    if (startDateIndex === -1) return { taskCardLeft: 0, taskCardWidth: 0 }

    // 종료 날짜가 dates 배열에 없는 경우 시작 날짜부터 하루 길이로 설정
    const width =
      endDateIndex === -1
        ? DATE_ITEM_WIDTH
        : (endDateIndex - startDateIndex + 1) * DATE_ITEM_WIDTH

    return {
      taskCardLeft: startDateIndex * DATE_ITEM_WIDTH,
      taskCardWidth: width,
    }
  }, [dates, task.date])

  return { taskCardLeft, taskCardWidth }
}
