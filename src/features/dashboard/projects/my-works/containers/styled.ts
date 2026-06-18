import { Button } from "@components/button.styled"
import { VStack } from "@components/shared-components/stack"
import { typography } from "@components/shared-components/tokens/typography"
import { Box } from "@mui/material"
import styled from "styled-components"

export const AddButton = styled(Button).attrs({
  size: "xl",
  variant: "primary",
})`
  ${typography.body1}
  width: 12.5rem;
  height: 3.38rem;
`

export const InfoIcon = styled(VStack).attrs({})`
  cursor: pointer;
  position: relative;

  &:hover .tooltip-container {
    visibility: visible;
    opacity: 1;
  }
`

export const TooltipContainer = styled(Box).attrs({
  className: "tooltip-container",
})`
  position: absolute;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s;

  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  width: max-content;
  overlow: visible;
`
