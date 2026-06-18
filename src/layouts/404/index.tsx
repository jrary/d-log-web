import { VStack } from "@components/shared-components/stack"
import { merge, negate } from "es-toolkit"
import { isEmpty } from "es-toolkit/compat"
import { useMatches } from "react-router"
import { Footer } from "@/layouts/global/footer"
import { Header } from "@/layouts/global/header"
import { Provider } from "@/layouts/provider"
import Image404 from "./assets/404-illustration.svg"
import * as Styled from "./styled"

const TEXT = {
  title: `죄송합니다. 찾을 수 없는 페이지예요!`,
  description: `존재하지 않는 주소를 입력하셨거나,\n요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없어요.`,
  mobileDescription: `존재하지 않는 주소를 입력하셨거나,\n요청하신 페이지의 주소가 변경, 삭제되어\n찾을 수 없어요.`,
  button: `홈으로 이동`,
}

type HandleWithLayout = {
  layout: LayoutConfig
}

type LayoutConfig = {
  maxWidth?: string | number
}

const defaultProps: LayoutConfig = {
  maxWidth: "67.5rem",
}

export function ErrorPage() {
  const matches = useMatches()
  const layoutProps = matches
    .map((match) => (match.handle as HandleWithLayout)?.layout)
    .filter(negate(isEmpty))
    .reduce((acc, config) => merge(acc, config), defaultProps)

  return (
    <Provider>
      <VStack height="100vh" overflowY="auto">
        <Header />
        <Styled.Content maxWidth={layoutProps.maxWidth}>
          <Styled.Container>
            <Styled.ErrorImage src={Image404} />
            <Styled.Title>{TEXT.title}</Styled.Title>
            <Styled.Description>{TEXT.description}</Styled.Description>
            <Styled.MobileDescription>
              {TEXT.mobileDescription}
            </Styled.MobileDescription>
          </Styled.Container>
          <Styled.HomeButton to="/">{TEXT.button}</Styled.HomeButton>
        </Styled.Content>
        <Footer />
      </VStack>
    </Provider>
  )
}
