import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link as RouterLink } from "react-router"
import styled from "styled-components"
import type { LinkProps } from "react-router"

export const Container = styled(HStack).attrs({
  align: "end",
  justify: "end",
  spacing: "0.75rem",
})`
  grid-row: span / 3;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
    gap: 0.88rem;
    justify-content: center;
  }
`

export const Content = styled(Text).attrs({
  typo: "body1",
  weight: "medium",
  color: "SECONDARY",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const Link = styled(Text).attrs({
  as: RouterLink,
  typo: "body1",
  weight: "medium",
  color: "HIGH_EMPHASIS",
})<LinkProps>`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`
