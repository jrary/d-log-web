import { Center } from "@components/shared-components/center"
import { HStack } from "@components/shared-components/stack"
import { BORDER, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Control = styled.input`
  all: unset;
  ${typography.body3}
  padding: 0;

  height: 1.5rem;

  appearance: none;
  border: none;
  background: none;
  resize: none;

  flex: 1;

  cursor: inherit;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${TEXT.PLACEHOLDER};
  }

  &:disabled {
    color: ${TEXT.PLACEHOLDER};
  }

  &[data-has-onclick="true"] {
    cursor: pointer;
  }

  ${MEDIA.UNDER_MOBILE} {
    height: 1.375rem;
    ${typography.body3};
  }
`

export const Slot = styled(Center)<{ direction: "left" | "right" }>`
  cursor: inherit;
`

export const Container = styled(HStack).attrs({
  width: "100%",
  spacing: "0.62rem",
  paddingVertical: "0.88rem",
  paddingHorizontal: "1rem",
  borderRadius: "0.25rem",
  borderWidth: "1px",
  borderColor: "DARK",
  backgroundColor: "WHITE",
  align: "center",
})`
  &:has(${Control}:focus) {
    border-color: ${BORDER.PRIMARY};
  }

  &:has(${Control}[data-error="true"]) {
    border-color: ${BORDER.ALERT};
  }

  &:has(${Control}:disabled) {
    cursor: not-allowed;

    pointer-events: none;

    background-color: #f9f9fc;
    border-color: ${BORDER.DARK};
  }

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.81rem 1rem;
  }
`
