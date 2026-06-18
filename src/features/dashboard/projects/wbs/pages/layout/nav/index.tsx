import ProjectItem from "@features/dashboard/projects/wbs/pages/layout/nav/project-item"
import { useGetDashboardProjectsQueryObject } from "@features/dashboard/queries/useGetDashboardProjectsQueryObject"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { NavContainer } from "./index.styled"

export default function Nav() {
  const { data: projects } = useQuery(useGetDashboardProjectsQueryObject())
  const { contract_id, project_worker_id } = useParams<{
    contract_id: string
    project_worker_id: string
  }>()

  if (!projects) return null

  return (
    <NavContainer>
      {projects.map((project) => (
        <ProjectItem
          key={`${project.clientProjectContractId}-${project.projectWorkerId}`}
          project={project}
          isActive={
            project.clientProjectContractId === Number(contract_id) &&
            project.projectWorkerId === Number(project_worker_id)
          }
        />
      ))}
    </NavContainer>
  )
}
