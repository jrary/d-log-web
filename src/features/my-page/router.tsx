import { lazy } from "react"
import { _redirectLandingPage } from "@/redirects/redirect-landing-page"
import type { RouteObject } from "react-router"

const MyPageLayout = lazy(() => {
  return import("@features/my-page/components/layout")
})
const MyPageMain = lazy(() => {
  return import("@features/my-page/main/pages/my-page")
})
const InterestProject = lazy(() => {
  return import("@features/my-page/interest/pages/interest-project-page")
})
const SetAccount = lazy(() => {
  return import("@features/my-page/set-account/pages/set-account-page")
})

export const myPage: RouteObject = {
  path: "/my-page",
  element: <MyPageLayout />,
  handle: {
    layout: {
      maxWidth: "67.5rem",
    },
  },
  loader: _redirectLandingPage,
  children: [
    {
      index: true,
      element: <MyPageMain />,
    },
    {
      path: "interest-project",
      element: <InterestProject />,
    },
    {
      path: "set-account",
      element: <SetAccount />,
    },
  ],
}
