import DateItem from "@features/dashboard/projects/wbs/components/timeline/row/DateItem"
import { memo } from "react"
import { RowWrapper } from "./index.styled"

type RowProps = {
  height: number
  dates: Date[]
}

function EmptyRow({ height, dates }: RowProps) {
  return (
    <RowWrapper height={height}>
      {dates.map((date, index) => (
        <DateItem key={date.getTime()} date={date} index={index} disabled />
      ))}
    </RowWrapper>
  )
}

export default memo(EmptyRow)
