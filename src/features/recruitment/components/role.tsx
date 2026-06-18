import * as Styled from "./role.styled"
import type { ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum } from "@apis/model"
import type { ComponentProps } from "react"

const TEXT = {
  role: (
    recruitmentStatus: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum,
    roleName?: string,
  ) => {
    switch (recruitmentStatus) {
      case "COMPLETED":
        return `🥺 아쉽게도 프로젝트가 마감되었어요.\n 다른 프로젝트로 꼭 만나요!`
      default:
        return `👋🏻 이 프로젝트는 ${roleName}가 꼭 필요한 프로젝트예요!`
    }
  },
}

type RoleProps = {
  status: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum
  role: string | undefined
}

export function Role({
  status,
  role,
  ...props
}: RoleProps & ComponentProps<typeof Styled.Container>) {
  return (
    <Styled.Container data-complete={status === "COMPLETED"} {...props}>
      {TEXT.role(status, role)}
    </Styled.Container>
  )
}
