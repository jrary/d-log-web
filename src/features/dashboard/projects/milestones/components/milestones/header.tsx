import { useGetProjectListQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectListQueryObject"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import * as Styled from "./header.styled"

export function Header() {
  const { projectId } = useParams<{ projectId: string }>()

  const { data: projectList = [] } = useQuery(useGetProjectListQueryObject())

  const projectInfo = projectList.find(
    (project) => String(project.id) === projectId,
  )

  return (
    <Styled.Container>
      <Styled.Title>{`[${projectInfo?.title}] 프로젝트 관리`}</Styled.Title>
      <Styled.Description>
        마일스톤을 생성하거나 수정하고 각 마일스톤 별로 진행해야 할 세부 작업
        내용을 관리할 수 있습니다.
      </Styled.Description>
    </Styled.Container>
  )
}
