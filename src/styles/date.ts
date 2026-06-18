import { differenceInDays, differenceInWeeks, format } from "date-fns"

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd")
}

export function formatDateRange(startDate: Date, endDate: Date) {
  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`
}

export function formatDateDifference(startDate: Date, endDate: Date) {
  const difference = differenceInDays(endDate, startDate)

  if (difference < 0) {
    return ""
  }

  if (difference >= 30) {
    return `${differenceInWeeks(endDate, startDate)}주`
  }

  return `${difference}일`
}
