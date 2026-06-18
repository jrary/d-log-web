import { Button } from "@components/button.styled"
import { HStack } from "@components/shared-components/stack"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  as: "header",
  justify: "between",
  align: "center",
})``

export const BackLink = styled(Link)`
  ${typography.body1}

  display: flex;
  align-items: center;
  gap: 0.25rem;

  text-decoration: none;

  svg {
    width: 1rem;
    height: auto;
  }
`

export const Submit = styled(Button).attrs({
  type: "submit",
})`
  ${typography.body1}

  width: 7.5rem;
  font-weight: 500;
`
