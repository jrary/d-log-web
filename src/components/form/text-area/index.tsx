import { findChild, toChildrenArray } from "@utils/children"
import { cloneElement, useState } from "react"
import * as Styled from "./styled"
import type { ChangeEvent, ReactElement } from "react"

type RootProps = {
  maxLength?: number
  children: ReactElement | ReactElement[]
}

function Root({ children, maxLength }: RootProps) {
  const childArray = toChildrenArray(children)

  const controlElem = findChild(childArray, Styled.Control) ?? <textarea />
  const [textLength, setTextLength] = useState(
    controlElem?.props.value?.length ?? 0,
  )

  const textLengthElem = findChild(childArray, Styled.TextLength)

  return (
    <Styled.Container>
      {cloneElement(controlElem, {
        onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
          setTextLength(e.target.value.length)
          controlElem.props.onChange?.(e)
        },
      })}
      {textLengthElem !== undefined && maxLength !== undefined
        ? cloneElement(textLengthElem, {
            "data-error": textLength > maxLength,
            children: `${textLength} / ${maxLength}`,
          })
        : null}
    </Styled.Container>
  )
}

export const TextArea = {
  Root,
  Control: Styled.Control,
  TextLength: Styled.TextLength,
}
