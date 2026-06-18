import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BUTTON, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"
import type { ComponentProps } from "react"

export const Container = styled(VStack).attrs({
  paddingVertical: "6.25rem",
  spacing: "2rem",
  align: "center",
})`
  ${MEDIA.UNDER_MOBILE} {
    padding: 3rem 1.25rem 6rem;
    gap: 1.5rem;
  }
`

export const Header = styled(VStack).attrs({
  as: "section",
  marginHorizontal: "auto",
  spacing: "0.75rem",
  align: "center",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.5rem;
  }
`

export const Logo = styled.div`
  max-width: 12.73rem;

  svg {
    width: 100%;
  }

  ${MEDIA.UNDER_MOBILE} {
    max-width: 9.3rem;
  }
`

export const Title = styled(Text).attrs({
  as: "h1",
  typo: "t1",
  weight: "bold",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const Description = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "SECONDARY",
  whiteSpace: "pre-wrap",
  align: "center",
})`
  ${MEDIA.UNDER_MOBILE} {
    display: none;
  }
`

export const MobileDescription = styled(Text).attrs({
  as: "p",
  typo: "caption",
  color: "SECONDARY",
  whiteSpace: "pre-wrap",
  align: "center",
})`
  display: none;
  ${MEDIA.UNDER_MOBILE} {
    display: block;
  }
`

export const Fields = styled(VStack).attrs({
  marginHorizontal: "auto",
  spacing: "2.12rem",
  width: "100%",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 1.25rem;
  }
`

export const Actions = styled(VStack).attrs({
  width: "100%",
  spacing: "1.5rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.75rem;
  }
`

export const AutoLogin = styled(Text).attrs({
  typo: "body1",
  color: "SECONDARY",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const FindAccount = styled(Text).attrs({
  as: Link,
  typo: "body1",
  color: "SECONDARY",
  weight: "medium",
})<ComponentProps<typeof Link>>`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const Submit = styled.button`
  ${typography.body1};
  font-weight: 700;
  padding: 0.75rem 1rem;
  width: 100%;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  background-color: ${BUTTON.PRIMARY_ENABLED};
  color: ${TEXT.WHITE};

  &:disabled {
    background-color: ${BUTTON.DISABLED};
    color: ${TEXT.DISABLED};
  }

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
    color: ${TEXT.WHITE};
    background-color: ${BUTTON.PRIMARY_ENABLED};

    &:disabled {
      background-color: ${BUTTON.DISABLED};
      color: ${TEXT.DISABLED};
    }
  }
`

export const SignUpPrefix = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "SECONDARY",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const SignUpLink = styled(Text).attrs({
  as: Link,
  typo: "body1",
  color: "HIGH_EMPHASIS",
})<ComponentProps<typeof Link>>`
  text-decoration-line: underline;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`
