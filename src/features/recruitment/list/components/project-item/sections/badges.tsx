import { Badge } from "@components/badge.styled"
import * as Styled from "./badges.styled"
import type { ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum } from "@apis/model"

const TEXT = {
  status: (
    recruitmentStatus: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum,
  ) => {
    switch (recruitmentStatus) {
      case "IN_PROGRESS":
        return `모집중`
      case "COMPLETED":
        return `모집완료`
    }
  },
}

type BadgesProps = {
  status: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum
  job: string | undefined
}

export function Badges({ status, job = "" }: BadgesProps) {
  const statusBadgeColor = status === "COMPLETED" ? "disabled" : "primary"

  return (
    <Styled.Container>
      <Badge colorVariant={statusBadgeColor}>{TEXT.status(status)}</Badge>
      {status !== "COMPLETED" && <Badge styleVariant="outline">{job}</Badge>}
    </Styled.Container>
  )
}
