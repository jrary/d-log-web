import { Text } from "@components/shared-components/text"
import { useNavigate, useSearchParams } from "react-router"
import * as Styled from "./milestone-link.styled"
import type { PropsWithChildren } from "react"

type Props = {
  milestoneId?: string
  active?: boolean
}

export function MilestoneLink({
  milestoneId,
  active = false,
  children,
}: PropsWithChildren<Props>) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isCurrentMilestone = searchParams.get("milestone") === milestoneId
  const isActive = active && searchParams.get("milestone") === null

  return (
    <Styled.Link
      onClick={() => navigate(milestoneId ? `?milestone=${milestoneId}` : "")}
      data-active={isActive || isCurrentMilestone}>
      <Text typo="body3">{children}</Text>
    </Styled.Link>
  )
}
