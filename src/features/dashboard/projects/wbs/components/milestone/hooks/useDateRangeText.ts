import {
  formatDate,
  getDaysDifference,
} from "@features/dashboard/projects/wbs/utils/date"
import { useMemo } from "react"
import type { MilestoneViewModel } from "@features/dashboard/projects/wbs/types"

export default function useDateRangeText(milestone: MilestoneViewModel) {
  const { date } = milestone

  const dateRangeText = useMemo(
    () =>
      date
        ? `${formatDate(date.startDate)}~${formatDate(date.endDate)} (${getDaysDifference(
            date.startDate,
            date.endDate,
          )}일)`
        : "기간을 설정해 주세요.",
    [date],
  )

  return dateRangeText
}
