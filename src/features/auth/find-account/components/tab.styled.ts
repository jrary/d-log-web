import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { COLOR, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  as: "nav",
  spacing: "1rem",
})`
  ${MEDIA.OVER_MOBILE} {
    display: none;
  }
`

export const Item = styled(Box).attrs({
  as: "button",
  borderColor: COLOR.NEUTRAL_700,
  borderWidth: "0",
  borderBottomWidth: "1px",
  paddingHorizontal: "0.25rem",
  paddingBottom: "0.25rem",
})`
  ${typography.body3}
  font-weight: 500;

  appearance: none;
  background-color: transparent;
  cursor: pointer;

  &:not([data-active="true"]) {
    color: ${TEXT.SECONDARY};
    border-color: transparent;
  }
`
