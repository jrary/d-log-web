import { Box } from "@components/shared-components/box"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BUTTON, COLOR, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Form as FormikForm } from "formik"
import styled from "styled-components"
import type { HTMLProps } from "react"

export const Container = styled(VStack).attrs({
  as: "section",
  spacing: "3.25rem",
  align: "center",
})`
  padding: 6.25rem 0 12.5rem;

  ${MEDIA.UNDER_MOBILE} {
    padding: 2.5rem 1.25rem 8.75rem;
    gap: 2.125rem;
  }
`

export const LogoContainer = styled.div`
  max-width: 12.73rem;

  svg {
    width: 100%;
  }

  ${MEDIA.UNDER_MOBILE} {
    max-width: 10rem;
  }
`

export const Title = styled(Text).attrs({
  as: "h1",
  typo: "t2",
  weight: "bold",
  whiteSpace: "pre-wrap",
  align: "center",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body2}
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

export const Form = styled(VStack).attrs({
  as: FormikForm,
  spacing: "3.25rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 1.75rem;
  }
`

export const RequestButton = styled(Box).attrs({
  as: "button",
  paddingVertical: "0.75rem",
  paddingHorizontal: "1rem",
  borderRadius: "0.25rem",
  borderWidth: "1px",
  borderColor: BUTTON.LIGHT,
  backgroundColor: BUTTON.LIGHT,
})<HTMLProps<HTMLButtonElement>>`
  cursor: pointer;

  ${Text} {
    font-weight: 700;
    white-space: nowrap;
    color: ${TEXT.HIGH_EMPHASIS};
  }

  &[disabled] {
    background-color: ${COLOR.NEUTRAL_300};

    ${Text} {
      color: ${TEXT.DISABLED};
    }
  }
`

export const SubmitButton = styled(Box).attrs({
  as: "button",
  padding: "1rem",
  borderRadius: "0.25rem",
  borderWidth: "0",
  backgroundColor: BUTTON.PRIMARY_ENABLED,
})<HTMLProps<HTMLButtonElement>>`
  cursor: pointer;

  ${Text} {
    font-weight: 700;
    color: ${TEXT.WHITE};
  }

  &[disabled] {
    background-color: ${BUTTON.DISABLED};

    ${Text} {
      color: ${TEXT.DISABLED};
    }
  }
`

export const SelectText = styled(Text).attrs({
  as: "p",
  typo: "body1",
  whiteSpace: "pre-wrap",
})<{ color?: string }>`
  color: ${(props) => props.color || TEXT.DEFAULT};
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`
