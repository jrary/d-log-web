import { TextField } from "@components/form/text-field"
import { useReducer } from "react"
import EyeClosed from "~icons/local/ic_eye_closed"
import EyeOpen from "~icons/local/ic_eye_open"
import * as Styled from "./styled"
import type { ComponentProps } from "react"

type PasswordProps = Omit<ComponentProps<typeof TextField.Control>, "type">

export function Password(props: PasswordProps) {
  const [visible, toggleVisible] = useReducer((state) => !state, false)

  return (
    <TextField.Root>
      <TextField.Control {...props} type={visible ? "text" : "password"} />
      <TextField.Slot direction="right">
        <Styled.Toggle onClick={toggleVisible}>
          {visible ? <EyeOpen /> : <EyeClosed />}
        </Styled.Toggle>
      </TextField.Slot>
    </TextField.Root>
  )
}
