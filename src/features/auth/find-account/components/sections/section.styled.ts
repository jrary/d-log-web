import { Button } from "@components/button.styled"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BACKGROUND, BORDER } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled, { css } from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  spacing: "1rem",
})<{ rowSpan: number }>`
  ${({ rowSpan }) => css`
    grid-row: span ${rowSpan} / span ${rowSpan};
  `}

  ${MEDIA.UNDER_MOBILE} {
    grid-row: unset;

    &:not([data-active="true"]) {
      display: none;
    }
  }
`

export const Title = styled(Text).attrs({
  typo: "sub2",
  weight: "bold",
})`
  ${MEDIA.UNDER_MOBILE} {
    display: none;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 2.5rem;

  background-color: ${BACKGROUND.DEFAULT};
  border-radius: 2rem;

  padding: 3.12rem;
  padding-bottom: 3.5rem;

  ${MEDIA.UNDER_MOBILE} {
    padding: 1.25rem;
    padding-bottom: 1.88rem;
    gap: 1.88rem;
    border-radius: 1.25rem;
  }
`

export const Fields = styled(VStack).attrs({
  spacing: "1.88rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 1.25rem;
  }
`

export const Description = styled(Text).attrs({
  typo: "body1",
  weight: "medium",
  color: "SECONDARY",
  whiteSpace: "pre-wrap",
})`
  padding: 1.125rem 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid ${BORDER.DARK};
  background-color: ${BACKGROUND.DARK};

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
    padding: 1rem 1.25rem;
  }
`

export const Submit = styled(Button).attrs({
  size: "xl",
  variant: "primary",
})`
  ${typography.body1}
  font-weight: 700;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
    font-weight: 500;
  }
`
