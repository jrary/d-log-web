import { useGetMilestoneProgressQueryObject } from "@features/dashboard/projects/my-works/queries/useGetMilestoneProgressQueryObject"
import { useGetTaskProgressQueryObject } from "@features/dashboard/projects/my-works/queries/useGetTaskProgressQueryObject"
import { useGetTasksQueryObject } from "@features/dashboard/projects/my-works/queries/useGetTasksQueryObject"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import {
  milestonesListToViewModel,
  tasksToViewModel,
} from "@features/dashboard/projects/wbs/utils/converter"
import { useGetMilestonesQueryObject } from "@features/dashboard/queries/useGetMilestonesQueryObject"
import { useQueries, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useGetMilestonesAndTasks = (contractId: number) => {
  const setIsLoading = useMilestoneStore((state) => state.setIsLoading)
  const setMilestones = useMilestoneStore((state) => state.setMilestones)
  const updateMilestone = useMilestoneStore((state) => state.updateMilestone)
  const goToday = useTimelineStore((state) => state.goToday)
  const [isDataSettled, setIsDataSettled] = useState(false)

  // 현재 프로젝트의 마일스톤 목록 조회
  const { data: milestones, isLoading: milestonesLoading } = useQuery({
    ...useGetMilestonesQueryObject(contractId),
    enabled: !!contractId,
  })

  const milestoneProgressQueries = useQueries({
    queries:
      milestones?.map((milestone) => ({
        ...useGetMilestoneProgressQueryObject(contractId, milestone.id),
        enabled: !!contractId && !!milestone.id,
      })) || [],
  })

  // 마일스톤별 태스크 조회 쿼리
  const milestonesTasksQueries = useQueries({
    queries:
      milestones?.map((milestone) => ({
        ...useGetTasksQueryObject(contractId, milestone.id, undefined),
        enabled: !!contractId && !!milestone.id,
      })) || [],
  })

  // milestonesTasksQueries에서 태스크 id를 모두 추출
  const allTasks = milestonesTasksQueries
    .map((query) => (Array.isArray(query.data) ? query.data : []))
    .flat()
  const allTaskIds = allTasks.map((task) => task.id)

  // 태스크별 진행률 쿼리
  const taskProgressQueries = useQueries({
    queries:
      allTaskIds.map((taskId) => ({
        ...useGetTaskProgressQueryObject(contractId, taskId),
        enabled: !!contractId && !!taskId,
      })) || [],
  })

  // 마일스톤 데이터와 태스크 데이터를 스토어에 설정
  useEffect(() => {
    if (!milestones) return

    const allQueriesSuccess = milestonesTasksQueries.every(
      (query) => query.isSuccess && query.data,
    )
    const allProgressQueriesSuccess = milestoneProgressQueries.every(
      (query) => query.isSuccess && !isNaN(query.data ?? 0),
    )

    if (allQueriesSuccess && allProgressQueriesSuccess) {
      // 마일스톤 데이터 준비
      const milestonesViewModel = milestonesListToViewModel(
        milestones.map((m, index) => ({
          ...m,
          progressPercent: milestoneProgressQueries[index].data ?? 0,
        })),
      )

      // 태스크 데이터를 마일스톤 데이터에 통합
      const milestonesWithTasks = milestonesViewModel.map((milestone) => {
        const milestoneIndex = milestones.findIndex(
          (m) => m.id === milestone.id,
        )
        if (
          milestoneIndex !== -1 &&
          milestonesTasksQueries[milestoneIndex]?.data
        ) {
          const tasks = milestonesTasksQueries[milestoneIndex].data
          const tasksViewModel = tasksToViewModel(tasks, milestone.id).filter(
            (task) => task.title !== "회의",
          )

          // 각 태스크에 진행률 매핑
          const tasksWithProgress = tasksViewModel.map((task) => {
            // allTasks에서 현재 task의 index를 찾음
            const taskIdx = allTasks.findIndex((t) => t.id === task.id)
            const progress =
              taskIdx !== -1 && taskProgressQueries[taskIdx]?.data !== undefined
                ? taskProgressQueries[taskIdx].data
                : 0
            return {
              ...task,
              progress,
            }
          })

          return {
            ...milestone,
            tasks: tasksWithProgress,
          }
        }
        return milestone
      })

      // 모든 데이터를 한 번에 설정
      setMilestones(milestonesWithTasks)

      // 모든 데이터 설정이 완료됨을 표시
      setIsDataSettled(true)
      setIsLoading(false)
    }

    // cleanup 함수
    return () => {
      setIsLoading(true)
      setIsDataSettled(false)
    }
  }, [
    milestones,
    milestonesTasksQueries,
    milestoneProgressQueries,
    taskProgressQueries,
    setMilestones,
    updateMilestone,
    goToday,
  ])

  const isQueriesLoading =
    milestonesLoading ||
    milestonesTasksQueries.some((query) => query.isLoading) ||
    milestoneProgressQueries.some((query) => query.isLoading) ||
    taskProgressQueries.some((query) => query.isLoading)

  return {
    isLoading: isQueriesLoading || !isDataSettled,
    isError:
      milestonesTasksQueries.some((query) => query.isError) ||
      milestoneProgressQueries.some((query) => query.isError) ||
      taskProgressQueries.some((query) => query.isError),
  }
}
