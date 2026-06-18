import { DATE_ITEM_WIDTH } from "@features/dashboard/projects/wbs/components/timeline/row/constant"
import { useMemo } from "react"
import type { MilestoneViewModel } from "@features/dashboard/projects/wbs/types"

export default function useGetMilestoneCardPosition(
  milestone: MilestoneViewModel,
  dates: Date[],
) {
  const { milestoneCardLeft, milestoneCardWidth } = useMemo(() => {
    if (!milestone.date) return { milestoneCardLeft: 0, milestoneCardWidth: 0 }

    const startDate = milestone.date.startDate
    const endDate = milestone.date.endDate
    const firstDate = dates[0]
    const lastDate = dates[dates.length - 1]

    // 시작 날짜가 dates 범위보다 이전인 경우 첫 번째 날짜부터 시작
    const effectiveStartDate = startDate < firstDate ? firstDate : startDate
    // 종료 날짜가 dates 범위보다 이후인 경우 마지막 날짜까지만 표시
    const effectiveEndDate = endDate > lastDate ? lastDate : endDate

    const startDateIndex = dates.findIndex(
      (date) => date.toDateString() === effectiveStartDate.toDateString(),
    )

    const endDateIndex = dates.findIndex(
      (date) => date.toDateString() === effectiveEndDate.toDateString(),
    )

    // 시작 날짜와 종료 날짜가 모두 dates 범위를 벗어난 경우
    if (startDateIndex === -1 || endDateIndex === -1) {
      return { milestoneCardLeft: 0, milestoneCardWidth: 0 }
    }

    const width = (endDateIndex - startDateIndex + 1) * DATE_ITEM_WIDTH

    return {
      milestoneCardLeft: startDateIndex * DATE_ITEM_WIDTH,
      milestoneCardWidth: width,
    }
  }, [dates, milestone.date])

  return { milestoneCardLeft, milestoneCardWidth }
}
