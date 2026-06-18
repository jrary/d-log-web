import { memo, useCallback, useMemo } from "react"
import { DateWrapper } from "./index.styled"

type DateItemProps = {
  date: Date
  index: number
  setHoverIndex?: (index: number | null) => void
  disabled?: boolean
  onClick?: (date: Date) => void
}
function DateItem({
  date,
  index,
  setHoverIndex,
  disabled,
  onClick,
}: DateItemProps) {
  const isWeekend = useMemo(() => checkIsWeekend(date), [date])

  const handleMouseEnter = useCallback(() => {
    if (disabled) return
    setHoverIndex?.(index)
  }, [index, setHoverIndex, disabled])

  const handleMouseLeave = useCallback(() => {
    if (disabled) return
    setHoverIndex?.(null)
  }, [setHoverIndex, disabled])

  return (
    <DateWrapper
      isWeekend={isWeekend}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      onClick={() => onClick?.(date)}
    />
  )
}

export default memo(DateItem)

// 주말인지 확인 (토요일: 6, 일요일: 0)
const checkIsWeekend = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}
