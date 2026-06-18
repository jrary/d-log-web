import { Button } from "@components/button.styled"
import { FormControl } from "@components/form/form-control"
import { HStack, Stack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  COLOR,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import { ZIndex } from "@components/shared-components/tokens/z-index"
import styled from "styled-components"
import type { StackProps } from "@components/shared-components/stack"

export const Container = styled(VStack).attrs({
  backgroundColor: "WHITE",
  spacing: "2.5rem",
})`
  z-index: ${ZIndex.overlay};
`

export const Line = styled.div`
  height: 0.06rem;
  background: ${BORDER.LIGHT};
`

export const HideButton = styled(HStack).attrs({
  spacing: "0.25rem",
})`
  cursor: pointer;
`

export const HideButtonText = styled(Text).attrs({
  typo: "body1",
  color: "SECONDARY",
})``

export const Title = styled(Text).attrs({
  typo: "sub1",
  weight: "bold",
  color: "DEFAULT",
})``

export const InfoText = styled(Text).attrs({
  typo: "body1",
  color: "DEFAULT",
})``

export const InfoLabelText = styled(Text).attrs({
  typo: "body1",
  color: "DISABLED",
})``

export const InfoSelectedBox = styled(HStack).attrs({
  padding: "0.25rem",
  align: "center",
  spacing: "0.25rem",
  borderRadius: "0.25rem",
})<{
  isSelected: boolean
}>`
  ${(props) => props.isSelected && `background-color: ${BACKGROUND.DARK}`}
`

export const LinkInput = styled.input`
  ${typography.body1}
  padding: 0.875rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid ${BORDER.DARK};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${TEXT.PLACEHOLDER};
  }
`

export const SubmitButton = styled(Button).attrs({
  type: "submit",
})`
  ${typography.body1}

  width: 7.5rem;
  font-weight: 500;
`

export const Field = styled(FormControl.Container)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  ${FormControl.Label} {
    ${typography.body1};
    color: ${TEXT.DEFAULT};
  }
`

export const FieldTitle = styled(FormControl.Container)`
  justify-content: start;
`

export const FieldDate = styled(Stack).attrs(
  ({ direction = "vertical" }: StackProps) => ({
    direction,
    paddingVertical: "0.25rem",
    justify: "between",
    spacing: "1rem",
  }),
)`
  ${FormControl.Label} {
    ${typography.body1};
    color: ${TEXT.DEFAULT};
  }

  ${Text} {
    ${typography.body1};
  }
`

export const FieldToggle = styled(FormControl.Container)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${BACKGROUND.DEFAULT};

  ${FormControl.Label} {
    ${typography.body1};
    color: ${TEXT.DEFAULT};
  }
`

export const DeleteButton = styled(VStack).attrs({
  padding: "1rem",
  align: "center",
  borderWidth: "0.06rem",
  borderColor: "DARK",
  borderRadius: "0.25rem",
  backgroundColor: "WHITE",
})`
  cursor: pointer;
`

export const DetailButton = styled(Button).attrs({
  type: "button",
  variant: "secondary",
  boldText: true,
})`
  ${typography.body2};

  & svg {
    width: 16px;
    stroke: ${COLOR.GREEN_500};
  }
`
