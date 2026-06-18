import { memo, useMemo } from "react"
import { BackgroundDateWrapper } from "./index.styled"

type BackgroundDateItemProps = {
  date: Date
}
function BackgroundDateItem({ date }: BackgroundDateItemProps) {
  const isWeekend = useMemo(() => checkIsWeekend(date), [date])

  return <BackgroundDateWrapper isWeekend={isWeekend} />
}

export default memo(BackgroundDateItem)

// 주말인지 확인 (토요일: 6, 일요일: 0)
const checkIsWeekend = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}
