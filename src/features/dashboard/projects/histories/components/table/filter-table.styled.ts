import { Button } from "@components/button.styled"
import { HStack } from "@components/shared-components/stack"
import {
  BACKGROUND,
  BORDER,
  ICON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Header = styled(HStack).attrs({
  width: "100%",
  paddingVertical: "0.56rem",
  paddingHorizontal: "0.62rem",
  backgroundColor: "WHITE",
  spacing: "1.25rem",
})`
  min-width: 92.4rem;
  border: solid ${BORDER.LIGHT};
  border-width: 0 0 1px 0;
`

export const Toggle = styled(HStack).attrs({
  paddingVertical: "0.25rem",
  paddingHorizontal: "0.38rem",
  spacing: "0.38rem",
})<{ isOpened: boolean }>`
  cursor: pointer;

  &:hover {
    background-color: ${BACKGROUND.DEFAULT};
  }

  svg {
    transition: transform 0.3s ease-in-out;
    transform: rotate(${(props) => (props.isOpened ? "0deg" : "-90deg")});
  }
`

export const ItemCount = styled(HStack).attrs({
  paddingHorizontal: "0.62rem",
  backgroundColor: "DARK",
})`
  ${typography.caption}
  color: ${TEXT.SECONDARY};
`

export const Table = styled.table`
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

export const Cell = styled.td`
  text-align: left;

  padding: 0.25rem 0.62rem;
  min-height: 2.375rem;

  border: solid ${BORDER.LIGHT};
  border-width: 0 1px 1px 0;
  text-align: left;

  white-space: nowrap;
  font-size: 0.875rem;

  vertical-align: middle;

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

export const Create = styled(Button).attrs({
  as: "button",
  variant: "ghost",
  size: "s",
  fullWidth: true,
})`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.25rem;

  padding: 0.4rem 0.62rem;

  svg {
    color: ${ICON.SECONDARY};
  }

  border-radius: 0;
`

export const PaginationRow = styled.tr`
  td {
    padding: 1.25rem 0;
  }
`
