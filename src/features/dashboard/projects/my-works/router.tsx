import { lazy } from "react"
import type { RouteObject } from "react-router"

const MyWorksPage = lazy(() => import("./pages/my-works-page"))

export const myWorks: RouteObject = {
  path: "my-works",
  element: <MyWorksPage />,
}
