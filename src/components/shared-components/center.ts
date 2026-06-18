import {
  layoutStyle,
  marginStyle,
} from "@components/shared-components/types/props-style"
import styled, { css } from "styled-components"
import type {
  LayoutProps,
  MarginProps,
} from "@components/shared-components/types/props"

type Display = "flex" | "inline-flex"

type CenterOwnProps = {
  display?: Display
}

export type CenterProps = LayoutProps & MarginProps & CenterOwnProps

export const Center = styled.div<CenterProps>((props) => {
  const centerStyle = css({
    display: props.display || "flex",
    alignItems: "center",
    justifyContent: "center",
  })

  return css`
    ${centerStyle}
    ${marginStyle}
    ${layoutStyle}
  `
})
