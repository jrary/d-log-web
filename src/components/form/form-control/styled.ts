import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled, { css } from "styled-components"

export const Field = styled(VStack).attrs({
  as: "div",
  spacing: "0.5rem",
})<{ hidden?: boolean }>((props) => ({
  display: props.hidden ? "none" : undefined,
  ...css`
    ${MEDIA.UNDER_MOBILE} {
      gap: 0.375rem;
    }
  `,
}))

export const LabelContainer = styled(VStack).attrs({
  spacing: "0.25rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0;
  }
`

export const Label = styled(Text).attrs({
  as: "span",
  typo: "sub2",
  color: "BLACK",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const Description = styled(Text).attrs({
  as: "span",
  typo: "body1",
  color: "SECONDARY",
  keepAll: true,
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption};
  }
`

export const Content = styled(HStack).attrs({
  spacing: "0.75rem",
  height: "auto",
  align: "stretch",
})`
  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    gap: 0.37rem;
  }
`

export const ErrorText = styled(Text).attrs({
  as: "span",
  typo: "body3",
  color: COLOR.RED_300,
})`
  ${MEDIA.UNDER_MOBILE} {
    margin-top: -0.125rem;
    ${typography.caption};
  }
`
