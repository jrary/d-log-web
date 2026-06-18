import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router"
import LeftArrow from "~icons/local/ic_arrow_left.svg"
import * as Styled from "./mobile-bar.styled"

export default function MobileBar() {
  const location = useLocation()
  const navigation = useNavigate()

  const title = useMemo(() => {
    switch (location.pathname) {
      case "/my-page":
        return "진행중 프로젝트"
      case "/my-page/interest-project":
        return "관심 프로젝트"
      case "/my-page/set-account":
        return "계정 설정"
      default:
        return "마이페이지"
    }
  }, [location.pathname])

  return (
    <>
      <Styled.Container>
        <Styled.Button onClick={() => navigation(-1)}>
          <LeftArrow />
        </Styled.Button>
        <Styled.Title>{title}</Styled.Title>
      </Styled.Container>
      <Styled.GlobalStyle />
    </>
  )
}
