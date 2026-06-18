import { IconButton } from "@features/dashboard/projects/wbs/components/shared/index.styled"
import { useState } from "react"
import Minus from "~icons/local/ic_minus.svg"
import Plus from "~icons/local/ic_plus.svg"
import {
  ProjectItemHeader,
  ProjectItemTitle,
  ProjectItemWrapper,
  ProjectMenuItem,
  ProjectMenuWrapper,
} from "./index.styled"
import type { ProjectListDto } from "@apis/model"

type ProjectItemProps = {
  project: ProjectListDto
  isActive: boolean
}

export default function ProjectItem({ project, isActive }: ProjectItemProps) {
  const [isOpen, setIsOpen] = useState(isActive)
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(
    "projectManagement",
  )

  const handleClick = () => {
    if (isActive && isOpen) return
    setIsOpen(!isOpen)
  }

  const handleMenuClick = (menuName: string) => {
    setActiveMenuItem(menuName)
  }

  return (
    <ProjectItemWrapper>
      <ProjectItemHeader>
        <ProjectItemTitle isActive={isActive}>{project.title}</ProjectItemTitle>
        <IconButton onClick={handleClick}>
          {isOpen ? <Minus /> : <Plus />}
        </IconButton>
      </ProjectItemHeader>
      <ProjectMenuWrapper isOpen={isOpen || isActive}>
        <ProjectMenuItem
          to={`/projects/${project.clientProjectContractId}/${project.projectWorkerId}/wbs`}
          className={
            isActive && activeMenuItem === "projectManagement" ? "active" : ""
          }
          onClick={() => handleMenuClick("projectManagement")}>
          프로젝트 관리
        </ProjectMenuItem>
        <ProjectMenuItem
          to={`/projects/${project.clientProjectContractId}/${project.projectWorkerId}/my-tasks`}
          className={isActive && activeMenuItem === "myTasks" ? "active" : ""}
          onClick={() => handleMenuClick("myTasks")}>
          내 작업 기록
        </ProjectMenuItem>
        <ProjectMenuItem
          to={`/projects/${project.clientProjectContractId}/${project.projectWorkerId}/task-management`}
          className={
            isActive && activeMenuItem === "taskManagement" ? "active" : ""
          }
          onClick={() => handleMenuClick("taskManagement")}>
          작업 내역 관리
        </ProjectMenuItem>
        <ProjectMenuItem
          to={`/projects/${project.clientProjectContractId}/${project.projectWorkerId}/reports`}
          className={isActive && activeMenuItem === "reports" ? "active" : ""}
          onClick={() => handleMenuClick("reports")}>
          보고서 조회
        </ProjectMenuItem>
      </ProjectMenuWrapper>
    </ProjectItemWrapper>
  )
}
