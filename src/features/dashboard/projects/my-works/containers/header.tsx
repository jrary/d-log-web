import { HStack } from "@components/shared-components/stack"
import NiceModal from "@ebay/nice-modal-react"
import { PageHeader } from "@features/dashboard/components/page-header"
import { useGetProjectListQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectListQueryObject"
import { CreateMyWorksDialog } from "@features/dashboard/projects/my-works/components/create-my-works-dialog"
import { useGetFirstMilestoneQueryObject } from "@features/dashboard/queries/useGetMilestonesQueryObject"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useParams, useSearchParams } from "react-router"
import * as Styled from "./styled"

export function Header() {
  const milestoneId = toNumber(useSearchParams()[0].get("milestone"))
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const { data: first } = useSuspenseQuery(
    useGetFirstMilestoneQueryObject(clientProjectContractId),
  )

  const [{ data: projectList = [] }, { data: userInfo }] = useSuspenseQueries({
    queries: [useGetProjectListQueryObject(), useGetUserInfoQueryObject()],
  })

  const projectInfo = projectList.find(
    (project) => project.clientProjectContractId === clientProjectContractId,
  )

  return (
    <HStack justify="between" align="center">
      <PageHeader
        title={`[${projectInfo?.title}] 의 작업 공간`}
        description={`${userInfo?.nickname}님에게 배정된 작업 내역을 기록해 주세요.`}
      />
      <Styled.AddButton
        onClick={() => {
          NiceModal.show(CreateMyWorksDialog, {
            clientContractId: clientProjectContractId,
            milestoneId: milestoneId || first?.id,
          })
        }}>
        작업 기록 추가
      </Styled.AddButton>
    </HStack>
  )
}
