import { Empty } from "@features/my-page/main/components/empty"
import { RecruitmentCard } from "@features/my-page/main/components/recruitment-card"
import { useGetMyProjectsByStatusInfiniteQueryObject } from "@features/my-page/main/queries/useGetMyProjectsByStatusInfiniteQueryObject"
import { useInfiniteQuery } from "@tanstack/react-query"
import * as Styled from "./recruitment-list.styled"
import type { GetProjectCntByStatusWorkerStatusEnum } from "@apis/api"

type Props = {
  title: string
  state: GetProjectCntByStatusWorkerStatusEnum
}

export function RecruitmentList({ title, state }: Props) {
  const { data = [] } = useInfiniteQuery(
    useGetMyProjectsByStatusInfiniteQueryObject(state),
  )

  if (data.length === 0) {
    return <Empty />
  }

  return (
    <>
      <Styled.Title>{title}</Styled.Title>
      {data.map((project) => (
        <RecruitmentCard key={project.id} project={project} />
      ))}
    </>
  )
}
