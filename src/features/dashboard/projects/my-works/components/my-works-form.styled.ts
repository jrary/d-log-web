import * as TextField from "@components/form/text-field/styled"
import * as Popover from "@components/popover.styled"
import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import {
  BACKGROUND,
  BORDER,
  BUTTON,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import { TextFieldCell } from "@features/dashboard/projects/my-works/components/worker-table-row.styled"
import styled, { keyframes } from "styled-components"

export const DateButton = styled(Box).attrs({})`
  appearance: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-family: inherit;

  padding: 0.25rem;
  border-radius: 0.5rem;

  color: inherit;
  background-color: transparent;

  &:hover {
    background-color: ${BUTTON.HOVER};
  }
`

export const Tag = styled(HStack).attrs({})`
  color: blue;
`

export const TimeFieldCell = styled(TextFieldCell)`
  position: relative;
  border: none;
  ${TextField.Control} {
    ${typography.body3}
    text-align: right;
  }
  ${TextField.Slot} {
    ${typography.body3}
    border: none;
    cursor: pointer;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    background: #e5e5f0;
  }
  ${Popover.Content} {
    display: none;
    z-index: 1;
  }
  &[data-state="open"] {
    ${Popover.Content} {
      display: block;
    }
  }
`

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Content = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 30%;

  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  padding: 0.62rem;

  border-radius: 0.5rem;
  border: 1px solid ${BORDER.LIGHT};
  background: ${BACKGROUND.WHITE};
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);

  &[data-state="open"] {
    z-index: 1;
    animation-name: ${slideUpAndFade};
  }
`
