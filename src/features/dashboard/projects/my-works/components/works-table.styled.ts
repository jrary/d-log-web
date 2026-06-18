import { Button } from "@components/button.styled"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  BUTTON,
  COLOR,
  ICON,
  TEXT,
} from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const TooltipContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
`

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Table = styled.table`
  overflow: visible;
  width: 100%;

  background: ${BACKGROUND.WHITE};
  border-collapse: collapse;

  tfoot td {
    border: none;

    &[data-action] {
      padding: 0;
    }
  }
`

export const MenuTriggerButton = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  min-height: 2.375rem;
  border-radius: 0;
  color: ${ICON.SECONDARY};
`

export const Cell = styled.td`
  overflow: visible;
  text-align: left;

  padding: 0.25rem 0.625rem;
  min-height: 2.375rem;

  border: solid ${BORDER.LIGHT};
  border-width: 0 1px 1px 0;
  text-align: left;

  font-size: 0.875rem;
  line-height: 1.375rem;

  ${Text} {
    line-height: 1.375rem;
    max-height: 2.75rem;
  }

  vertical-align: middle;
  transition: background 0.2s ease-in-out;

  &[data-no-spacing="true"] {
    line-height: 0;
    padding: 0;
  }

  &:has(${MenuTriggerButton}:hover) {
    background: ${BUTTON.HOVER};
  }

  &:last-child {
    border-right: none;
  }
`

export const Head = styled(Cell).attrs({
  as: "th",
})<{ width?: string }>`
  padding: 0.5rem 0.625rem;
  color: ${TEXT.SECONDARY};
  min-width: ${({ width }) => width};
  width: ${({ width }) => width};
`

export const Badge = styled(Text)`
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  border-radius: 100px;
  background: ${COLOR.NEUTRAL_300};
  color: ${COLOR.NEUTRAL_700};
  max-width: 12.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Checked = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR.NEUTRAL_300};
  color: ${ICON.WHITE};
  border-radius: 50%;

  &[data-active="true"] {
    background-color: ${BACKGROUND.PRIMARY};
  }
`

export const CheckedCell = styled(Cell)`
  padding: 0.5rem 0.62rem;
`

export const TimeBadge = styled(Text)`
  padding: 0 0.5rem;
  border-radius: 4px;
  background: ${COLOR.NEUTRAL_300};
  color: ${COLOR.NEUTRAL_700};
`

export const ProgressBadge = styled(Text).attrs({
  color: "HIGH_EMPHASIS",
  typo: "caption",
})`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: ${BACKGROUND.LIGHT_PRIMARY};
  border: solid 1px ${BORDER.SECONDARY};
  border-radius: 100px;
`

export const MenuActionButton = styled(Button).attrs({
  variant: "ghost",
  size: "l",
})`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  width: 100%;
`

export const PaginationRow = styled.tr`
  td {
    padding: 1.25rem 0;
  }
`

export const TooltipPosition = styled(HStack).attrs({})<{ index: number }>`
  position: absolute;
  top: ${(props) => -3 + props.index * 2.9}rem;
  left: 50%;
  transform: translateX(-50%);
`
