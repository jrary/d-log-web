import { useLocation, useNavigate } from "react-router"
import ChevronDown from "~icons/local/ic_chevron_down"
import ChevronUp from "~icons/local/ic_chevron_up"
import * as Styled from "./styled"
import type {
  ProjectMilestoneTaskListDto,
  ProjectMilestoneTaskListDtoTaskStatusEnum,
} from "@apis/model"

const TEXT = {
  lastUpdate: (lastUpdate: string) => `${lastUpdate} 마지막 업데이트`,
  emptyLastUpdate: `마지막 업데이트 내역 없음`,
  expectDate: {
    label: `예상 작업기간`,
    data: (start: string, end: string) => {
      if (start === "" && end === "") return `-`
      else if (start === "" || end === "") return `${start}${end}`
      else return `${start} ~ ${end}`
    },
  },
  finalDate: `최종 마감일`,
  manager: `담당자`,
  progressPercent: (percent: number) => `${percent}% 완료`,
  state: {
    wait: `컨펌 대기중`,
    modify: `수정중`,
    confirm: `컨펌 완료`,
  },
}

export type TaskItemProps = {
  item: ProjectMilestoneTaskListDto
  isOpened: boolean
  toggleSheet: (idx: number) => void
}

export default function TaskItem({
  item,
  isOpened,
  toggleSheet,
}: TaskItemProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const lastPath = location.pathname.split("/").pop()
  // 사이드메뉴가 열려있는 상태 (true이면 아이템의 일부 데이터들을 보여주지 않음)
  const isSideMenuOpen = lastPath !== "tasks"
  // 현재 아이템이 선택되어 있는 상태
  const isActive = lastPath === String(item.id)

  const toggleDetailPage = () => {
    if (isActive) {
      const closePath = location.pathname.split("/").slice(0, -1).join("/")
      navigate(closePath)
    } else {
      navigate(`${item.id}`)
    }
  }

  // 컨펌 대기 중이면 해당 텍스트, 진행 중이거나 수정 중이라면 퍼센트
  const getProgress = (
    state: ProjectMilestoneTaskListDtoTaskStatusEnum,
    percent: number,
  ) => {
    if (state === "NOT_STARTED") return TEXT.state.wait
    // else if (state === "EDITING") return TEXT.state.modify
    else if (state === "DONE") return TEXT.state.confirm
    else return TEXT.progressPercent(percent)
  }

  // 날짜 데이터 보여주는 형식 변경하기
  // input: 2000-00-00T00:00
  // output: 2000.00.00
  function formatDate(date: string) {
    const dateObject = new Date(date)
    if (String(dateObject) === "Invalid Date") return date
    return `${dateObject.getFullYear()}.${String(dateObject.getMonth() + 1).padStart(2, "0")}.${String(dateObject.getDate()).padStart(2, "0")}`
  }

  return (
    <Styled.Container onClick={toggleDetailPage} isActive={isActive}>
      <Styled.Item flexRatio={1.7} isSideMenuOpen={false}>
        <Styled.Title isActive={isActive}>{item.taskName}</Styled.Title>
        <Styled.Content isActive={isActive}>
          {item.lastUpdateDate
            ? TEXT.lastUpdate(formatDate(item.lastUpdateDate))
            : TEXT.emptyLastUpdate}
        </Styled.Content>
      </Styled.Item>

      <Styled.Item flexRatio={1} isSideMenuOpen={isSideMenuOpen}>
        <Styled.Title isActive={isActive}>{TEXT.expectDate.label}</Styled.Title>
        <Styled.Content isActive={isActive}>
          {TEXT.expectDate.data(
            formatDate(item.expectedStartDate || ""),
            formatDate(item.expectedEndDate || ""),
          )}
        </Styled.Content>
      </Styled.Item>

      <Styled.Item flexRatio={0.8} isSideMenuOpen={isSideMenuOpen}>
        <Styled.Title isActive={isActive}>{TEXT.finalDate}</Styled.Title>
        <Styled.Content isActive={isActive}>
          {formatDate(item.finalEndDate || "-")}
        </Styled.Content>
      </Styled.Item>

      <Styled.Item flexRatio={0.8} isSideMenuOpen={isSideMenuOpen}>
        <Styled.Title isActive={isActive}>{TEXT.manager}</Styled.Title>
        <Styled.Content isActive={isActive}>
          {item.projectWorkerList?.join(", ") || "-"}
        </Styled.Content>
      </Styled.Item>

      <Styled.Item align="center" flexRatio={1.2} isSideMenuOpen={false}>
        <Styled.Content isActive={isActive}>
          {getProgress(
            item.taskStatus || "IN_PROGRESS",
            item.progressPercent || 0,
          )}
        </Styled.Content>
        <Styled.ProgressBar>
          <Styled.ProgressFill progress={item.progressPercent || 0} />
        </Styled.ProgressBar>
      </Styled.Item>

      <Styled.Item
        align="center"
        flexRatio={0.2}
        isSideMenuOpen={false}
        onClick={(e) => {
          e.stopPropagation()
          toggleSheet(item.id)
        }}>
        <Styled.ShowButton isActive={isActive}>
          {isOpened ? <ChevronUp /> : <ChevronDown />}
        </Styled.ShowButton>
      </Styled.Item>
    </Styled.Container>
  )
}
