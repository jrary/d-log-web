import {
  layoutStyle,
  marginStyle,
} from "@components/shared-components/types/props-style"
import styled, { css } from "styled-components"
import type {
  LayoutProps,
  MarginProps,
} from "@components/shared-components/types/props"

type BoxOwnProps = {
  display?: "block" | "inline" | "inline-block"
}

export type BoxProps = BoxOwnProps & MarginProps & LayoutProps

export const Box = styled.div<BoxProps>((props) => {
  const boxStyle = css({
    display: props.display || "block",
  })

  return css`
    ${boxStyle}
    ${marginStyle}
    ${layoutStyle}
  `
})
