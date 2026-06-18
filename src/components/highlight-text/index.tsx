import { Fragment } from "react"
import * as Styled from "./styled"
import type { StyledComponent } from "styled-components"

type HighlightTextProps = {
  children: string
  highlightRegex: RegExp
  HighlightComponent?: StyledComponent<"span", object, object, never>
}

export function HighlightText({
  children,
  highlightRegex,
  HighlightComponent = Styled.Highlight,
}: HighlightTextProps) {
  return (
    <>
      {children.split(highlightRegex).map((text, index) => {
        if (highlightRegex.test(text)) {
          return <HighlightComponent key={index}>{text}</HighlightComponent>
        }

        return <Fragment key={index}>{text}</Fragment>
      })}
    </>
  )
}
