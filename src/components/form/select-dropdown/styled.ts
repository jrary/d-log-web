import { Center } from "@components/shared-components/center"
import { HStack, VStack } from "@components/shared-components/stack"
import {
  BACKGROUND,
  BORDER,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import * as Popover from "@radix-ui/react-popover"
import styled, { keyframes } from "styled-components"

const display = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

type TriggerProps = {
  placeholder?: string
}

export const Trigger = styled.span<TriggerProps>`
  ${typography.body}

  padding: 0;
  margin: 0;

  height: 1.5rem;

  appearance: none;
  border: none;
  background: none;

  flex: 1;

  cursor: inherit;

  &:focus {
    outline: none;
  }

  ${MEDIA.UNDER_MOBILE} {
    height: 1.375rem;
    ${typography.body3};
  }
`

export const Placeholder = styled.span`
  user-select: none;
  color: ${TEXT.PLACEHOLDER};
`

export const Slot = styled(Center)<{ direction: "left" | "right" }>`
  cursor: inherit;
`

export const Container = styled(HStack).attrs({
  as: Popover.Trigger,
})`
  width: 100%;

  cursor: pointer;
  text-align: left;

  align-items: center;

  padding: 0.25rem 0rem;
  gap: 0.25rem;
  border-radius: 0.25rem;
  border: none;
  background-color: ${BACKGROUND.WHITE};

  svg {
    display: none;
  }

  &[data-error="true"] {
    border-color: ${BORDER.ALERT};
  }

  &[data-disabled="true"] {
    cursor: not-allowed;

    pointer-events: none;

    background-color: #f9f9fc;
    border-color: ${BORDER.DARK};
  }

  &[data-state="open"] {
    display: flex;
    padding: 0.25rem 0.38rem;
    background-color: ${BACKGROUND.DARK};

    svg {
      display: block;
    }
  }

  &[data-placeholder="true"] {
    color: ${TEXT.DEFAULT};
  }

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.81rem 1rem;
  }
`

export const Content = styled(Popover.Content)`
  border-radius: 1rem;

  margin: 0.69rem;
  padding: 0.62rem;
  gap: 0.25rem;
  border: 1px solid ${BORDER.DARK};
  background-color: ${BACKGROUND.WHITE};

  min-width: 20rem;
  width: fit-content;
  overflow: hidden;

  box-shadow: 0px 4px 16px 0px rgba(0, 0, 59, 0.08);

  &[data-state="open"] {
    animation: ${display} 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`

export const Options = styled(VStack)`
  max-height: 20.5rem;
  overflow-y: auto;
  gap: 0.62rem;
`

type OptionProps = {
  value: number
}

export const Option = styled(HStack).attrs<OptionProps>({
  as: Popover.Close,
})<OptionProps>`
  ${typography.body1}

  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.62rem;
  padding: 0.25rem 0.38rem;

  appearance: none;
  border: none;
  background: none;

  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &[data-selected="true"] {
    font-weight: 700;
    color: ${TEXT.HIGH_EMPHASIS};
    background-color: ${BACKGROUND.LIGHT_PRIMARY};
  }

  &:hover {
    font-weight: 700;
  }
`
