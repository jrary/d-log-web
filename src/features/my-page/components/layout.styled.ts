import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  paddingBottom: "12.5rem",
  marginHorizontal: "auto",
  justify: "between",
})`
  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    gap: 0.75rem;
  }
`

export const Sidebar = styled(VStack).attrs({
  paddingTop: "2.83rem",
  spacing: "2.5rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    padding-top: 0rem;
    display: none;
    flex-direction: column;
    gap: 2.5rem;

    &[data-active="true"] {
      display: flex;
    }
  }
`

export const Profile = styled(VStack).attrs({
  marginVertical: "1rem",
  marginHorizontal: "1.25rem",
  align: "start",
  spacing: "1rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    padding: 1rem;
    align-items: center;
    flex-direction: row;
    height: 3.38rem;
    gap: 0.75rem;
  }
`

export const ProfileImg = styled.img`
  height: 6.87rem;
  width: 6.87rem;
  border-radius: 50%;
  object-fit: cover;

  ${MEDIA.UNDER_MOBILE} {
    width: 3.38rem;
    height: 3.38rem;
  }
`

export const Name = styled(Text).attrs({
  as: "p",
  typo: "body1",
  weight: "bold",
  color: "DEFAULT",
})``

export const Email = styled(Text).attrs({
  as: "p",
  typo: "body3",
  color: "SECONDARY",
})``

export const Logout = styled(Text)`
  cursor: pointer;
  ${typography.caption}
  color: ${TEXT.HIGH_EMPHASIS};
  background: ${BACKGROUND.TERTIARY};
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  border: none;
  text-decoration: none;

  ${MEDIA.UNDER_MOBILE} {
    display: none;
  }
`

export const Menu = styled(VStack).attrs({
  marginHorizontal: "1.25rem",
  spacing: "2.5rem",
})`
  flex-shrink: 0;

  ${MEDIA.UNDER_MOBILE} {
    display: none;
  }
`

export const MainContent = styled(VStack).attrs({
  maxWidth: "51.25rem",
  width: "100%",
})`
  ${MEDIA.UNDER_MOBILE} {
    max-width: calc(100% - 2.5rem);
    margin: 0rem 1.25rem 2.5rem;
  }
`

export const MobileMenu = styled(VStack).attrs({
  spacing: "2.5rem",
})`
  display: none;

  ${MEDIA.UNDER_MOBILE} {
    display: flex;
  }
`

export const MenuContainer = styled(VStack).attrs({
  spacing: "0.5rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.75rem;

    &[data-active="false"] {
      display: none;
    }
  }
`

export const MenuTitle = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "DEFAULT",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub2}
    color: ${TEXT.HIGH_EMPHASIS};
    margin: 0 1.25rem;
  }
`

export const MenuItemContainer = styled(VStack).attrs({
  spacing: "0.62rem",
})`
  position: relative;

  ${MEDIA.UNDER_MOBILE} {
    border-top: 1px solid ${BORDER.DARK};
    gap: 0;
  }
`

export const MenuItem = styled(Link)`
  ${typography.body1}
  color: ${TEXT.TERTIARY};
  text-decoration: none;
  margin-left: 0.62rem;

  &[data-active="true"] {
    color: ${TEXT.HIGH_EMPHASIS};
  }

  &:before {
    content: "";
    position: absolute;
    left: 0rem;
    top: 0;
    bottom: 0;
    width: 0.06rem;
    background-color: ${BORDER.DARK};

    ${MEDIA.UNDER_MOBILE} {
      left: 1.25rem;
      top: unset;
      bottom: unset;
      margin-right: 1.25rem;
      width: 0.06rem;
      height: 1.5rem;
    }
  }

  ${MEDIA.UNDER_MOBILE} {
    margin: 0rem;
    padding: 0.69rem 1.87rem;
    background-color: ${BACKGROUND.DEFAULT};
    border-bottom: 1px solid ${BORDER.LIGHT};
    color: ${TEXT.SECONDARY};
  }
`
