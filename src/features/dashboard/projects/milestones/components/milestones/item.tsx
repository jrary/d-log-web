import { Button } from "@components/button.styled"
import { RangeDayPicker } from "@components/form/day-picker"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { show } from "@ebay/nice-modal-react"
import { DeleteMilestoneCheckModal } from "@features/dashboard/projects/milestones/components/modals/delete-milestone-check"
import { useGetMilestoneTasksQueryObject } from "@features/dashboard/projects/milestones/queries/useGetMilestoneTasksQueryObject"
import * as Popover from "@radix-ui/react-popover"
import { useSuspenseQuery } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { Suspense } from "react"
import { useNavigate, useParams } from "react-router"
import Calendar from "~icons/local/ic_calendar"
import More from "~icons/local/ic_more"
import Server from "~icons/local/ic_server"
import * as Styled from "./item.styled"
import type { ProjectMilestoneListDto } from "@apis/model"

type Props = {
  milestone: ProjectMilestoneListDto
}

export function MilestoneItem({ milestone }: Props) {
  const navigate = useNavigate()

  return (
    <Styled.Container>
      <Styled.Header onClick={() => navigate(`${milestone.id}/tasks`)}>
        <HStack spacing="0.75rem">
          <Styled.Title>{milestone.milestoneName}</Styled.Title>
        </HStack>
        <Popover.Root>
          <Popover.Trigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="s" square>
              <More />
            </Button>
          </Popover.Trigger>
          <Styled.PopoverContent onClick={(e) => e.stopPropagation()}>
            <Popover.Close asChild>
              <Styled.Detail to={`${milestone.id}`}>수정하기</Styled.Detail>
            </Popover.Close>
            <Styled.Action
              onClick={() => {
                show(DeleteMilestoneCheckModal, {
                  milestoneId: milestone.id,
                  milestoneObject: milestone.milestoneName,
                })
              }}>
              삭제하기
            </Styled.Action>
          </Styled.PopoverContent>
        </Popover.Root>
      </Styled.Header>
      <Styled.Content>
        <Styled.ContentItem>
          <Styled.ContentTitle>
            <Calendar />
            일정
          </Styled.ContentTitle>
          <RangeDayPicker
            triggerDisabled
            highlight
            numberOfMonths={2}
            showOutsideDays
            selected={{
              from: new Date(milestone.milestoneStartDate),
              to: new Date(milestone.milestoneEndDate),
            }}
          />
        </Styled.ContentItem>
        <Styled.ContentItem direction="vertical">
          <Styled.ContentTitle>
            <Server />
            하위 태스크
          </Styled.ContentTitle>
          <Suspense>
            <Features milestoneId={milestone.id} />
          </Suspense>
        </Styled.ContentItem>
      </Styled.Content>
    </Styled.Container>
  )
}

type FeaturesProps = {
  milestoneId: number
}

export function Features({ milestoneId }: FeaturesProps) {
  const navigate = useNavigate()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const projectWorkerId = toNumber(useParams().projectWorkerId)
  const { data: tasks } = useSuspenseQuery(
    useGetMilestoneTasksQueryObject(
      clientProjectContractId,
      milestoneId,
      projectWorkerId,
    ),
  )

  if (!tasks?.totalElements) {
    return (
      <Text typo="body1" color="TERTIARY" align="center">
        아직 등록된 하위 태스크가 없습니다.
      </Text>
    )
  }

  return (
    <Styled.Features>
      {(tasks?.contents ?? []).map((task, idx) => (
        <Styled.FeatureItem
          key={idx}
          onClick={() =>
            navigate(`${milestoneId}/tasks/${task.id}`)
          }>{`${task.taskName}`}</Styled.FeatureItem>
      ))}
      {(tasks?.totalElements ?? 0) > 4 && (
        <Text typo="body1">외 {(tasks?.totalElements ?? 0) - 4} 개</Text>
      )}
    </Styled.Features>
  )
}
