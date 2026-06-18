import { auth } from "@features/auth/router"
import { dashboard } from "@features/dashboard/router"
import { myPage } from "@features/my-page/router"
import { recruitment } from "@features/recruitment/router"
import { lazy } from "react"
import { createBrowserRouter } from "react-router"
import { ErrorPage } from "@/layouts/404"
import { GlobalLayout } from "@/layouts/global"

const LandingPage = lazy(() => import("@features/home/pages/landing-page"))
const ProgramsPage = lazy(() => {
  return import("@features/programs/pages/programs-page")
})
const ChangePassword = lazy(() => {
  return import("@features/auth/change-password/pages/change-password-page")
})

export const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        handle: {
          layout: {
            maxWidth: "100vw",
          },
        },
      },
      {
        path: "/programs",
        element: <ProgramsPage />,
      },
      {
        path: "/nerd/change-password",
        element: <ChangePassword />,
      },
      auth,
      myPage,
      recruitment,
    ],
  },
  dashboard,
])
