import { HStack, VStack } from "@components/shared-components/stack"
import { InterestProjectList } from "@features/my-page/interest/components/interest-project-list"
import { useGetMyInterestProjectCountQueryObject } from "@features/my-page/interest/queries/useGetMyInterestProjectCountQueryObject"
import { useQuery } from "@tanstack/react-query"
import * as Styled from "./interest-project-page.styled"

const TEXT = {
  title: "관심 프로젝트",
  description: "내가 좋아요를 누른 프로젝트를 모아서 볼 수 있어요!",
  like: {
    icon: "😍",
    title: "관심 프로젝트",
    count: (like: number) => `${like}건`,
  },
}

export default function InterestProject() {
  const { data: count = 0 } = useQuery(
    useGetMyInterestProjectCountQueryObject(),
  )

  return (
    <Styled.Container>
      <VStack>
        <Styled.Title>{TEXT.title}</Styled.Title>
        <Styled.Description>{TEXT.description}</Styled.Description>
      </VStack>

      <HStack spacing="0.5rem" align="center">
        <Styled.Icon>{TEXT.like.icon}</Styled.Icon>

        <HStack spacing="0.25rem">
          <Styled.LikeTitle>{TEXT.like.title}</Styled.LikeTitle>
          <Styled.LikeCount>{TEXT.like.count(count)}</Styled.LikeCount>
        </HStack>
      </HStack>

      <InterestProjectList />
    </Styled.Container>
  )
}
