import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BUTTON } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"
import type { LinkProps } from "react-router"

export const Content = styled(VStack).attrs({
  width: "100%",
  marginHorizontal: "auto",
  paddingVertical: "3.75rem",
  align: "center",
  justify: "center",
  spacing: "3.94rem",
})`
  flex: 1;

  ${MEDIA.UNDER_MOBILE} {
  }
`

export const Container = styled(VStack).attrs({
  width: "100%",
  align: "center",
  spacing: "1.25rem",
})`
  flex: 1;

  ${MEDIA.UNDER_MOBILE} {
  }
`

export const ErrorImage = styled.img`
  width: 30rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 17.5rem;
  }
`

export const Title = styled(Text).attrs({
  typo: "t2",
  weight: "bold",
  color: "HIGH_EMPHASIS",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3};
  }
`

export const Description = styled(Text).attrs({
  typo: "body1",
  color: "SECONDARY",
  align: "center",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    display: none;
    ${typography.body3};
  }
`

export const MobileDescription = styled(Text).attrs({
  typo: "body1",
  color: "SECONDARY",
  align: "center",
  whiteSpace: "pre-wrap",
})`
  display: none;
  ${MEDIA.UNDER_MOBILE} {
    display: block;
    ${typography.body3};
  }
`

export const HomeButton = styled(Text).attrs({
  as: Link,
  color: "WHITE",
  weight: "bold",
  align: "center",
})<LinkProps>`
  text-decoration: none;

  width: 10rem;
  padding: 1rem 0.875rem 1rem 1rem;
  border-radius: 0.25rem;
  background-color: ${BUTTON.PRIMARY_ENABLED};

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.75rem 2.25rem 0.875rem 2.25rem;
    ${typography.body3}
  }
`
