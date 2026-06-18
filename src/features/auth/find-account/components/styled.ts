import { Box } from "@components/shared-components/box"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import styled from "styled-components"

export const Container = styled(Box).attrs({
  as: "section",
  paddingHorizontal: "3.12rem",
  paddingVertical: "6rem",
})`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  box-sizing: content-box;

  ${MEDIA.UNDER_MOBILE} {
    grid-template-columns: unset;
    padding: 2.5rem 1.25rem 6rem;
  }
`
