import { Button } from "@components/button.styled"
import * as Dialog from "@components/dialog.styled"
import { Center } from "@components/shared-components/center"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import {
  token,
  typography,
} from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const EmojiContainer = styled(Center).attrs({
  padding: "1.25rem",
  borderRadius: "50%",
})`
  font-size: 2.3125rem;
  background-color: rgba(53, 188, 80, 0.1);
`

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

export const SecondaryBtn = styled(Button).attrs({
  variant: "ghost",
  size: "s",
})`
  text-decoration: none;
  padding: 0.6875rem 2.25rem 0.8125rem 2.25rem;
  border-radius: 3.125rem;

  ${token.body2}
  font-weight: 400;
`

export const PrimaryBtn = styled(Button).attrs({
  variant: "primary",
  size: "s",
})`
  text-decoration: none;
  padding: 0.6875rem 2.25rem 0.8125rem 2.25rem;
  border-radius: 3.125rem;

  ${token.body2}
  font-weight: 700;
`
