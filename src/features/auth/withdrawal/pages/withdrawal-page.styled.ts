import { Button } from "@components/button.styled"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BACKGROUND } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Page = styled(VStack).attrs({
  maxWidth: "33.1rem",
  paddingTop: "6.37rem",
  paddingBottom: "12.5rem",
  marginHorizontal: "auto",
  justify: "center",
  spacing: "1rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    max-width: unset;
    padding: 2.5rem 1.5rem;
    gap: 1.25rem;
  }
`

export const Title = styled(Text).attrs({
  as: "p",
  typo: "sub2",
  weight: "bold",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  padding: 3.12rem;
  padding-bottom: 3.5rem;

  border-radius: 2rem;
  background: ${BACKGROUND.DEFAULT};

  ${MEDIA.UNDER_MOBILE} {
    padding: 1.25rem;
    padding-bottom: 1.88rem;
    gap: 1.88rem;
  }
`

export const Form = styled(VStack).attrs({
  width: "100%",
})``

export const Submit = styled(Button).attrs({
  size: "xl",
  variant: "alert",
  fullWidth: true,
})`
  ${typography.body1}
  font-weight: 700;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
    font-weight: 500;
  }
`
