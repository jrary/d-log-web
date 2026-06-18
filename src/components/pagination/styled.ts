import { HStack } from "@components/shared-components/stack"
import { BUTTON, TEXT } from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  as: "nav",
  align: "center",
  justify: "center",
  spacing: "0.12rem",
})``

export const Links = styled(HStack).attrs({
  as: "ul",
  spacing: "inherit",
})``

export const Navigate = styled(Link)`
  ${typography.caption}

  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.875rem;
  height: 1.875rem;

  border-radius: 0.25rem;
  transition: background-color 0.2s ease-in-out;

  text-decoration: none;
  color: ${TEXT.SECONDARY};

  &[data-active="true"] {
    color: ${TEXT.HIGH_EMPHASIS};
  }

  &[data-disabled="true"] {
    color: ${TEXT.DISABLED};
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${BUTTON.HOVER};
  }
`

export const Ellipsis = styled.span`
  ${typography.caption}

  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.875rem;
  height: 1.875rem;

  color: ${TEXT.SECONDARY};
`
