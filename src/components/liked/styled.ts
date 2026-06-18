import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  spacing: "0.25rem",
  align: "center",
})``

export const Status = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }

  ${MEDIA.UNDER_MOBILE} {
    width: 1rem;
    height: 1rem;
  }
`

export const Count = styled(Text).attrs({
  as: "span",
  typo: "body1",
  color: "SECONDARY",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`
