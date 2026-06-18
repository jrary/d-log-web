import { Box } from "@components/shared-components/box"
import styled from "styled-components"

const sidebarWidth = "35.8rem"

export const Container = styled(Box).attrs({
  height: "100%",
  overflowX: "auto",
  overflowY: "auto",
  backgroundColor: "WHITE",
  padding: "1.875rem",
  paddingBottom: "6.25rem",
  width: sidebarWidth,
})`
  filter: drop-shadow(-5px -3px 10px rgba(0, 0, 0, 0.05));
`

export const Animate = styled.div`
  overflow-x: visible;
  height: 100%;

  width: 0;
  transition: width 0.3s ease;

  ${Container} {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &[data-display="true"] {
    width: ${sidebarWidth};

    ${Container} {
      opacity: 1;
    }
  }
`
