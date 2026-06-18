import { Box } from "@components/shared-components/box"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  width: "100%",
  marginVertical: "3.25rem",
  marginHorizontal: "auto",
  spacing: "1.25rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    margin: 0rem;
    gap: 1.25rem;
  }
`

export const Title = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "DEFAULT",
  weight: "bold",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
    font-weight: 500;
    margin-top: 1rem;
  }
`

export const Description = styled(Text).attrs({
  as: "p",
  typo: "body3",
  color: "SECONDARY",
})``

export const Icon = styled(Box).attrs({
  width: "1.5rem",
  height: "1.5rem",
})`
  font-size: 1.5rem;
`

export const LikeTitle = styled(Text).attrs({
  typo: "body3",
  weight: "bold",
  color: "DEFAULT",
})``

export const LikeCount = styled(Text).attrs({
  typo: "body3",
  weight: "bold",
  color: "HIGH_EMPHASIS",
})``
