import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import { throttle } from "es-toolkit"
import { useCallback, useEffect, useRef, useState } from "react"
import type { RefObject } from "react"

type UseStickyContentReturn = {
  isSticky: boolean
  containerRef: RefObject<HTMLDivElement>
  contentWrapperRef: RefObject<HTMLDivElement>
}

/**
 * 타임라인 컴포넌트 내에서 콘텐츠가 왼쪽 경계를 벗어날 때 Sticky 효과를 처리하는 훅
 */
export default function useStickyContent(): UseStickyContentReturn {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const timelineContainerRef = useTimelineStore((state) => state.containerRef)

  const [isSticky, setIsSticky] = useState(false)

  // 컨텐츠 위치 업데이트 함수
  const updateContentPosition = useCallback(() => {
    if (
      !containerRef.current ||
      !contentWrapperRef.current ||
      !timelineContainerRef?.current
    )
      return

    const containerRect = containerRef.current.getBoundingClientRect()
    const contentRect = contentWrapperRef.current.getBoundingClientRect()

    const stickyThreshold =
      timelineContainerRef.current.getBoundingClientRect().x

    if (containerRect.x < stickyThreshold) {
      // 컨텐츠가 완전히 컨테이너를 넘어가지 않도록 체크
      const maxOffset = containerRect.width - contentRect.width - 10
      const offset = Math.min(stickyThreshold - containerRect.x, maxOffset)
      contentWrapperRef.current.style.transform = `translateX(${offset}px)`
      setIsSticky(true)
    } else {
      contentWrapperRef.current.style.transform = "translateX(0)"
      setIsSticky(false)
    }
  }, [setIsSticky, timelineContainerRef])

  // 스크롤 및 리사이즈 이벤트에 대응
  useEffect(() => {
    if (!timelineContainerRef || !timelineContainerRef.current) return
    const timelineContainer = timelineContainerRef.current

    const handleScroll = throttle(() => {
      requestAnimationFrame(updateContentPosition)
    }, 100)

    // 스크롤 이벤트 리스너 등록
    timelineContainer.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    // 초기 위치 설정
    updateContentPosition()

    // 클린업 함수
    return () => {
      timelineContainer.removeEventListener("scroll", handleScroll)
    }
  }, [updateContentPosition, timelineContainerRef])

  return {
    isSticky,
    containerRef,
    contentWrapperRef,
  }
}
