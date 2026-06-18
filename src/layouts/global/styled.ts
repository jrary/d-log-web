import { Box } from "@components/shared-components/box"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import styled from "styled-components"

export const Content = styled(Box).attrs({
  width: "100%",
  marginHorizontal: "auto",
})`
  flex: 1;

  ${MEDIA.UNDER_MOBILE} {
    max-width: unset;
  }
`
