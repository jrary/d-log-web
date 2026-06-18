import { Center } from "@components/shared-components/center"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BORDER, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled, { css } from "styled-components"

export const Container = styled(HStack).attrs({
  width: "100%",
  spacing: "0.75rem",
  borderRadius: "0.25rem",
  borderWidth: "1px",
  paddingHorizontal: "1.25rem",
  paddingVertical: "0.75rem",
})<{ variant: "error" | "success" }>((props) => ({
  boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.05)",
  ...(props.variant === "error" && {
    borderColor: BORDER.ALERT,
    color: TEXT.DANGER,
  }),
  ...(props.variant === "success" && {
    borderColor: BORDER.PRIMARY,
    color: TEXT.HIGH_EMPHASIS,
  }),
  ...css`
    ${MEDIA.UNDER_MOBILE} {
      padding: 0.5rem 0.75rem;
    }
  `,
}))

export const Icon = styled(Center).attrs({
  typo: "body",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const Content = styled(Text).attrs({
  typo: "body",
  weight: "normal",
})`
  white-space: pre-wrap;
  word-break: keep-all;
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`
