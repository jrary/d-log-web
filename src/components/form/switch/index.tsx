import { forwardRef } from "react"
import * as Styled from "./styled"
import type { ComponentProps } from "react"

export const Switch = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Styled.Input>
>((props, ref) => {
  return (
    <Styled.Root>
      <Styled.Input {...props} type="checkbox" ref={ref} />
      <Styled.Thumb />
    </Styled.Root>
  )
})
