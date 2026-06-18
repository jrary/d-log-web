import { GetProjectCntByStatusWorkerStatusEnum as State } from "@apis/api"
import { useMemo } from "react"
import * as Styled from "./detail.styled"

const TEXT = {
  expectedDate: (startDate: string, endDate: string) =>
    `예상 작업 일정: ${startDate} ~ ${endDate}`,
  progress: {
    start: {
      label: `매칭 완료`,
      date: (date: string) => `${date} 완료`,
    },
    progress: {
      label: `프로젝트 시작`,
      date: (date: string) => `${date} 시작`,
    },
    end: {
      label: `마감`,
      date: (date: string) => `${date} 마감`,
    },
  },
}

type Props = {
  state: State
  startDate: string | undefined
  endDate: string | undefined
}

export function Detail({
  state,
  startDate = "Invalid Date",
  endDate = "Invalid Date",
}: Props) {
  const progress = useMemo(() => {
    switch (state) {
      case State.InProgress:
        return 50
      case State.Complete:
        return 100
      case State.Wait:
      default:
        return 0
    }
  }, [state])

  return (
    <Styled.Container>
      <Styled.ExpectedDate>
        {TEXT.expectedDate(startDate, endDate)}
      </Styled.ExpectedDate>

      <Styled.Content>
        <Styled.ProgressBar>
          <Styled.ProgressFill progress={progress} />
          <Styled.ProgressIndicator progress={progress} />
        </Styled.ProgressBar>

        <Styled.Labels>
          <Styled.ProgressLabel>
            <Styled.Label>{TEXT.progress.start.label}</Styled.Label>
            <Styled.Date>{TEXT.progress.start.date(startDate)}</Styled.Date>
          </Styled.ProgressLabel>

          <Styled.ProgressLabel>
            <Styled.Label>{TEXT.progress.progress.label}</Styled.Label>
            <Styled.Date>{TEXT.progress.progress.date(startDate)}</Styled.Date>
          </Styled.ProgressLabel>

          <Styled.ProgressLabel>
            <Styled.Label>{TEXT.progress.end.label}</Styled.Label>
            <Styled.Date>{TEXT.progress.end.date(endDate)}</Styled.Date>
          </Styled.ProgressLabel>
        </Styled.Labels>
      </Styled.Content>
    </Styled.Container>
  )
}
