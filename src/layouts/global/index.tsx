import { VStack } from "@components/shared-components/stack"
import { merge, negate } from "es-toolkit"
import { isEmpty } from "es-toolkit/compat"
import { Outlet, useMatches } from "react-router"
import { Footer } from "@/layouts/global/footer"
import { Header } from "@/layouts/global/header"
import { Provider } from "@/layouts/provider"
import * as Styled from "./styled"

type HandleWithLayout = {
  layout: LayoutConfig
}

type LayoutConfig = {
  maxWidth?: string | number
}

const defaultProps: LayoutConfig = {
  maxWidth: "67.5rem",
}

export function GlobalLayout() {
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
          <Outlet />
        </Styled.Content>
        <Footer />
      </VStack>
    </Provider>
  )
}
