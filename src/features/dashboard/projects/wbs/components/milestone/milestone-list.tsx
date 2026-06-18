import { Skeleton } from "@components/shared-components/skeleton"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import { Suspense, useEffect, useRef } from "react"
import Plus from "~icons/local/ic_plus"
import { CreateMilestoneInput } from "./create-milestone-input"
import {
  MilestoneCardSkeleton,
  MilestoneListContent,
  MilestoneListHeader,
  MilestoneListHeaderAddButton,
  MilestoneListWrapper,
  TaskCardSkeleton,
} from "./index.styled"
import MilestoneCard from "./milestone-card"

export default function MilestoneList() {
  const startCreating = useMilestoneStore((state) => state.startCreating)

  // Timeline 스토어에서 setMilestoneListRef 가져오기
  const setMilestoneListRef = useTimelineStore(
    (state) => state.setMilestoneListRef,
  )
  const handleMilestoneScroll = useTimelineStore(
    (state) => state.handleMilestoneScroll,
  )

  // MilestoneListContent에 대한 ref 생성
  const milestoneListRef = useRef<HTMLDivElement>(null)

  // 컴포넌트 마운트 시 ref를 Timeline 스토어에 설정
  useEffect(() => {
    setMilestoneListRef(milestoneListRef)
  }, [setMilestoneListRef])

  return (
    <MilestoneListWrapper
      ref={milestoneListRef}
      onScroll={handleMilestoneScroll}>
      <MilestoneListHeader>
        <div>
          <Text typo="body3" weight="regular">
            마일스톤
          </Text>
          <MilestoneListHeaderAddButton onClick={startCreating}>
            <Text typo="caption" weight="regular" color={COLOR.NEUTRAL_600}>
              만들기
            </Text>
            <Plus width={12} height={12} color={COLOR.NEUTRAL_500} />
          </MilestoneListHeaderAddButton>
        </div>
      </MilestoneListHeader>

      <Suspense fallback={<MilestoneListSkeleton />}>
        <MilestoneListContents />
      </Suspense>
    </MilestoneListWrapper>
  )
}

const MilestoneListContents = () => {
  const isLoading = useMilestoneStore((state) => state.isLoading)
  const milestones = useMilestoneStore((state) => state.milestones)
  const isCreating = useMilestoneStore((state) => state.isCreating)

  if (isLoading) throw new Promise((resolve) => setTimeout(resolve, 0))

  return (
    <MilestoneListContent>
      {milestones.map((milestone) => (
        <MilestoneCard key={milestone.id} milestone={milestone} />
      ))}
      {isCreating && <CreateMilestoneInput />}
    </MilestoneListContent>
  )
}

const MilestoneListSkeleton = () => {
  return (
    <MilestoneListContent>
      <MilestoneCardSkeleton>
        <Skeleton width="100%" height="20px" />
        <Skeleton width="100%" height="20px" />
      </MilestoneCardSkeleton>
      <TaskCardSkeleton>
        <Skeleton width="100%" height="22px" />
      </TaskCardSkeleton>
      <TaskCardSkeleton>
        <Skeleton width="100%" height="22px" />
      </TaskCardSkeleton>
      <TaskCardSkeleton>
        <Skeleton width="100%" height="22px" />
      </TaskCardSkeleton>
      <TaskCardSkeleton>
        <Skeleton width="100%" height="22px" />
      </TaskCardSkeleton>
    </MilestoneListContent>
  )
}
