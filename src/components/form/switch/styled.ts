import { Box } from "@components/shared-components/box"
import { COLOR } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Input = styled.input`
  display: none;
`

export const Thumb = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: white;

  transition: transform 0.2s ease-in-out;
`

export const Root = styled(Box).attrs({
  as: "label",

  position: "relative",

  display: "inline-flex",
  alignItems: "center",
  justifyContent: "start",

  width: "3.25rem",
  height: "1.88rem",

  borderRadius: "100px",
  backgroundColor: COLOR.NEUTRAL_400,

  padding: "0.25rem",
})`
  cursor: pointer;

  &:has(${Input}:checked) {
    background-color: ${COLOR.GREEN_400};

    ${Thumb} {
      transform: translateX(100%);
    }
  }
`
