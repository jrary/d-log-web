import { Button } from "@components/button.styled"
import * as Select from "@components/form/select/styled"
import * as TextArea from "@components/form/text-area/styled"
import * as TextField from "@components/form/text-field/styled"
import * as Popover from "@components/popover.styled"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  COLOR,
  ICON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Cell = styled.td`
  text-align: left;
  min-height: 2.5rem;
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

export const TextCell = styled(Cell)`
  ${Text} {
    ${typography.body3}
    display: inline-block;
    width: 100%;
    padding: 0.5rem 0.62rem;
  }
`

export const MenuTriggerButton = styled(Button).attrs({
  variant: "ghost",
  size: "s",
})`
  width: 100%;
  border-radius: 0;
  opacity: 0;
  color: ${ICON.SECONDARY};
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

export const TaskBadge = styled(Text).attrs({ typo: "body3" })`
  display: inline-block;
  border-radius: 6.25rem;
  padding: 0.25rem 0.625rem;
  background: ${COLOR.NEUTRAL_300};
  color: ${COLOR.NEUTRAL_700};
`

export const SelectCell = styled(Cell)`
  position: relative;
  border: none;
  ${Select.Container} {
    display: flex;
    align-items: center;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    padding: 0 0.62rem;
    z-index: 0;
    border-color: ${BORDER.LIGHT};
    border-top-color: transparent;
    border-left-color: transparent;
    &[data-state="open"] {
      border-color: ${BORDER.PRIMARY};
    }
    ${Select.Trigger} {
      height: auto;
    }
    svg {
      display: none;
    }
  }
  ${Select.Content} {
    z-index: 1;
    min-width: 11rem;
    box-sizing: border-box;
  }
  ${Select.Options} {
    padding: 0.62rem;
    gap: 0.25rem;
    ${Select.Option} {
      padding: 0.25rem 0.38rem;
    }
  }
`

export const TextFieldCell = styled(Cell)`
  position: relative;
  border: none;
  ${TextField.Container} {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    padding: 0.25rem 0.62rem;
    border-color: ${BORDER.LIGHT};
    border-top-color: transparent;
    border-left-color: transparent;
    &:has(${TextField.Control}:focus) {
      border-color: ${BORDER.PRIMARY};
    }
  }
  ${TextField.Control} {
    ${typography.body3}
    width: 100%;
    padding: 0.25rem 0.38rem;
  }
`

export const TextAreaCell = styled(Cell)`
  position: relative;
  ${TextArea.Container} {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    border-radius: 0;
    padding: 0.25rem 0.62rem;
    border-color: ${BORDER.LIGHT};
    border-top-color: transparent;
    border-left-color: transparent;
    &:has(${TextArea.Control}:focus) {
      border-color: ${BORDER.PRIMARY};
      height: fit-content;
      z-index: 1;
      opacity: 1;
      ${Text} {
        display: none;
      }
    }
  }
  ${TextArea.Control} {
    ${typography.body3}
    width: 100%;
    padding: 0.25rem 0.38rem;
    min-height: unset;
    &:focus {
      white-space: pre-wrap;
    }
  }
  ${Text} {
    ${typography.body3}
    padding: 0.5rem 0.62rem;
    max-width: 16rem;
  }
`

export const Progress = styled(Text)`
  padding: 0.25rem 0.5rem;
  border-radius: 9999rem;
  border: 1px solid ${BORDER.SECONDARY};
  background: ${BACKGROUND.LIGHT_PRIMARY};
  color: ${TEXT.HIGH_EMPHASIS};
`

export const ProgressCell = styled(Cell)`
  position: relative;
  border: none;
  ${Popover.Trigger} {
    display: inline-block;
    background: none;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    border: solid 1px;
    border-color: ${BORDER.LIGHT};
    border-top-color: transparent;
    border-left-color: transparent;
    text-align: center;
    padding: 0.31rem 0.62rem;
    &[data-state="open"] {
      border-color: ${BORDER.PRIMARY};
    }
  }
  ${Popover.Content} {
    z-index: 1;
    padding: 1.25rem 1.5rem;
  }
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

export const Row = styled.tr`
  &:hover {
    ${MenuTriggerButton} {
      opacity: 1;
    }
  }
`
