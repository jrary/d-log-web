import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

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
