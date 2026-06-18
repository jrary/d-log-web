import { GetProjectCntByStatusWorkerStatusEnum as Status } from "@apis/api"
import { RecruitmentList } from "@features/my-page/main/components/recruitment-list"
import { useGetMyProjectsCountByStatusQueryObject } from "@features/my-page/main/queries/useGetMyProjectsCountByStatusQueryObject"
import { useQueries } from "@tanstack/react-query"
import { defaultTo } from "es-toolkit/compat"
import { useSearchParams } from "react-router"
import * as Styled from "./my-page.styled"

const TEXT = {
  title: "외주 프로젝트 관리",
  description:
    "대기중부터 마감단계까지 프로젝트 현황들을 한 눈에 보실 수 있어요!",
  total: {
    label: "전체",
    count: (count: number) => `${count}건`,
  },
  state: {
    [Status.Wait]: {
      icon: "🤝",
      label: "대기 프로젝트",
      count: (count: number) => `${count}건`,
      title: "대기중인 외주 프로젝트예요!",
    },
    [Status.InProgress]: {
      icon: "🔥",
      label: "진행 프로젝트",
      count: (count: number) => `${count}건`,
      title: "진행중인 외주 프로젝트예요!",
    },
    [Status.Complete]: {
      icon: "🙌",
      label: "마감 프로젝트",
      count: (count: number) => `${count}건`,
      title: "마감된 외주 프로젝트예요!",
    },
    [Status.Termination]: {
      title: "",
    },
  },
}

export default function Main() {
  const [searchParams, setSearchParams] = useSearchParams({
    tab: "WAIT",
  })

  const [{ data: wait = 0 }, { data: inProgress = 0 }, { data: complete = 0 }] =
    useQueries({
      queries: [
        useGetMyProjectsCountByStatusQueryObject(Status.Wait),
        useGetMyProjectsCountByStatusQueryObject(Status.InProgress),
        useGetMyProjectsCountByStatusQueryObject(Status.Complete),
      ],
    })

  const currentTab = defaultTo(searchParams.get("tab") as Status, Status.Wait)
  const setCurrentTab = (tab: Status) => () => {
    setSearchParams({
      tab,
    })
  }

  return (
    <Styled.Container>
      <Styled.TitleContainer>
        <Styled.Title>{TEXT.title}</Styled.Title>
        <Styled.Description>{TEXT.description}</Styled.Description>
      </Styled.TitleContainer>

      <Styled.Progress>
        <Styled.Total>
          <Styled.Label>{TEXT.total.label}</Styled.Label>
          <Styled.TotalCount>
            {TEXT.total.count(wait + inProgress + complete)}
          </Styled.TotalCount>
        </Styled.Total>

        <Styled.Line />

        <Styled.StateContainer>
          <Styled.State onClick={setCurrentTab(Status.Wait)}>
            <Styled.Icon>{TEXT.state.WAIT.icon}</Styled.Icon>
            <Styled.Data>
              <Styled.Label>{TEXT.state.WAIT.label}</Styled.Label>
              <Styled.Count data-active={currentTab === Status.Wait}>
                {TEXT.state.WAIT.count(wait)}
              </Styled.Count>
            </Styled.Data>
          </Styled.State>

          <Styled.State onClick={setCurrentTab(Status.InProgress)}>
            <Styled.Icon>{TEXT.state.IN_PROGRESS.icon}</Styled.Icon>
            <Styled.Data>
              <Styled.Label>{TEXT.state.IN_PROGRESS.label}</Styled.Label>
              <Styled.Count data-active={currentTab === Status.InProgress}>
                {TEXT.state.IN_PROGRESS.count(inProgress)}
              </Styled.Count>
            </Styled.Data>
          </Styled.State>

          <Styled.State onClick={setCurrentTab(Status.Complete)}>
            <Styled.Icon>{TEXT.state.COMPLETE.icon}</Styled.Icon>
            <Styled.Data>
              <Styled.Label>{TEXT.state.COMPLETE.label}</Styled.Label>
              <Styled.Count data-active={currentTab === Status.Complete}>
                {TEXT.state.COMPLETE.count(complete)}
              </Styled.Count>
            </Styled.Data>
          </Styled.State>
        </Styled.StateContainer>
      </Styled.Progress>

      <RecruitmentList
        state={currentTab}
        title={TEXT.state[currentTab].title}
      />
    </Styled.Container>
  )
}
