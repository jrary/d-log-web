import { Text } from "@components/shared-components/text"
import { ProjectItem } from "@features/recruitment/list/components/project-item"
import { useGetSuggestedRecruitmentInfiniteQueryObject } from "@features/recruitment/list/queries/useGetSuggestedRecruitmentInfiniteQueryObject"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import * as Styled from "./project-list.styled"

const TEXT = {
  icon: "🤗",
  title: "추천 프로젝트 순으로 알려드려요!",
}

export function SuggestedList() {
  const {
    data: recruitment = [],
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(useGetSuggestedRecruitmentInfiniteQueryObject())

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

  return (
    <Styled.Container>
      <Styled.Title icon={TEXT.icon}>{TEXT.title}</Styled.Title>
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
