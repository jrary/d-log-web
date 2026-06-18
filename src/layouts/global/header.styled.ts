import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { ZIndex } from "@components/shared-components/tokens/z-index"
import { Link as BaseLink } from "react-router"
import styled from "styled-components"
import GridgeLogo from "~icons/local/logo_gridge_green.svg"
import type { LinkProps } from "react-router"

export const Header = styled(Box).attrs({
  position: "sticky",
  top: 0,
  left: 0,
  as: "header",
  backgroundColor: "WHITE",
})`
  z-index: ${ZIndex.floating};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.03);
`

export const Container = styled(HStack).attrs({
  align: "center",
  justify: "between",
  maxWidth: "72.5rem",
  marginHorizontal: "auto",
  height: "4.125rem",
  paddingHorizontal: "2.5rem",
})`
  &[data-full="true"] {
    max-width: 100%;
  }

  ${MEDIA.UNDER_MOBILE} {
    align-items: flex-start;
    height: 5rem;
    padding: 1rem 1.25rem;
  }
`

export const Left = styled(HStack).attrs({
  align: "center",
  spacing: "3.75rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.87rem;
  }
`

export const Logo = styled(GridgeLogo)`
  width: 7rem;
  height: auto;

  ${MEDIA.UNDER_MOBILE} {
    width: 4rem;
  }
`

export const Links = styled(HStack).attrs({
  align: "center",
  spacing: "3rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 1.88rem;
  }
`

export const Link = styled(Text).attrs({
  as: BaseLink,
  typo: "body1",
  color: "SECONDARY",
})<LinkProps>`
  padding: 0.12rem 0.25rem;
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  ${MEDIA.UNDER_MOBILE} {
    padding: 0;
    ${typography.caption}
  }
`

export const Right = styled(HStack).attrs({
  align: "center",
  spacing: "1rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.75rem;

    ${Text} {
      ${typography.caption}
    }
  }
`

export const Profile = styled.img`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;

  ${MEDIA.UNDER_MOBILE} {
    width: 1.5rem;
    height: 1.5rem;
  }
`
