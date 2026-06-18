import { BACKGROUND, BORDER } from "@components/shared-components/tokens/color"
import { getTokenColor } from "@components/shared-components/utils/get-color"
import { css } from "styled-components"
import type {
  LayoutProps,
  MarginProps,
} from "@components/shared-components/types/props"

export const marginStyle = css<MarginProps>((props) =>
  css({
    marginTop: props.marginTop || props.marginVertical || props.margin,
    marginRight: props.marginRight || props.marginHorizontal || props.margin,
    marginBottom: props.marginBottom || props.marginVertical || props.margin,
    marginLeft: props.marginLeft || props.marginHorizontal || props.margin,
  }),
)

export const layoutStyle = css<LayoutProps>((props) => {
  const paddingStyle = css({
    paddingTop: props.paddingTop || props.paddingVertical || props.padding,
    paddingRight:
      props.paddingRight || props.paddingHorizontal || props.padding,
    paddingBottom:
      props.paddingBottom || props.paddingVertical || props.padding,
    paddingLeft: props.paddingLeft || props.paddingHorizontal || props.padding,
  })

  const borderStyle = css({
    borderStyle: props.borderStyle || "solid",
    borderTopWidth: props.borderTopWidth || props.borderWidth,
    borderRightWidth: props.borderRightWidth || props.borderWidth,
    borderBottomWidth: props.borderBottomWidth || props.borderWidth,
    borderLeftWidth: props.borderLeftWidth || props.borderWidth,
  })

  const overflowStyle = css({
    overflow: props.overflowX || props.overflow,
    overflowY: props.overflowY || props.overflow,
  })

  return css`
    ${paddingStyle}
    ${borderStyle}
    ${overflowStyle}
    
    width: ${props.width};
    height: ${props.height};
    max-width: ${props.maxWidth};
    min-width: ${props.minWidth};
    max-height: ${props.maxHeight};
    min-height: ${props.minHeight};
    position: ${props.position};
    inset: ${props.inset};
    top: ${props.top};
    right: ${props.right};
    bottom: ${props.bottom};
    left: ${props.left};
    flex-basis: ${props.basis};
    flex-shrink: ${props.shrink};
    flex-grow: ${props.grow};
    background-color: ${getTokenColor(BACKGROUND, props.backgroundColor)};
    border-color: ${getTokenColor(BORDER, props.borderColor)};
    border-radius: ${props.borderRadius};
  `
})
