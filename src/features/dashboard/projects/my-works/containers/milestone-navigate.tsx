import { MilestoneContainer } from "@features/dashboard/projects/histories/components/styled"
import { MilestoneLink } from "@features/dashboard/projects/my-works/components/milestone-link"
import { useGetMilestonesQueryObject } from "@features/dashboard/queries/useGetMilestonesQueryObject"
import { wrap } from "@suspensive/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useParams, useSearchParams } from "react-router"

export const MilestoneNavigate = wrap.Suspense().on(function () {
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const { data: milestones = [] } = useSuspenseQuery(
    useGetMilestonesQueryObject(clientProjectContractId),
  )
  const [searchParams] = useSearchParams()
  const selectedMilestoneId = searchParams.get("milestone")

  return (
    <nav id="milestone-list">
      <MilestoneContainer>
        <li>
          <MilestoneLink active={!selectedMilestoneId}>전체</MilestoneLink>
        </li>
        {milestones.map((milestone) => (
          <li key={milestone.id}>
            <MilestoneLink
              active={searchParams.get("milestone") === milestone.id.toString()}
              milestoneId={milestone.id.toString()}>
              {milestone.milestoneName || "Milestone"}
            </MilestoneLink>
          </li>
        ))}
      </MilestoneContainer>
    </nav>
  )
})
