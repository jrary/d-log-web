import { TextField } from "@components/form/text-field"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  TEXT,
} from "@components/shared-components/tokens/color"
import styled from "styled-components"
import * as Styled from "./platform.styled"

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

export const Platforms = styled(VStack).attrs({
  spacing: "0.75rem",
})``

export const Action = styled(HStack).attrs({
  justify: "center",
  align: "center",
  height: "3rem",
  spacing: "0.25rem",
  backgroundColor: "WHITE",
  as: "button",
  type: "button",
})`
  cursor: pointer;
  user-select: none;

  color: ${TEXT.DEFAULT};
  border-radius: 0.25rem;
  border: 2px solid ${BORDER.LIGHT};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 135, 0.04);

  ${Text} {
    text-align: center;
  }
`

export const CreatePlatform = styled(Action)`
  cursor: default;
  border-style: dashed;

  ${TextField.Container} {
    padding: 0;
    border: none;
  }

  ${TextField.Control} {
    text-align: center;
  }
`

export const Platform = styled(Action).attrs({
  position: "relative",
  backgroundColor: "DEFAULT",
  as: "label",
})`
  color: ${TEXT.DEFAULT};

  input {
    display: none;
  }

  &:has(input:checked) {
    background-color: ${BACKGROUND.WHITE};
    border-color: ${BORDER.PRIMARY};
  }

  &[data-default="true"]:has(input:checked) {
    border-color: ${BORDER.LIGHT};
    cursor: default;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    height: 1.5rem;
    width: 1.5rem;

    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translateY(-50%);

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`
