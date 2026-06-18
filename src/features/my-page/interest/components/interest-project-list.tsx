import { VStack } from "@components/shared-components/stack"
import { Empty } from "@features/my-page/interest/components/empty"
import { useGetMyInterestProjectsInfiniteQueryObject } from "@features/my-page/interest/queries/useGetMyInterestProjectsInfiniteQueryObject"
import { ProjectItem } from "@features/recruitment/list/components/project-item"
import { useInfiniteQuery } from "@tanstack/react-query"

export function InterestProjectList() {
  const { data = [] } = useInfiniteQuery(
    useGetMyInterestProjectsInfiniteQueryObject(),
  )

  if (data.length === 0) {
    return <Empty />
  }

  return (
    <VStack spacing="inherit">
      {data.map((item) => (
        <ProjectItem key={item.id} item={item} />
      ))}
    </VStack>
  )
}
