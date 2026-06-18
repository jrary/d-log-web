import DateCell from "@features/dashboard/projects/wbs/components/timeline/date-row/date-cell"
import { useCallback, useMemo } from "react"
import { DateRowWrapper } from "./index.styled"

type DateRowProps = {
  dates: Date[]
}

export default function DateRow({ dates }: DateRowProps) {
  const today = useMemo(() => new Date(), [])
  const isToday = useCallback(
    (date: Date) => date.toDateString() === today.toDateString(),
    [today],
  )

  return (
    <DateRowWrapper>
      {dates.map((date) => (
        <DateCell key={date.getTime()} date={date} isToday={isToday(date)} />
      ))}
    </DateRowWrapper>
  )
}
