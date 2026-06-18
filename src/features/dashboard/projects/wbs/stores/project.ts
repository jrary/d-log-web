import { create } from "zustand"
import type { ProjectListDto } from "@apis/model"

type ProjectStore = {
  project: ProjectListDto | null
  setProject: (project: ProjectListDto) => void
  getProjectContractId: () => number | null
}

const useProjectStore = create<ProjectStore>((set, get) => ({
  project: null,
  setProject: (project) => set({ project }),
  getProjectContractId: () => get()?.project?.clientProjectContractId || null,
}))

export default useProjectStore
