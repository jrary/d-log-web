import { Collapse } from "@components/collapse"
import { Skeleton } from "@components/shared-components/skeleton"
import { show } from "@ebay/nice-modal-react"
import { ReportErrorModal } from "@features/dashboard/layouts/dashboard/modals/report-error"
import { useGetProjectListQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectListQueryObject"
import { Suspense } from "@suspensive/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { useLocation, useParams } from "react-router"
import Home from "~icons/local/ic_home"
import Management from "~icons/local/ic_management"
import Report from "~icons/local/ic_report"
import Write from "~icons/local/ic_write"
import * as Styled from "./navigation.styled"
import type { ProjectListDto } from "@apis/model"

export function Navigation() {
  return (
    <Styled.Container>
      <Suspense fallback={<NavigationSkeleton />}>
        <List />
      </Suspense>
    </Styled.Container>
  )
}

function List() {
  const params = useParams()
  const { projectId, clientProjectContractId } = params

  const { data: projects = [] } = useSuspenseQuery(
    useGetProjectListQueryObject(),
  )

  const [openIndexes, setOpenIndexes] = useState(() =>
    projects.map(
      (project) =>
        project.id === Number(projectId) &&
        project.clientProjectContractId === Number(clientProjectContractId),
    ),
  )

  const handleOpenChange = useCallback((idx: number, open: boolean) => {
    setOpenIndexes((prev) => {
      const next = [...prev]
      next[idx] = open
      return next
    })
  }, [])

  return projects?.map((project, index) => (
    <Item
      key={index}
      open={openIndexes[index]}
      onOpenChange={(open) => handleOpenChange(index, open)}
      lastProject={projects.length - 1 === index}
      project={project}
      reportUuid={project.reportUuid}
    />
  ))
}

type ItemProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lastProject?: boolean
  project: ProjectListDto
  reportUuid?: string
}

function Item({
  open,
  onOpenChange,
  lastProject,
  project,
  reportUuid,
}: ItemProps) {
  const location = useLocation()
  const basePath = `/dashboard/projects/${project.id}/contract/${project.clientProjectContractId}/worker/${project.projectWorkerId}`

  const mode =
    import.meta.env.MODE === "production"
      ? ""
      : import.meta.env.MODE === "stage"
        ? "-stage"
        : "-dev"

  const moveToReport = () => {
    if (!reportUuid) {
      show(ReportErrorModal)
      return
    }
    window.open(
      `https://report${mode}.gridge.co.kr/reports/${reportUuid}`,
      "_blank",
    )
  }

  return (
    <Collapse.Root open={open} onOpenChange={onOpenChange}>
      <Collapse.Trigger to={location.pathname} data-root>
        {project.title} 개발팀
      </Collapse.Trigger>
      <Collapse.Content data-last-item={lastProject}>
        {project.isLeadWorker && (
          <Collapse.Link
            to={`${basePath}/milestones`}
            data-active={location.pathname.includes(`${basePath}/milestones`)}>
            <Home />
            프로젝트 관리
          </Collapse.Link>
        )}

        <Collapse.Link
          to={`${basePath}/my-works`}
          data-active={location.pathname.includes(`${basePath}/my-works`)}>
          <Write />내 작업 기록
        </Collapse.Link>

        {project.isLeadWorker && (
          <Collapse.Link
            to={`${basePath}/histories`}
            data-active={location.pathname.includes(`${basePath}/histories`)}>
            <Management />
            작업 내역 관리
          </Collapse.Link>
        )}

        {project.isLeadWorker && (
          <Collapse.Link to="#" onClick={moveToReport}>
            <Report />
            보고서 조회
          </Collapse.Link>
        )}
      </Collapse.Content>
    </Collapse.Root>
  )
}

const NavigationSkeleton = () => {
  return (
    <Styled.NavigationSkeletonBox>
      <Styled.NavigationSkeletonOpenedBox>
        <Skeleton width="100%" height="44px" />
        <Skeleton width="100%" height="44px" />
        <Skeleton width="100%" height="44px" />
        <Skeleton width="100%" height="44px" />
        <Skeleton width="100%" height="44px" />
      </Styled.NavigationSkeletonOpenedBox>
      <Styled.NavigationSkeletonHr />
      <Skeleton width="100%" height="44px" />
      <Skeleton width="100%" height="44px" />
    </Styled.NavigationSkeletonBox>
  )
}
