import { Text } from "@components/shared-components/text"
import { differenceInDays, differenceInMonths, parse } from "date-fns"
import * as Styled from "./date.styled"

const toDate = (date: string) => parse(date, "yyyy-MM-dd", 0)

const TEXT = {
  start: "시작일자",
  end: "마감일자",
  hyphen: "-",
  expect: (startDate: string, endDate: string) => {
    const diffMonth = differenceInMonths(toDate(endDate), toDate(startDate))

    if (diffMonth === 0) {
      const diffDay = differenceInDays(toDate(endDate), toDate(startDate))
      return `(총 ${diffDay}일)`
    }

    return `(총 ${diffMonth}개월)`
  },
}

type DateProps = {
  startDate: string | undefined
  endDate: string | undefined
}

export function Date({ startDate = "", endDate = "" }: DateProps) {
  return (
    <Styled.Container>
      <Styled.Row>
        <Styled.Date spacing="0.25rem">
          <Text as="dt">{TEXT.start}</Text>
          <Text as="dd">{startDate}</Text>
        </Styled.Date>

        <Text as="span">{TEXT.hyphen}</Text>

        <Styled.Date spacing="0.25rem">
          <Text as="dt">{TEXT.end}</Text>
          <Text as="dd">{endDate}</Text>
        </Styled.Date>
      </Styled.Row>

      <Styled.Row>
        <Text color="SECONDARY" as="span">
          {TEXT.expect(startDate, endDate)}
        </Text>
      </Styled.Row>
    </Styled.Container>
  )
}
