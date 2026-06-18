import type { ProjectMilestoneTaskWorkerDto } from "@apis/model"

export type YearMonth = {
  year: number
  month: number
}

/** View Model */
export type TaskViewModel = {
  id: number
  title: string
  projectWorkerList?: ProjectMilestoneTaskWorkerDto[]
  progress: number
  milestoneId: number
  date?: {
    startDate: Date
    endDate: Date
  }
}

export type MilestoneViewModel = {
  id: number
  name: string
  objective: string
  date?: {
    startDate: Date
    endDate: Date
  }
  isOpenTasks: boolean
  progressPercent: number
  tasks: TaskViewModel[]
}

export type ProjectViewModel = {
  id: string
  name: string
  milestones: MilestoneViewModel[]
}
