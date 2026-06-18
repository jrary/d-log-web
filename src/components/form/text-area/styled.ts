import { VStack } from "@components/shared-components/stack"
import { BORDER, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Control = styled.textarea`
  ${typography.body}
  padding: 0;

  font-family: "Noto Sans KR";
  min-height: 5rem;

  appearance: none;
  border: none;
  background: none;

  flex: 1;
  word-break: keep-all;

  cursor: inherit;
  resize: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${TEXT.PLACEHOLDER};
  }

  &::-webkit-scrollbar {
    display: none;
  }

  ${MEDIA.UNDER_MOBILE} {
    min-height: 1.5rem;
    ${typography.body3};
  }
`

export const TextLength = styled.span`
  ${typography.caption};

  text-align: right;
  color: ${TEXT.SECONDARY};

  &[data-error="true"] {
    color: ${TEXT.DANGER};
  }
`

export const Container = styled(VStack).attrs({
  width: "100%",
  height: "9rem",
  spacing: "0.62rem",
  paddingVertical: "0.88rem",
  paddingHorizontal: "1rem",
  borderRadius: "0.25rem",
  borderWidth: "1px",
  borderColor: "DARK",
  backgroundColor: "WHITE",
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
