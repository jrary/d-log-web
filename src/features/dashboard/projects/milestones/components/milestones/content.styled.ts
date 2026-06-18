import { Button } from "@components/button.styled"
import { Link } from "react-router"
import styled from "styled-components"
import type { LinkProps } from "react-router"

export const CreateMilestoneLink = styled(Button).attrs({
  variant: "primary-outline",
  size: "xl",
  as: Link,
})<LinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
`
