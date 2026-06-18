import { GetProjectCntByStatusWorkerStatusEnum as State } from "@apis/api"
import { Detail } from "@features/my-page/main/components/recruitment-card/detail"
import Arrow from "~icons/local/ic_arrow_right"
import * as Styled from "./styled"
import type { ProjectListDto } from "@apis/model"

const TEXT = {
  status: (state: State) => {
    switch (state) {
      case State.Wait:
        return `👋🏻 프로젝트가 곧 시작될 예정이에요!`
      case State.InProgress:
        return `👩‍💻 프로젝트 진행 중입니다.\n작업 내용을 보고싶다면 작업하러 가기를 클릭해 보세요!`
      case State.Complete:
        return `🏆 완료된 프로젝트입니다.\n앞으로 더 많은 프로젝트로 만나요!`
      default:
        return ""
    }
  },
  mobileStatus: (state: State) => {
    switch (state) {
      case State.Wait:
        return `👋🏻 프로젝트가 곧 시작될 예정이에요!`
      case State.InProgress:
        return `👩‍💻 프로젝트 진행 중입니다. 작업 내용을 보고싶다면 작업하러 가기를 클릭해 보세요!`
      case State.Complete:
        return `🏆 완료된 프로젝트입니다. 앞으로 더 많은 프로젝트로 만나요!`
      default:
        return ""
    }
  },
  dashboard: `작업하러 가기`,
}

type Props = {
  project: ProjectListDto
}

export function RecruitmentCard({ project }: Props) {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Title>{project.title}</Styled.Title>
        <Styled.Status>{TEXT.status(project.workerStatus)}</Styled.Status>
      </Styled.Content>

      {/* Progress bar가 포함돼 있는 박스 */}
      <Detail
        state={project.workerStatus}
        startDate={project?.expectedStartDate}
        endDate={project?.expectedEndDate}
      />

      <Styled.LinkContainer
        to={`/dashboard/projects/${project.id}/contract/${project.clientProjectContractId}/worker/${project.projectWorkerId}/my-works`}
        isActive={project.workerStatus == State.InProgress}>
        <Styled.DashboardText>{TEXT.dashboard}</Styled.DashboardText>
        <Arrow />
      </Styled.LinkContainer>
    </Styled.Container>
  )
}
