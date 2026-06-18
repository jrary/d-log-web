import {
  BACKGROUND,
  BORDER,
  COLOR,
  TEXT,
} from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Link = styled.div`
  & {
    --text-color: ${COLOR.NEUTRAL_600};
    --border-color: ${BORDER.LIGHT};
    --background-color: ${BACKGROUND.WHITE};
  }

  cursor: pointer;
  text-decoration: none;
  padding: 0.38rem 0.62rem;

  border-radius: 6.25rem;
  border: solid 1px var(--border-color);
  background-color: var(--background-color);

  color: var(--text-color);

  &[data-active="true"] {
    --text-color: ${TEXT.HIGH_EMPHASIS};
    --border-color: ${COLOR.GREEN_300};
    --background-color: ${COLOR.GREEN_200};
  }
`
