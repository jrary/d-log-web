import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  maxWidth: "1080px",
  marginHorizontal: "auto",
  marginBottom: "70px",
  spacing: "24px",
})``

export const Title = styled(Text).attrs({
  as: "h1",
  typo: "t1",
  weight: "bold",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub2}
  }
`

export const Description = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "SECONDARY",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`
