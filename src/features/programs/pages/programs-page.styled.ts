import { MEDIA } from "@components/shared-components/tokens/responsive"
import styled from "styled-components"

export const Container = styled.div`
  padding-top: 4.3rem;
  padding-bottom: 12.5rem;

  ${MEDIA.UNDER_MOBILE} {
    padding: 2.5rem 1.25rem 8.75rem;
  }
`
