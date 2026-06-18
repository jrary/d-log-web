import { Text } from "@components/shared-components/text"
import { BACKGROUND } from "@components/shared-components/tokens/color"
import * as Popover from "@radix-ui/react-popover"
import styled from "styled-components"

export const Container = styled(Popover.Close)`
  display: flex;
  align-items: center;
  gap: 0.62rem;
  padding: 0.5rem 1rem;

  appearance: none;
  border: none;
  background: none;

  cursor: pointer;

  &:hover {
    background-color: ${BACKGROUND.DEFAULT};
  }
`

export const Name = styled(Text).attrs({
  typo: "body3",
})`
  letter-spacing: -0.0125rem;
`

export const NameHighlight = styled.b`
  font-weight: 700;
`

export const Dial = styled(Text).attrs({
  typo: "body3",
  color: "TERTIARY",
})`
  letter-spacing: -0.0125rem;
`
