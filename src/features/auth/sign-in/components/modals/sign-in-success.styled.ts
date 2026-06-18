import * as Dialog from "@components/dialog.styled"
import { Text } from "@components/shared-components/text"
import { BUTTON } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"
import type { LinkProps } from "react-router"

export const WelcomeMessage = styled(Dialog.Description).attrs({
  as: Text,
  typo: "sub2",
  weight: "bold",
  align: "center",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1}
  }
`

export const HomeLink = styled(Text).attrs({
  as: Link,
  color: "WHITE",
  weight: "bold",
})<LinkProps>`
  text-decoration: none;
  padding: 0.6875rem 2.25rem 0.8125rem 2.25rem;
  border-radius: 3.125rem;
  background-color: ${BUTTON.PRIMARY_ENABLED};

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.75rem 2.25rem 0.875rem 2.25rem;
    ${typography.body3}
  }
`
