import { create } from "zustand"
import type { MilestoneViewModel } from "@features/dashboard/projects/wbs/types"

type MilestoneStore = {
  isLoading: boolean
  milestones: MilestoneViewModel[]
  isCreating: boolean
  isEditing: boolean
  editingMilestoneId: number | null

  setIsLoading: (isLoading: boolean) => void

  setMilestones: (milestones: MilestoneViewModel[]) => void
  updateMilestone: (id: number, milestone: Partial<MilestoneViewModel>) => void
  setIsCreating: (isCreating: boolean) => void
  setIsEditing: (isEditing: boolean) => void
  setEditingMilestoneId: (id: number | null) => void

  removeTaskFromMilestone: (milestoneId: number, taskId: number) => void
  startCreating: () => void
  cancelCreating: () => void
  startEditing: (id: number) => void
  submitEditMilestone: (name: string) => void
  cancelEditing: () => void
}

export const useMilestoneStore = create<MilestoneStore>((set, get) => ({
  milestones: [],
  isLoading: true,
  isCreating: false,
  isEditing: false,
  editingMilestoneId: null,

  setIsLoading: (isLoading) => set({ isLoading }),
  setMilestones: (milestones) => set({ milestones }),
  updateMilestone: (id, milestone) =>
    set((state) => {
      const currentMilestone = state.milestones.find((item) => item.id === id)

      if (!currentMilestone) {
        return { milestones: state.milestones }
      }

      const updatedMilestone = { ...currentMilestone, ...milestone }

      // 내부에 Date 객체를 사용하기 때문에 변경 사항이 없어도 리렌더링 되는 문제를 해결하기 위해 문자열로 비교
      if (
        JSON.stringify(currentMilestone) === JSON.stringify(updatedMilestone)
      ) {
        return { milestones: state.milestones }
      }

      return {
        milestones: state.milestones.map((item) =>
          item.id === id ? updatedMilestone : item,
        ),
      }
    }),

  setIsCreating: (isCreating) => set({ isCreating }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setEditingMilestoneId: (editingMilestoneId) => set({ editingMilestoneId }),

  startCreating: () => {
    set({ isCreating: true })
  },

  cancelCreating: () => {
    set({ isCreating: false })
  },

  startEditing: (id) => {
    set({
      isEditing: true,
      editingMilestoneId: id,
    })
  },

  submitEditMilestone: (name) => {
    const { editingMilestoneId } = get()

    if (!editingMilestoneId || !name.trim()) {
      get().cancelEditing()
      return
    }

    get().updateMilestone(editingMilestoneId, { name: name.trim() })
    get().cancelEditing()
  },

  cancelEditing: () => {
    set({
      isEditing: false,
      editingMilestoneId: null,
    })
  },

  removeTaskFromMilestone: (milestoneId, taskId) =>
    set((state) => ({
      milestones: state.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.filter((task) => task.id !== taskId),
            }
          : milestone,
      ),
    })),
}))
