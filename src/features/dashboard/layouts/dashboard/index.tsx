import { Navigation } from "@features/dashboard/layouts/dashboard/navigation"
import { Outlet, useLocation } from "react-router"
import { Header } from "@/layouts/global/header"
import { Provider } from "@/layouts/provider"
import * as Styled from "./styled"

export function DashboardLayout() {
  const location = useLocation()
  const isMilestoneRoute = location.pathname.includes("/milestones")

  return (
    <Provider>
      <Styled.Root>
        <Header full />
        <Styled.Container>
          <Navigation />
          <Styled.Content>
            <Styled.Page $isMilestoneRoute={isMilestoneRoute}>
              <Outlet />
            </Styled.Page>
            <Styled.SideBar id="sidebar-content" />
          </Styled.Content>
        </Styled.Container>
      </Styled.Root>
    </Provider>
  )
}
