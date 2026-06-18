import { Button } from "@components/button.styled"
import { Box } from "@components/shared-components/box"
import {
  BACKGROUND,
  BORDER,
  BUTTON,
} from "@components/shared-components/tokens/color"
import * as Popover from "@radix-ui/react-popover"
import styled, { keyframes } from "styled-components"

export * from "@radix-ui/react-popover"

export const TriggerButton = styled(Box).attrs({})`
  color: inherit;
  background: transparent;
  border-radius: 0.3rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${BUTTON.HOVER};
  }
`

export const MenuActionButton = styled(Button).attrs({
  variant: "ghost",
  size: "l",
})`
  display: flex;
  align-items: center;
  gap: 6px;

  width: 100%;
`

export const Trigger = styled(Popover.Trigger)`
  &:not(:disabled) {
    cursor: pointer;
  }

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  height: 1.5rem;
  width: 1.5rem;
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

export const Content = styled(Popover.Content)`
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  padding: 0.62rem;

  border-radius: 8px;
  border: 1px solid ${BORDER.LIGHT};
  background: ${BACKGROUND.WHITE};
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);

  &[data-state="open"] {
    z-index: 1;
    animation-name: ${slideUpAndFade};
  }
  z-index: 1;
`
