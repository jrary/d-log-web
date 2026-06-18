import { COLOR } from "@components/shared-components/tokens/color"
import { DATE_ITEM_WIDTH } from "@features/dashboard/projects/wbs/components/timeline/row/constant"
import styled from "styled-components"

type DateCellProps = {
  isToday?: boolean
}

export const DateCellWrapper = styled.div<DateCellProps>`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 8px 10px;
  gap: 10px;

  width: ${DATE_ITEM_WIDTH}px;
  height: 36px;

  background: #ffffff;
  border-width: 0px 1px 1px 0px;
  border-style: solid;
  border-color: ${COLOR.NEUTRAL_300};

  user-select: none;
`

export const DateRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
