import * as Select from "@components/form/select/styled"
import * as TextField from "@components/form/text-field/styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"
import * as Styled from "./milestone-task.styled"

export const Field = styled(Styled.Field).attrs({
  spacing: "1.88rem",
})``

export const Label = styled(Styled.Label)`
  align-items: start;
`

export const Description = styled(Text).attrs({
  typo: "body2",
  color: "SECONDARY",
})``

export const AddTask = styled(Link).attrs({
  to: "../../tasks/create",
})`
  ${typography.body2}

  padding: 0.75rem;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  color: ${TEXT.HIGH_EMPHASIS};
  text-decoration: none;
`

export const Tasks = styled(VStack).attrs({
  spacing: "0.75rem",
  paddingHorizontal: "2.75rem",
})``

export const Task = styled(HStack).attrs({
  justify: "between",
  align: "center",
  spacing: "1.5rem",
})`
  --field-background-color: ${BACKGROUND.DEFAULT};

  &[data-action="create"] {
    --field-background-color: ${BACKGROUND.WHITE};
    --button-color: ${TEXT.HIGH_EMPHASIS};
  }
`
export const Steps = styled(VStack)`
  --border-color: ${BORDER.LIGHT};

  flex: 1;
  border-radius: 0.25rem;
  overflow: hidden;

  border: 2px solid var(--border-color);

  &[data-filled="true"] {
    --border-color: ${BORDER.PRIMARY};
  }

  ${TextField.Container} {
    border: none;
    background-color: var(--field-background-color);

    ${TextField.Control} {
      text-align: center;
    }
  }

  ${Select.Container} {
    border: none;
    gap: 1rem;
    justify-content: center;
    background-color: var(--field-background-color);

    &:not(:last-child) {
      border-bottom: 2px solid var(--border-color);
    }

    ${Select.Trigger} {
      flex: unset;
    }
  }
`

export const Button = styled(VStack).attrs({
  as: "button",
  justify: "center",
  align: "center",
})`
  border: none;
  background: none;
  cursor: pointer;

  color: var(--button-color);
`
