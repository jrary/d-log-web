import type { ProjectMilestoneListDto } from "@apis/model/project-milestone-list-dto"
import type { ProjectMilestoneTaskListDto } from "@apis/model/project-milestone-task-list-dto"
import type {
  MilestoneViewModel,
  TaskViewModel,
} from "@features/dashboard/projects/wbs/types"

/**
 * taskDto를 taskViewModel로 변환
 */
export const taskDtoToViewModel = (
  dto: ProjectMilestoneTaskListDto,
  milestoneId: number,
): TaskViewModel => {
  return {
    id: dto.id,
    title: dto.taskName,
    projectWorkerList: dto.projectWorkerList,
    progress: dto.progressPercent || 0,
    milestoneId,
    date:
      dto.expectedStartDate && dto.expectedEndDate
        ? {
            startDate: new Date(dto.expectedStartDate),
            endDate: new Date(dto.expectedEndDate),
          }
        : undefined,
  }
}

/**
 * 여러 태스크 DTO를 ViewModel으로 변환
 */
export const tasksToViewModel = (
  tasks: ProjectMilestoneTaskListDto[],
  milestoneId: number,
): TaskViewModel[] => {
  return tasks.map((task) => taskDtoToViewModel(task, milestoneId))
}

/**
 * ProjectMilestoneListDto를 MilestoneViewModel로 변환
 */
export const milestoneListDtoToViewModel = (
  dto: ProjectMilestoneListDto,
): MilestoneViewModel => {
  return {
    id: dto.id,
    name: dto.milestoneName,
    objective: dto.milestoneObjective,
    date:
      dto.milestoneStartDate && dto.milestoneEndDate
        ? {
            startDate: new Date(dto.milestoneStartDate),
            endDate: new Date(dto.milestoneEndDate),
          }
        : undefined,
    progressPercent: dto.progressPercent,
    isOpenTasks: true,
    tasks: [],
  }
}

/**
 * 여러 ProjectMilestoneListDto를 MilestoneViewModel 배열로 변환
 */
export const milestonesListToViewModel = (
  milestones: ProjectMilestoneListDto[],
): MilestoneViewModel[] => {
  return milestones.map((milestone) => milestoneListDtoToViewModel(milestone))
}
