import { HStack, VStack } from "@components/shared-components/stack"
import styled from "styled-components"

export const Root = styled(VStack).attrs({
  height: "100vh",
})``

export const Container = styled(HStack)`
  flex: 1;
  overflow: hidden;
`

export const Content = styled(HStack).attrs({
  position: "relative",
  overflowX: "hidden",
  backgroundColor: "DEFAULT",
})`
  flex: 1;
`

type PageProps = {
  $isMilestoneRoute?: boolean
}

export const Page = styled.main<PageProps>`
  flex: 1;
  overflow: auto;
  padding: 3rem 3.125rem;
  padding-bottom: ${({ $isMilestoneRoute }) =>
    $isMilestoneRoute ? "0" : "3rem"};
  padding-right: ${({ $isMilestoneRoute }) =>
    $isMilestoneRoute ? "0" : "3.125rem"};
`

export const SideBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
`
