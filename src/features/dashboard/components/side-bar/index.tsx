import { Presence } from "@components/presence"
import { useGetElementById } from "@hooks/useGetElementById"
import { isEmpty } from "es-toolkit/compat"
import { createPortal } from "react-dom"
import { useOutlet } from "react-router"
import * as Styled from "./styled"

export function SideBar() {
  const targetElement = useGetElementById("sidebar-content")
  const outlet = useOutlet()

  return createPortal(
    <Styled.Animate data-display={!isEmpty(outlet)}>
      <Styled.Container>
        <Presence>{outlet}</Presence>
      </Styled.Container>
    </Styled.Animate>,
    targetElement ?? document.body,
  )
}
