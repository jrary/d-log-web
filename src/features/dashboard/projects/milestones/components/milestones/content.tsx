import { VStack } from "@components/shared-components/stack"
import { CreateMilestone } from "@features/dashboard/projects/milestones/components/milestones/create-milestone"
import { Empty } from "@features/dashboard/projects/milestones/components/milestones/empty"
import { MilestoneItem } from "@features/dashboard/projects/milestones/components/milestones/item"
import { useGetMilestonesQueryObject } from "@features/dashboard/projects/milestones/queries/useGetMilestonesQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import { isEmpty, last } from "es-toolkit/compat"
import { useMatches, useParams } from "react-router"
import Add from "~icons/local/ic_add"
import * as Styled from "./content.styled"

export function Content() {
  const lastMatch = last(useMatches())
  const isCreate = lastMatch?.pathname.includes("/create")

  const clientProjectContractId = Number(useParams().clientProjectContractId)
  const { data: items } = useSuspenseQuery(
    useGetMilestonesQueryObject(clientProjectContractId),
  )

  if (isEmpty(items) && !isCreate) {
    return <Empty />
  }

  return (
    <VStack spacing="1.75rem">
      {items?.map((item) => <MilestoneItem key={item.id} milestone={item} />)}
      {isCreate && <CreateMilestone />}
      <Styled.CreateMilestoneLink to="create">
        마일스톤 추가하기
        <Add />
      </Styled.CreateMilestoneLink>
    </VStack>
  )
}
