import { SideBar } from "@features/dashboard/components/side-bar"
import WBS from "@features/dashboard/projects/wbs/components/wbs"
import { useGetProject } from "@features/dashboard/projects/wbs/pages/hooks/useGetProject"
import { Suspense } from "react"
import { useParams } from "react-router"
import { useGetMilestonesAndTasks } from "./hooks/useGetMilestonesAndTasks"
import Header, { HeaderSkeleton } from "./layout/Header"
import { Column } from "./layout/index.styled"

function WbsContent() {
  const { clientProjectContractId, projectWorkerId } = useParams<{
    clientProjectContractId: string
    projectWorkerId: string
  }>()
  const { isError } = useGetMilestonesAndTasks(Number(clientProjectContractId))
  const { currentProject } = useGetProject(
    Number(clientProjectContractId),
    Number(projectWorkerId),
  )

  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>

  return (
    <Column>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header project={currentProject} />
      </Suspense>
      <WBS />
    </Column>
  )
}

export default function WbsPage() {
  return (
    <>
      <WbsContent />
      <SideBar />
    </>
  )
}
