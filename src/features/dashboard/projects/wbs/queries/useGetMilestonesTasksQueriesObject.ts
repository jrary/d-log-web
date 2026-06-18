import { client } from "@apis/client"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import type { ProjectMilestoneListDto } from "@apis/model/project-milestone-list-dto"

/**
 * 여러 마일스톤의 태스크를 일괄적으로 조회하기 위한 쿼리 객체 배열을 반환합니다.
 * useQueries와 함께 사용하기 위한 함수입니다.
 *
 * @param projectId 프로젝트 ID
 * @param milestones 마일스톤 목록
 * @param includeAllData 모든 데이터 포함 여부 (기본값: true)
 * @param projectWorkerId 작업자 ID (필터링 용도, 옵션)
 * @returns 쿼리 객체 배열
 */
export function useGetMilestonesTasksQueriesObject(
  clientProjectContractId: number,
  milestones: ProjectMilestoneListDto[] | undefined,
  includeAllData = true,
  projectWorkerId?: number,
) {
  if (!milestones || milestones.length === 0) {
    return []
  }

  return milestones.map((milestone) => ({
    queryKey: milestonesQueryKey.tasks(
      clientProjectContractId,
      milestone.id,
      projectWorkerId,
    ),
    queryFn: async () => {
      const response = await client.Task.getProjectMilestoneTasks(
        clientProjectContractId,
        includeAllData,
        milestone.id,
        projectWorkerId,
      )
      return {
        milestoneId: milestone.id,
        tasks: response.data.result?.projectMilestoneTaskList.contents || [],
      }
    },
    enabled: !!milestones && !!clientProjectContractId,
  }))
}
