import { HStack } from "@components/shared-components/stack"
import { TEXT } from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Tooltip = styled(HStack).attrs({
  paddingHorizontal: "1.25rem",
  paddingVertical: "1rem",
  borderRadius: "1.25rem",
})`
  position: relative;
  background: ${TEXT.NEUTRAL};

  ${typography.body3};
  color: ${TEXT.WHITE};
  text-align: center;
  white-space: pre-wrap;
  word-break: keep-all;
  z-index: 99;

  /* 말풍선 아래 삼각형 */
  &::after {
    content: "";
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    border-width: 1rem;
    border-style: solid;
    border-color: ${TEXT.NEUTRAL} transparent transparent transparent;
  }
`
