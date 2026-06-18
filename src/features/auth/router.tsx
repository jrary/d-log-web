import { lazy } from "react"
import type { RouteObject } from "react-router"

const SignUpPage = lazy(() => {
  return import("@features/auth/sign-up/pages/sign-up-page")
})
const SignInPage = lazy(() => {
  return import("@features/auth/sign-in/pages/sign-in-page")
})
const FindAccount = lazy(() => {
  return import("@features/auth/find-account/pages/find-account-page")
})
const Withdrawal = lazy(() => {
  return import("@features/auth/withdrawal/pages/withdrawal-page")
})

export const auth: RouteObject = {
  path: "/auth",
  handle: {
    layout: {
      maxWidth: "33.2rem",
    },
  },
  children: [
    {
      path: "sign-up",
      element: <SignUpPage />,
    },
    {
      path: "sign-in",
      element: <SignInPage />,
    },
    {
      path: "find-account",
      element: <FindAccount />,
      handle: {
        layout: {
          maxWidth: "67.625rem",
        },
      },
    },
    {
      path: "withdrawal",
      element: <Withdrawal />,
    },
  ],
}
