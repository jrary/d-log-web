import type {
  BackgroundColor,
  BorderColor,
  COLOR,
} from "@components/shared-components/tokens/color"
import type { ZIndex } from "@components/shared-components/tokens/z-index"
import type { CSSProperties } from "styled-components"

export type MarginProps = {
  margin?: CSSProperties["margin"]
  marginHorizontal?: CSSProperties["margin"]
  marginVertical?: CSSProperties["margin"]
  marginTop?: CSSProperties["marginTop"]
  marginRight?: CSSProperties["marginRight"]
  marginBottom?: CSSProperties["marginBottom"]
  marginLeft?: CSSProperties["marginLeft"]
}

type Position = "absolute" | "fixed" | "relative" | "sticky"
type Overflow = "auto" | "hidden" | "scroll" | "visible"

export type LayoutProps = {
  padding?: CSSProperties["padding"]
  paddingHorizontal?: CSSProperties["padding"]
  paddingVertical?: CSSProperties["padding"]
  paddingTop?: CSSProperties["paddingTop"]
  paddingRight?: CSSProperties["paddingRight"]
  paddingBottom?: CSSProperties["paddingBottom"]
  paddingLeft?: CSSProperties["paddingLeft"]
  width?: CSSProperties["width"]
  height?: CSSProperties["height"]
  maxWidth?: CSSProperties["maxWidth"]
  minWidth?: CSSProperties["minWidth"]
  maxHeight?: CSSProperties["maxHeight"]
  minHeight?: CSSProperties["minHeight"]
  position?: Position
  inset?: CSSProperties["inset"]
  top?: CSSProperties["top"]
  right?: CSSProperties["right"]
  bottom?: CSSProperties["bottom"]
  left?: CSSProperties["left"]
  basis?: CSSProperties["flexBasis"]
  shrink?: CSSProperties["flexShrink"]
  grow?: CSSProperties["flexGrow"]
  backgroundColor?: COLOR | BackgroundColor
  borderColor?: COLOR | BorderColor
  borderStyle?: CSSProperties["borderStyle"]
  borderRadius?: CSSProperties["borderRadius"]
  borderWidth?: CSSProperties["borderWidth"]
  borderTopWidth?: CSSProperties["borderTopWidth"]
  borderRightWidth?: CSSProperties["borderRightWidth"]
  borderBottomWidth?: CSSProperties["borderBottomWidth"]
  borderLeftWidth?: CSSProperties["borderLeftWidth"]
  zIndex?: ZIndex
  overflow?: Overflow
  overflowX?: Overflow
  overflowY?: Overflow
}
