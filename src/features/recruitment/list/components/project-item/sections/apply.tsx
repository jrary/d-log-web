import { show } from "@ebay/nice-modal-react"
import { Apply as ApplyText } from "@features/recruitment/components/apply"
import { NeedAuthModal } from "@features/recruitment/list/modals/need-auth-modal"
import { useAuthStateQueryObject } from "@queries/useAuthStateQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import * as Styled from "./apply.styled"
import type { ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum } from "@apis/model"

const TEXT = {
  button: (status: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum) => {
    switch (status) {
      case "COMPLETED":
        return "모집마감"
      default:
        return `지원하기`
    }
  },
}

type ApplyProps = {
  recruitmentId: number
  status: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum
  count: number
  firstApplicant: string | undefined
}

export function Apply({
  recruitmentId,
  status,
  count,
  firstApplicant = "G-워커",
}: ApplyProps) {
  const { data: isLogin } = useSuspenseQuery(useAuthStateQueryObject())

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.ProfilePic />
        <Styled.AppliedMember>
          <ApplyText
            status={status}
            count={count}
            firstApplicant={firstApplicant}
          />
        </Styled.AppliedMember>
      </Styled.Content>
      {isLogin ? (
        <Styled.DetailLink
          data-status={status}
          to={`/recruitment/${recruitmentId}`}>
          {TEXT.button(status)}
        </Styled.DetailLink>
      ) : (
        <Styled.Button
          data-status={status}
          onClick={() => {
            show(NeedAuthModal)
          }}>
          {TEXT.button(status)}
        </Styled.Button>
      )}
    </Styled.Container>
  )
}
