import { MEDIA } from "@components/shared-components/tokens/responsive"
import styled from "styled-components"

export const Toggle = styled.span`
  display: flex;
  align-items: center;

  user-select: none;
  cursor: pointer;

  ${MEDIA.UNDER_MOBILE} {
    svg {
      height: 1.2rem;
      width: 1.2rem;
    }
  }
`
