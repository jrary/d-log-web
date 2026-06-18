import { Button } from "@components/button.styled"
import { TextField } from "@components/form/text-field"
import { Box } from "@components/shared-components/box"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  BUTTON,
  COLOR,
  ICON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"
import * as Styled from "./styled"

export const Field = styled(Styled.Field).attrs({
  spacing: "1.25rem",
})``

export const Label = styled(Styled.Label)`
  align-items: start;
`

export const Description = styled(Text).attrs({
  typo: "body2",
  color: "SECONDARY",
})``

export const Tasks = styled(VStack).attrs({
  spacing: "0.62rem",
})``

export const AddButton = styled(HStack).attrs({
  width: "auto",
  justify: "center",
  align: "center",
  height: "3rem",
  spacing: "0.25rem",
  padding: "0.63rem",
  backgroundColor: "WHITE",
  marginTop: "0.63rem",
})`
  align-self: flex-start;
  color: ${TEXT.DEFAULT};
  border-radius: 0.25rem;
  border: 1px solid ${BORDER.DARK};
  cursor: pointer;

  &:hover {
    background-color: ${BACKGROUND.DARK};
  }

  ${Text} {
    text-align: center;
  }
`

export const Action = styled(HStack).attrs({
  justify: "between",
  align: "center",
  spacing: "0.25rem",
  padding: "1rem",
  backgroundColor: "WHITE",
})`
  color: ${TEXT.DEFAULT};
  border-radius: 0.25rem;
  border: 1px solid ${BORDER.LIGHT};
`

export const CreateTask = styled(Action).attrs({
  padding: "0.16rem",
  backgroundColor: "DEFAULT",
})`
  border-style: solid;

  ${TextField.Container} {
    border: none;
    background-color: ${BACKGROUND.DEFAULT};
  }

  ${TextField.Control} {
    ${typography.body1};
  }
`

export const Task = styled(Action).attrs({
  align: "center",
  backgroundColor: "WHITE",
})`
  color: ${TEXT.DEFAULT};
  cursor: pointer;

  &:hover {
    border: 1px solid ${COLOR.NEUTRAL_500};
  }

  .button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    height: 1.2rem;
    width: 1.2rem;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`

export const MenuTriggerButton = styled.div`
  background: transparent;
  border: none;
  width: 100%;
  min-height: 2.375rem;
  border-radius: 0;
  color: ${ICON.SECONDARY};

  &:hover {
    background-color: ${BACKGROUND.DARK};
  }

  width: fit-content;
  padding: 1rem 2.5rem;
  outline: none;
  white-space: nowrap;
`

export const TriggerButton = styled(Box).attrs({})`
  color: inherit;
  background: transparent;
  border-radius: 0.3rem;

  &:hover {
    background: ${BUTTON.HOVER};
  }
`

export const MenuActionButton = styled(Button).attrs({
  variant: "ghost",
  size: "l",
})`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  width: 100%;
`
