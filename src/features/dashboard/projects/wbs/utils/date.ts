import type { YearMonth } from "@features/dashboard/projects/wbs/types"

export const getDaysDifference = (start: Date, end: Date) => {
  // 날짜만 추출하여 계산
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  const startDate = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  )

  // 날짜 차이 계산 (밀리초 -> 일)
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  return diffDays
}

export const formatDate = (date: Date) => {
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\./g, ". ")
    .trim()
}

/**
 * 현재 날짜를 기준으로 시작 연월과 종료 연월을 계산합니다.
 * @param paddingCount 현재 월 기준으로 앞뒤로 추가할 월의 개수
 * @returns 시작 연월과 종료 연월 객체
 */
export const calculateTimelineRange = (paddingCount = 2) => {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1 // JavaScript의 월은 0부터 시작하므로 +1

  let startMonth = currentMonth - paddingCount
  let startYear = currentYear
  let endMonth = currentMonth + paddingCount
  let endYear = currentYear

  if (startMonth <= 0) {
    startMonth += 12
    startYear -= 1
  }

  if (endMonth > 12) {
    endMonth -= 12
    endYear += 1
  }

  return {
    startYearMonth: { year: startYear, month: startMonth },
    endYearMonth: { year: endYear, month: endMonth },
  }
}

// 해당 월의 모든 날짜 생성
export const getDatesInMonth = (year: number, month: number) => {
  const dates: Date[] = []
  const lastDay = new Date(year, month, 0)

  for (let d = 1; d <= lastDay.getDate(); d++) {
    dates.push(new Date(year, month - 1, d))
  }
  return dates
}

// startYearMonth부터 endYearMonth까지의 모든 날짜 계산
export const getDatesInRange = (
  startYearMonth: YearMonth,
  endYearMonth: YearMonth,
) => {
  const dates: Date[] = []

  let currentYear = startYearMonth.year
  let currentMonth = startYearMonth.month

  while (
    currentYear < endYearMonth.year ||
    (currentYear === endYearMonth.year && currentMonth <= endYearMonth.month)
  ) {
    const monthDates = getDatesInMonth(currentYear, currentMonth)
    dates.push(...monthDates)

    currentMonth++
    if (currentMonth > 12) {
      currentMonth = 1
      currentYear++
    }
  }

  return dates
}
