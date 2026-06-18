import { HStack } from "@components/shared-components/stack"
import { COLOR, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import styled from "styled-components"

export const Checkbox = styled.input`
  display: none;
`

export const CheckboxButton = styled(HStack).attrs({
  as: "span",
  align: "center",
  justify: "center",
  borderWidth: "1px",
  borderColor: COLOR.GRAY_40,
  backgroundColor: "WHITE",
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "0.375rem",
  padding: "0.25rem",
})`
  flex: none;
  color: ${TEXT.WHITE};

  svg {
    display: none;
    width: 1.1rem;
    height: 1.1rem;
  }

  ${MEDIA.UNDER_MOBILE} {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.2rem;

    svg {
      display: none;
      width: 1rem;
      height: 1rem;
    }
  }
`

export const Container = styled(HStack).attrs({
  as: "label",
  align: "center",
  spacing: "0.62rem",
})`
  cursor: pointer;
  user-select: none;
  min-height: 1.5rem;

  ${Checkbox}:checked ~ ${CheckboxButton} {
    background-color: ${COLOR.GREEN_500};
    border-color: transparent;

    svg {
      display: block;
    }
  }

  ${MEDIA.UNDER_MOBILE} {
    gap: 0.5rem;
  }
`
