import { HighlightText } from "@components/highlight-text"
import type { ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum } from "@apis/model"

const TEXT = {
  format: (
    status: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum | undefined,
    count: number | undefined = 0,
    firstApplicant: string | undefined = "G-워커",
  ) => {
    switch (status) {
      case "IN_PROGRESS": {
        switch (count) {
          case 0:
            return "이 프로젝트의 첫 워커가\n되어주세요!"
          case 1:
            return `${firstApplicant}님이 참여중입니다!`
          default:
            return `${firstApplicant}님 외 ${count - 1}명이 참여중입니다!`
        }
      }
      default:
        return "G-워커가 열심히 작업중이에요!"
    }
  },
}

type ApplyProps = {
  status: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum | undefined
  count: number | undefined
  firstApplicant: string | undefined
}

export function Apply({ status, count, firstApplicant }: ApplyProps) {
  return (
    <HighlightText
      highlightRegex={
        /(이 프로젝트의 첫 워커가\n되어주세요!|(?:\d명이 )?참여중입니다!|열심히 작업중이에요!)/gi
      }>
      {TEXT.format(status, count, firstApplicant)}
    </HighlightText>
  )
}
