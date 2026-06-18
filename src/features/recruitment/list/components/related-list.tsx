import { HighlightText } from "@components/highlight-text"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { ProjectItem } from "@features/recruitment/list/components/project-item"
import { useGetRelatedRecruitmentInfiniteQueryObject } from "@features/recruitment/list/queries/useGetRelatedRecruitmentInfiniteQueryObject"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import * as Styled from "./project-list.styled"

const TEXT = {
  icon: "🤫",
  title: (job = "워커") => `${job}인 당신에게 딱 맞는 프로젝트를 보여드립니다!`,
}

export function RelatedList() {
  const { data: user } = useQuery(useGetUserInfoQueryObject())
  const {
    data: recruitment = [],
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(useGetRelatedRecruitmentInfiniteQueryObject())

  const observerRef = useRef(null)

  useEffect(() => {
    if (!observerRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 },
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const highlightRegex = new RegExp(
    `(${user?.jobCategory.alias}|딱 맞는 프로젝트)`,
  )

  return (
    <Styled.Container>
      <HStack>
        <Styled.Title>{TEXT.icon}</Styled.Title>
        <Styled.Title keepAll>
          <HighlightText highlightRegex={highlightRegex}>
            {TEXT.title(user?.jobCategory.alias)}
          </HighlightText>
        </Styled.Title>
      </HStack>
      <Styled.List>
        {recruitment.map((item) => (
          <ProjectItem key={item.id} item={item} />
        ))}
        {recruitment.length < 1 && (
          <Text typo="body1" color="SECONDARY">
            아직 준비된 프로젝트가 없습니다.
          </Text>
        )}
      </Styled.List>
      <div ref={observerRef} style={{ height: "1rem" }} />
    </Styled.Container>
  )
}
