import { Button } from "@components/button.styled"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { Link } from "react-router"
import styled from "styled-components"
import type { LinkProps } from "react-router"

export const Container = styled(VStack).attrs({
  as: "article",
  spacing: "2.5rem",
  align: "center",
  justify: "center",
})``

export const Content = styled(VStack).attrs({
  spacing: "1.5rem",
  align: "center",
  justify: "center",
})``

export const Image = styled.img`
  width: 18rem;
`

export const Title = styled(Text).attrs({
  typo: "sub2",
  color: "SECONDARY",
  whiteSpace: "pre-wrap",
  align: "center",
})``

export const Create = styled(Button).attrs({
  as: Link,
})<LinkProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  padding: 1.5rem;
  width: 14.75rem;

  font-weight: 500;
  text-decoration: none;
`
