import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { useGetDashboardProjectsQueryObject } from "@features/dashboard/queries/useGetDashboardProjectsQueryObject"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetProject = (contractId: number, projectWorkerId: number) => {
  const { data: projects, isLoading: isProjectsLoading } = useQuery(
    useGetDashboardProjectsQueryObject(),
  )

  const currentProject =
    projects?.find(
      (p) =>
        p.clientProjectContractId === contractId &&
        p.projectWorkerId === projectWorkerId,
    ) || null
  const setProject = useProjectStore((state) => state.setProject)

  useEffect(() => {
    if (currentProject) {
      setProject(currentProject)
    }
  }, [currentProject, setProject])

  return {
    currentProject,
    isLoading: isProjectsLoading,
    isError: !isProjectsLoading && !currentProject,
  }
}
