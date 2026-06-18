import { SideBar } from "@features/dashboard/components/side-bar"
import { Content } from "@features/dashboard/projects/milestones/components/milestones/content"
import { Header } from "@features/dashboard/projects/milestones/components/milestones/header"
import { Suspense } from "@suspensive/react"

export default function MilestonesPage() {
  return (
    <>
      <Header />
      <Suspense>
        <Content />
      </Suspense>

      <SideBar />
    </>
  )
}
