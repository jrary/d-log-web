import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  COLOR,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import styled from "styled-components"

export const Checkbox = styled.input`
  display: none;
`

export const Label = styled(Text).attrs({
  as: "span",
  typo: "body3",
  color: COLOR.NEUTRAL_600,
})``

export const Checked = styled.div`
  display: none;

  svg {
    height: 20px;
    width: 20px;
  }
`

export const Container = styled(HStack).attrs({
  as: "label",
  align: "center",
  height: "2.625rem",
  backgroundColor: COLOR.NEUTRAL_200,
  borderColor: COLOR.NEUTRAL_200,
  borderRadius: "6.25rem",
  paddingVertical: "0.62rem",
  paddingHorizontal: "0.75rem",
  borderWidth: "1px",
  borderStyle: "solid",
})`
  cursor: pointer;

  &:has(${Checkbox}:checked) {
    background-color: ${BACKGROUND.WHITE};
    border-color: ${BORDER.PRIMARY};
  }

  ${Checkbox}:checked ~ ${Label} {
    color: ${TEXT.HIGH_EMPHASIS};
  }

  ${Checkbox}:checked ~ ${Checked} {
    display: block;
  }

  // disabled 상태
  &:has(${Checkbox}:disabled) {
    background-color: ${COLOR.NEUTRAL_200};
    border: none;
    cursor: default;
  }

  ${Checkbox}:disabled ~ ${Label} {
    color: ${TEXT.DISABLED};
  }

  ${Checkbox}:disabled:checked ~ ${Checked} {
    display: none;
  }

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.65rem 0.62rem;
  }
`
