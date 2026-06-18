import { HStack } from "@components/shared-components/stack"
import { TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Control = styled.input`
  ${typography.sub1}
  font-weight: 700;
  width: 100%;

  appearance: none;
  border: none;
  background: none;

  cursor: inherit;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${TEXT.PLACEHOLDER};
  }
`

export const Container = styled(HStack).attrs({
  width: "100%",
  spacing: "0.62rem",
  backgroundColor: "WHITE",
})`
  &:has(${Control}:disabled) {
    cursor: not-allowed;

    pointer-events: none;

    background-color: #f9f9fc;
  }

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.81rem 1rem;
  }
`
