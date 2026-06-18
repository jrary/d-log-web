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
  overflow: hidden;

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

type PlaceholderProps = {
  placeholderColor: string
}

export const Placeholder = styled.span<PlaceholderProps>`
  user-select: none;
  color: ${(props) => props.placeholderColor};
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

  padding: 0.88rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid ${BORDER.DARK};
  background-color: ${BACKGROUND.WHITE};

  &[data-error="true"] {
    border-color: ${BORDER.ALERT};
  }

  &[data-disabled="true"] {
    cursor: not-allowed;

    pointer-events: none;

    background-color: #f9f9fc;
    border-color: ${BORDER.DARK};
  }

  &[data-placeholder="true"] {
    color: ${TEXT.PLACEHOLDER};
  }

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.81rem 1rem;
  }
`

export const Content = styled(Popover.Content)`
  border-radius: 0.25rem;

  border: 1px solid ${BORDER.DARK};
  background-color: ${BACKGROUND.WHITE};

  min-width: 20rem;
  width: fit-content;
  overflow: hidden;

  box-shadow: -4px 0px 20px 0px rgba(0, 0, 0, 0.03);

  &[data-state="open"] {
    animation: ${display} 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`

export const Options = styled(VStack)`
  max-height: 20.5rem;
  overflow-y: auto;
`

type OptionProps = {
  value: string
}

export const Option = styled(HStack).attrs<OptionProps>({
  as: Popover.Close,
})<OptionProps>`
  ${typography.body3}

  display: flex;
  align-items: center;
  gap: 0.62rem;
  padding: 0.8rem 1rem;

  appearance: none;
  border: none;
  background: none;

  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &[data-selected="true"] {
    font-weight: 700;
    background-color: ${BACKGROUND.DEFAULT};
    color: ${TEXT.HIGH_EMPHASIS};
  }

  &:hover {
    background-color: ${BACKGROUND.LIGHT_PRIMARY};
  }
`
