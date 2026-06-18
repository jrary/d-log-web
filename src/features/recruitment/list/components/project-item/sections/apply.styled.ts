import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BUTTON, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"
import Profile from "~icons/local/ic_project_profile"
import type { LinkProps } from "react-router"

export const Container = styled(HStack).attrs({
  spacing: "1rem",
  align: "center",
  justify: "between",
})`
  margin-top: 1.5rem;

  ${MEDIA.UNDER_MOBILE} {
    margin-top: 1rem;
  }
`

export const Content = styled(HStack).attrs({
  spacing: "0.75rem",
  align: "center",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.38rem;
  }
`

export const ProfilePic = styled(Profile)`
  ${MEDIA.UNDER_MOBILE} {
    height: 1.5rem;
    width: 1.5rem;
  }
`

export const AppliedMember = styled(Text).attrs({
  as: "span",
  typo: "sub2",
  color: "BLACK",
  weight: "medium",
})`
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
    white-space: pre-wrap;
  }
`

export const Button = styled.button`
  ${typography.sub2}
  font-weight: 500;

  border: none;
  text-decoration: none;

  padding: 0.5rem 1.5rem;
  border-radius: 62.44rem;

  white-space: nowrap;

  color: ${TEXT.WHITE};
  background: ${BUTTON.PRIMARY_ENABLED};

  cursor: pointer;

  &[data-status="COMPLETED"] {
    cursor: default;
    color: ${TEXT.SECONDARY};
    background: ${BUTTON.DISABLED};
  }

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
    height: 1.75rem;
    padding: 0.25rem 0.88rem;
  }
`

export const DetailLink = styled(Button).attrs({
  as: Link,
})<LinkProps>``
