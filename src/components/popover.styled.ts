import { BACKGROUND, BORDER } from "@components/shared-components/tokens/color"
import * as Popover from "@radix-ui/react-popover"
import styled, { keyframes } from "styled-components"

export * from "@radix-ui/react-popover"

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

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const Content = styled(Popover.Content)`
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  padding: 0.62rem;

  border-radius: 0.5rem;
  border: 1px solid ${BORDER.LIGHT};
  background: ${BACKGROUND.WHITE};
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);

  &[data-state="open"] {
    z-index: 100;
    animation-name: ${slideUpAndFade};
  }
`
