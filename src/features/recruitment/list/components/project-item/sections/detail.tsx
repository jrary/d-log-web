import * as Styled from "./detail.styled"
import type { ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum } from "@apis/model"

const TEXT = {
  wage: {
    label: "예상수입",
    formatWage: (wage: number) => `${wage.toLocaleString()}원`,
  },
  closing: {
    label: "모집마감",
    leftApply: (count: number) => `${count}명 남음`,
  },
}

type InformationProps = {
  wage: number | undefined
  count: number
  status: ProjectWorkerRecruitmentListDtoRecruitmentStatusEnum
}

export function Detail({ status, count, wage = 0 }: InformationProps) {
  return (
    <Styled.Container>
      <Styled.Contents>
        <Styled.Item>
          <Styled.Label>{TEXT.wage.label}</Styled.Label>
          <Styled.Wage>{TEXT.wage.formatWage(wage)}</Styled.Wage>
        </Styled.Item>

        <Styled.Item>
          <Styled.Label>{TEXT.closing.label}</Styled.Label>
          <Styled.Apply data-complete={status === "COMPLETED"}>
            {TEXT.closing.leftApply(count)}
          </Styled.Apply>
        </Styled.Item>
      </Styled.Contents>
    </Styled.Container>
  )
}
