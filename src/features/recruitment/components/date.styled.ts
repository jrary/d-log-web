import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  spacing: "0.25rem",
  align: "start",
  wrap: true.toString(),
})`
  ${Text} {
    ${typography.body1}

    ${MEDIA.UNDER_MOBILE} {
      ${typography.caption}
    }
  }
`

export const Date = styled(HStack).attrs({
  as: "dl",
  spacing: "0.25rem",
  align: "center",
})`
  dd {
    color: ${TEXT.SECONDARY};
  }
`

export const Row = styled(HStack).attrs({
  spacing: "0.25rem",
  justify: "start",
})``
