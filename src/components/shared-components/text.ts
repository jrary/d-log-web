import { TEXT } from "@components/shared-components/tokens/color"
import { token } from "@components/shared-components/tokens/typography"
import { marginStyle } from "@components/shared-components/types/props-style"
import { getTokenColor } from "@components/shared-components/utils/get-color"
import styled, { css } from "styled-components"
import type {
  COLOR,
  TextColor,
} from "@components/shared-components/tokens/color"
import type { MarginProps } from "@components/shared-components/types/props"

export type Typography =
  | "h1"
  | "h2"
  | "h3"
  | "t1"
  | "t2"
  | "sub1"
  | "sub2"
  | "sub3"
  | "body"
  | "body1"
  | "body2"
  | "body3"
  | "caption"

type Weight = "light" | "regular" | "medium" | "bold"
type TextAlign = "left" | "center" | "right"
type WhiteSpace = "pre-wrap" | "pre-line" | "normal" | "nowrap"

type TextOwnProps = {
  typo?: Typography
  color?: COLOR | TextColor | "inherit"
  weight?: Weight
  italic?: boolean
  truncated?: boolean | number
  align?: TextAlign
  whiteSpace?: WhiteSpace
  keepAll?: boolean
}

export type TextProps = TextOwnProps & MarginProps

export const Text = styled.span<TextProps>(({ typo = "body2", ...props }) => {
  const currentTypo = token[typo]
  if (currentTypo === undefined) {
    throw new Error(`Typography ${typo} not found`)
  }

  const typoStyle = css(currentTypo)

  const fontStyle = css({
    textAlign: props.align,
    fontWeight: props.weight,
    whiteSpace: props.whiteSpace,
    color: getTokenColor(TEXT, props.color),
    fontStyle: props.italic ? "italic" : undefined,
    wordBreak: props.keepAll ? "keep-all" : undefined,
  })

  let truncatedStyle = css``

  if (props.truncated === true) {
    truncatedStyle = css({
      overflow: "hidden",
      display: "block",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    })
  }

  if (typeof props.truncated === "number") {
    truncatedStyle = css({
      overflow: "hidden",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: props.truncated,
      maxHeight: `calc(${props.truncated} * ${currentTypo.lineHeight})`,
      textOverflow: "ellipsis",
    })
  }

  return css`
    ${typoStyle}
    ${fontStyle}
    ${truncatedStyle}
    ${marginStyle}
  `
})
