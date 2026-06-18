import { Skeleton } from "@components/shared-components/skeleton"
import { HeaderContainer, SubText, Title } from "./index.styled"
import type { ProjectListDto } from "@apis/model"

export default function Header({
  project,
}: {
  project: ProjectListDto | null
}) {
  if (project === null)
    throw new Promise((resolve) => {
      setTimeout(resolve, 0)
    })

  const title = project?.title ? `${project.title} 프로젝트 관리` : ""
  const description = project
    ? "마일스톤을 설정하거나 수정하고 각 마일스톤 별로 진행하실 일정 작업 내용을 관리할 수 있습니다."
    : ""

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <SubText>{description}</SubText>
    </HeaderContainer>
  )
}

export function HeaderSkeleton() {
  return (
    <HeaderContainer gap={10}>
      <Skeleton width="332px" height="34px" />
      <Skeleton width="508px" height="22px" />
    </HeaderContainer>
  )
}
