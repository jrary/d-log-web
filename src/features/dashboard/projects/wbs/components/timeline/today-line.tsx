import {
  TodayLineStartCircle,
  TodayLineWrapper,
} from "@features/dashboard/projects/wbs/components/timeline/index.styled"
import { DATE_ITEM_WIDTH } from "@features/dashboard/projects/wbs/components/timeline/row/constant"
import { useMemo } from "react"

type TodayLineProps = {
  dates: Date[]
}

export default function TodayLine({ dates }: TodayLineProps) {
  const today = useMemo(() => new Date(), [])

  // 오늘 날짜의 위치 계산
  const todayPosition = useMemo(() => {
    const todayString = today.toDateString()
    const dateIndex = dates.findIndex(
      (date) => date.toDateString() === todayString,
    )

    if (dateIndex === -1) return null

    // 날짜 셀의 중앙에 위치하도록 DATE_ITEM_WIDTH/2 추가
    return dateIndex * DATE_ITEM_WIDTH + DATE_ITEM_WIDTH / 2
  }, [dates, today])

  if (todayPosition === null) return null

  return (
    <TodayLineWrapper left={todayPosition}>
      <TodayLineStartCircle />
    </TodayLineWrapper>
  )
}
