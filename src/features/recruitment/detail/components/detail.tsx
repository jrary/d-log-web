import { Button } from "@components/button.styled"
import { Text } from "@components/shared-components/text"
import { Apply } from "@features/recruitment/components/apply"
import { useGetRecruitmentDetailQueryObject } from "@features/recruitment/detail/queries/useGetRecruitmentDetailQueryObject"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useQueries } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useParams } from "react-router"
import * as Styled from "./detail.styled"

type Props = {
  onApply: () => void
}

const TEXT = {
  comment: {
    summary: "그릿지 한마디",
    special: "이런걸 경험할 수 있어요!",
  },
  apply: "지원하기",
  applied: "지원완료",
  invalid: "지원 가능 직무가 아닙니다",
}

export function Detail({ onApply }: Props) {
  const { recruitmentId = "0" } = useParams()
  const [{ data: information }, { data: userInfo }] = useQueries({
    queries: [
      useGetRecruitmentDetailQueryObject(toNumber(recruitmentId)),
      useGetUserInfoQueryObject(),
    ],
  })

  const hasMatchingCategory = userInfo?.jobCategory.jobCategoryList?.some(
    (category) => category.name == information?.role.jobCategoryName,
  )

  const buttonText = information?.isApplied
    ? TEXT.applied
    : hasMatchingCategory
      ? TEXT.apply
      : TEXT.invalid

  const isButtonDisabled =
    information?.isApplied ||
    !hasMatchingCategory ||
    information?.recruitmentStatus !== "IN_PROGRESS"

  return (
    <Styled.Container>
      <Styled.Members>
        <Styled.ProfileImage />
        <Styled.AppliedMember>
          <Apply
            status={information?.recruitmentStatus}
            count={information?.applyCnt}
            firstApplicant={information?.firstApplicant}
          />
        </Styled.AppliedMember>
      </Styled.Members>

      <Styled.Comment>
        <Text as="dt">{TEXT.comment.summary}</Text>
        <Text as="dd" typo="body1" whiteSpace="pre-wrap">
          {information?.projectSummary}
        </Text>
      </Styled.Comment>

      {information?.projectRequirement && (
        <Styled.Comment>
          <Text as="dt">{TEXT.comment.special}</Text>
          <Text as="dd" typo="body1" whiteSpace="pre-wrap">
            {information?.projectRequirement}
          </Text>
        </Styled.Comment>
      )}

      <Button
        onClick={onApply}
        disabled={isButtonDisabled}
        boldText
        fullWidth
        size="2xl">
        {buttonText}
      </Button>
    </Styled.Container>
  )
}
