import { GetProjectsWorkerStatusEnum as Status } from "@apis/api"
import { client } from "@apis/client"
import { head } from "es-toolkit"
import { redirect } from "react-router"

async function _redirectFirstProject() {
  const { data } = await client.Project.getProjects(Status.InProgress, 0, 1)

  const project = head(data.result?.projectList.contents ?? [])
  if (!project) {
    return redirect("/404")
  }

  return redirect(
    `/dashboard/projects/${project.id}/contract/${project.clientProjectContractId}/worker/${project.projectWorkerId}/my-works`,
  )
}

export const redirectFirstProject = {
  index: true,
  loader: _redirectFirstProject,
}
