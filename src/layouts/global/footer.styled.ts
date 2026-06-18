import { Box } from "@components/shared-components/box"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BORDER, COLOR, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link as BaseLink } from "react-router"
import styled from "styled-components"
import GridgeLogo from "~icons/local/logo_gridge_green.svg"
import type { LinkProps } from "react-router"

export const Footer = styled(Box).attrs({
  backgroundColor: "DEFAULT",
})``

export const Container = styled(VStack).attrs({
  maxWidth: "67.5rem",
  marginHorizontal: "auto",
  paddingVertical: "3.12rem",
  spacing: "1.25rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    padding: 2.5rem 1.25rem 3.12rem;
  }
`

export const Top = styled(VStack).attrs({
  spacing: "1rem",
})`
  ${Text} {
    ${typography.body3}
  }
`

export const Logo = styled(GridgeLogo)`
  width: 9.5rem;
`

export const Button = styled(Text).attrs({
  as: "button",
  color: "inherit",
})`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

export const Link = styled(Text).attrs({
  as: BaseLink,
  color: "inherit",
  target: "_blank",
  rel: "noopener noreferrer",
})<LinkProps>`
  text-decoration: none;
`

export const Wrap = styled(HStack).attrs({
  align: "center",
  spacing: "0.62rem",
})`
  & > *:not(:first-child):before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 10px;
    margin-right: 0.62rem;
    background-color: ${BORDER.DARK};
  }
`

export const Information = styled(VStack).attrs({
  spacing: "1.125rem",
})`
  ${Text} {
    ${typography.caption}
  }

  ${MEDIA.UNDER_MOBILE} {
    gap: 0.5rem;

    ${VStack} {
      gap: 0.12rem;
    }

    dl {
      gap: 0.12rem;

      dt {
        width: 5.5rem;
      }
    }

    ${Wrap} {
      gap: 0.12rem;
      flex-direction: column;
      align-items: flex-start;

      & > *:before {
        display: none;
      }
    }
  }
`

export const Desc = styled(HStack).attrs({
  as: "dl",
  align: "center",
  spacing: "0.62rem",
})`
  ${Text} {
    color: ${COLOR.NEUTRAL_600};
  }
`

export const Bottom = styled(HStack).attrs({
  align: "center",
  justify: "between",
  spacing: "0.62rem",
})`
  color: ${TEXT.SECONDARY};

  ${Text} {
    ${typography.caption}
  }

  ${MEDIA.UNDER_MOBILE} {
    gap: 0.12rem;
    flex-direction: column;
    align-items: flex-start;

    ${Wrap} {
      gap: 0.5rem;
    }
  }
`
