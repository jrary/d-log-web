import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  maxWidth: "64.5rem",
  paddingVertical: "3rem",
  marginHorizontal: "auto",
  spacing: "1.25rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    padding: 1.25rem 1.88rem 2.5rem;
    gap: 0.88rem;
  }
`

export const Title = styled(Text).attrs({
  as: "h1",
  typo: "sub1",
  weight: "bold",
})<{ icon?: string }>`
  &::before {
    content: ${({ icon }) => `"${icon ?? ""} "`};
  }

  margin-left: 0.5rem;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1}
    margin-left: 0.25rem;
  }
`

export const List = styled(VStack).attrs({
  spacing: "inherit",
})``
