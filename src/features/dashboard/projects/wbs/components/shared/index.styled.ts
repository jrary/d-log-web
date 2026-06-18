import { BUTTON } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  padding: 0px;
  border-radius: 0.3rem;

  background-color: transparent;
  border: none;
  outline: none;

  cursor: pointer;
  &:hover {
    background: ${BUTTON.HOVER};
  }
`
