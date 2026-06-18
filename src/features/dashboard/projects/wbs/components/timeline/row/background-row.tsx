import { memo } from "react"
import BackgroundDateItem from "./background-date-item"
import { BackgroundRowWrapper } from "./index.styled"

type RowProps = {
  dates: Date[]
}

function BackgroundRow({ dates }: RowProps) {
  return (
    <BackgroundRowWrapper>
      {dates.map((date) => (
        <BackgroundDateItem key={date.getTime()} date={date} />
      ))}
    </BackgroundRowWrapper>
  )
}

export default memo(BackgroundRow)
