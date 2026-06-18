import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import { memo, useEffect, useRef } from "react"
import { DateCellWrapper } from "./index.styled"

type DateCellProps = {
  date: Date
  isToday?: boolean
}

/**
 * 날짜를 받아서 "일요일" 형식으로 변환하는 함수
 * @param date 날짜 객체
 * @returns 일과 요일을 포함한 문자열 (예: "1월", "2화", "3수")
 */
const formatDateWithDay = (date: Date): string => {
  const day = date.getDate() // 일자
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()] // 요일

  return `${day} ${dayOfWeek}`
}

function DateCell({ date, isToday = false }: DateCellProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { isReadyForSaveVirtualGrid, addVirtualGrid } = useTimelineStore()

  useEffect(() => {
    if (!ref.current) return
    if (!isReadyForSaveVirtualGrid) return

    const { containerInfo } = useTimelineStore.getState()
    const { right } = ref.current.getBoundingClientRect()

    addVirtualGrid(right + containerInfo.scrollX, date)
  }, [ref, addVirtualGrid, date, isReadyForSaveVirtualGrid])

  return (
    <DateCellWrapper
      ref={ref}
      isToday={isToday}
      className={`date-cell-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}>
      <Text
        typo="caption"
        weight="regular"
        color={isToday ? COLOR.GREEN_500 : COLOR.NEUTRAL_900}>
        {formatDateWithDay(date)}
      </Text>
    </DateCellWrapper>
  )
}

export default memo(DateCell)
