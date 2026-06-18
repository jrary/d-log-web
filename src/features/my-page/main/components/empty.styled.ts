import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BUTTON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  width: "100%",
  marginHorizontal: "auto",
  paddingVertical: "4rem",
  justify: "center",
  align: "center",
  spacing: "1.5rem",
})`
  border-radius: 0.5rem;
  background: ${BACKGROUND.DEFAULT};

  ${MEDIA.UNDER_MOBILE} {
    padding: 3rem;
    gap: 2rem;
  }
`

export const Content = styled(VStack).attrs({
  as: "div",
  align: "center",
  spacing: "0.62rem",
})``

export const Icon = styled(Text).attrs({
  as: "p",
  typo: "h3",
})``

export const Title = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "HIGH_EMPHASIS",
  weight: "bold",
  align: "center",
})`
  white-space: pre-wrap;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const Description = styled(Text).attrs({
  as: "p",
  typo: "body3",
  color: "SECONDARY",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const Button = styled(Link)`
  ${typography.body1}
  font-weight: 700;
  color: ${TEXT.WHITE};
  background: ${BUTTON.PRIMARY_ENABLED};
  text-align: center;
  width: 10.875rem;
  padding: 1rem;
  border: none;
  border-radius: 0.25rem;
  text-decoration: none;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
    font-weight: 500;
    padding: 0.62rem 0.75rem;
  }
`
