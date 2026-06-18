import { lazy } from "react"

const ListPage = lazy(() => {
  return import("@features/recruitment/list/pages/recruitment-list-page")
})
const DetailPage = lazy(() => {
  return import("@features/recruitment/detail/pages/recruitment-detail-page")
})

export const recruitment = {
  path: "/recruitment",
  handle: {
    layout: {
      maxWidth: "100vw",
    },
  },
  children: [
    {
      index: true,
      element: <ListPage />,
    },
    {
      path: ":recruitmentId",
      element: <DetailPage />,
    },
  ],
}
