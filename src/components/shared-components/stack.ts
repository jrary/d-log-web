import {
  layoutStyle,
  marginStyle,
} from "@components/shared-components/types/props-style"
import styled, { css } from "styled-components"
import type {
  LayoutProps,
  MarginProps,
} from "@components/shared-components/types/props"
import type { CSSProperties } from "styled-components"

type Display = "flex" | "inline-flex"
type Direction = "horizontal" | "vertical"

type BaseAlignment = "start" | "center" | "end" | "stretch"
type Align = BaseAlignment | "baseline"
type Justify = BaseAlignment | "between"

type StackOwnProps = {
  display?: Display
  direction: Direction
  align?: Align
  justify?: Justify
  spacing?: CSSProperties["gap"]
  reverse?: boolean
  flexWrap?: boolean
}

export type StackProps = LayoutProps & MarginProps & StackOwnProps

function align(value?: Align) {
  return value === "start" || value === "end"
    ? (`flex-${value}` as const)
    : value
}

function justify(value?: Justify) {
  return value === "start" || value === "end"
    ? (`flex-${value}` as const)
    : value === "between"
      ? "space-between"
      : value
}

function fledDirection(value: Direction, reverse = false) {
  return `${value === "horizontal" ? "row" : "column"}${reverse ? "-reverse" : ""}` as const
}

export const Stack = styled.div<StackProps>((props) => {
  const stackStyle = css({
    display: props.display || "flex",
    flexWrap: props.flexWrap ? "wrap" : undefined,
    flexDirection: fledDirection(props.direction, props.reverse),
    alignItems: align(props.align),
    justifyContent: justify(props.justify),
    gap: props.spacing,
  })

  return css`
    ${stackStyle}
    ${marginStyle}
    ${layoutStyle}
  `
})

export type HStackProps = Omit<StackProps, "direction">

export const HStack = styled(Stack).attrs({
  direction: "horizontal",
})<HStackProps>``

export type VStackProps = Omit<StackProps, "direction">

export const VStack = styled(Stack).attrs({
  direction: "vertical",
})<VStackProps>``
