import { create } from "zustand"
import { useMilestoneStore } from "./milestone"
import type { TaskViewModel } from "@features/dashboard/projects/wbs/types"

type TaskStore = {
  isCreatingTask: boolean
  creatingMilestoneId: number | null
  isEditingTask: boolean
  editingTaskId: number | null

  // 상태 변경 메서드
  setIsCreatingTask: (isCreating: boolean) => void
  setCreatingMilestoneId: (milestoneId: number | null) => void
  setIsEditingTask: (isEditing: boolean) => void
  setEditingTaskId: (taskId: number | null) => void

  // 작업 관련 메서드
  startCreatingTask: (milestoneId: number) => void
  cancelCreatingTask: () => void
  startEditingTask: (taskId: number) => void
  cancelEditingTask: () => void
  updateTask: (taskId: number, updates: Partial<TaskViewModel>) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  isCreatingTask: false,
  creatingMilestoneId: null,
  isEditingTask: false,
  editingTaskId: null,

  setIsCreatingTask: (isCreatingTask) => set({ isCreatingTask }),
  setCreatingMilestoneId: (creatingMilestoneId) => set({ creatingMilestoneId }),
  setIsEditingTask: (isEditingTask) => set({ isEditingTask }),
  setEditingTaskId: (editingTaskId) => set({ editingTaskId }),

  startCreatingTask: (milestoneId) => {
    set({
      isCreatingTask: true,
      creatingMilestoneId: milestoneId,
    })
  },

  cancelCreatingTask: () => {
    set({
      isCreatingTask: false,
      creatingMilestoneId: null,
    })
  },

  startEditingTask: (taskId) => {
    set({
      isEditingTask: true,
      editingTaskId: taskId,
    })
  },

  cancelEditingTask: () => {
    set({
      isEditingTask: false,
      editingTaskId: null,
    })
  },

  updateTask: (taskId, taskUpdate) => {
    // 해당 태스크가 속한 마일스톤 찾기
    const milestones = useMilestoneStore.getState().milestones
    const milestoneWithTask = milestones.find((milestone) =>
      milestone.tasks.some((task) => task.id === taskId),
    )

    if (!milestoneWithTask) return

    // 마일스톤 내 태스크 업데이트
    const updateMilestone = useMilestoneStore.getState().updateMilestone
    const updatedTasks = milestoneWithTask.tasks.map((task) =>
      task.id === taskId ? { ...task, ...taskUpdate } : task,
    )

    updateMilestone(milestoneWithTask.id, { tasks: updatedTasks })
  },
}))
