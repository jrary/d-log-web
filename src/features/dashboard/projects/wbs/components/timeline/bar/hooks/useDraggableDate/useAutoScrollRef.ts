import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import { useCallback, useEffect, useRef } from "react"

type AutoScrollRef = {
  isScrolling: boolean
  scrollInterval: number | null
  scrollSpeed: number
  lastMouseX: number | null
  lastContainerRect: DOMRect | null
}

const useAutoScrollRef = () => {
  const autoScrollRef = useRef<AutoScrollRef>({
    isScrolling: false,
    scrollInterval: null,
    scrollSpeed: 0,
    lastMouseX: null,
    lastContainerRect: null,
  })

  // 자동 스크롤 시작 함수
  const startAutoScroll = useCallback(
    (speed: number, mouseX: number, containerRect: DOMRect) => {
      const { containerRef } = useTimelineStore.getState()
      const container = containerRef?.current
      if (!container) return

      // 마우스 위치와 컨테이너 정보 저장
      autoScrollRef.current.lastMouseX = mouseX
      autoScrollRef.current.lastContainerRect = containerRect

      // 이미 스크롤 중이면 속도만 업데이트
      if (autoScrollRef.current.isScrolling) {
        autoScrollRef.current.scrollSpeed = speed
        return
      }

      autoScrollRef.current.isScrolling = true
      autoScrollRef.current.scrollSpeed = speed

      // 스크롤 인터벌 설정
      autoScrollRef.current.scrollInterval = window.setInterval(() => {
        if (!container) return
        container.scrollLeft += autoScrollRef.current.scrollSpeed
      }, 16) // 약 60fps
    },
    [],
  )

  // 자동 스크롤 중지 함수
  const stopAutoScroll = useCallback(() => {
    if (!autoScrollRef.current.isScrolling) return

    if (autoScrollRef.current.scrollInterval !== null) {
      clearInterval(autoScrollRef.current.scrollInterval)
    }

    autoScrollRef.current.isScrolling = false
    autoScrollRef.current.scrollInterval = null
    autoScrollRef.current.scrollSpeed = 0
    autoScrollRef.current.lastMouseX = null
    autoScrollRef.current.lastContainerRect = null
  }, [])

  // 마우스 이동 감지 및 스크롤 속도 업데이트 함수
  const updateScrollSpeed = useCallback(
    (e: MouseEvent) => {
      // 스크롤 중이 아니면 무시
      if (!autoScrollRef.current.isScrolling) return

      const { containerRef } = useTimelineStore.getState()
      const container = containerRef?.current
      if (!container) return

      // 마지막 저장된 컨테이너 정보가 없으면 현재 정보 사용
      const containerRect =
        autoScrollRef.current.lastContainerRect ||
        container.getBoundingClientRect()
      const mouseX = e.clientX

      // 스크롤 영역 경계에서의 거리 계산
      const distanceFromLeft = mouseX - containerRect.left
      const distanceFromRight = containerRect.right - mouseX

      // 경계 근처에서 자동 스크롤 활성화
      const scrollThreshold = 50 // 경계에서 50px 이내
      const maxScrollSpeed = 15 // 최대 스크롤 속도

      // 마우스가 왼쪽 영역 밖으로 나간 경우
      if (distanceFromLeft < 0) {
        // 영역 밖으로 나갈수록 스크롤 속도 증가 (최대 속도 제한)
        const scrollSpeed = -Math.min(
          maxScrollSpeed,
          Math.abs(distanceFromLeft / 10) + 5,
        )
        autoScrollRef.current.scrollSpeed = scrollSpeed
      }
      // 마우스가 오른쪽 영역 밖으로 나간 경우
      else if (distanceFromRight < 0) {
        // 영역 밖으로 나갈수록 스크롤 속도 증가 (최대 속도 제한)
        const scrollSpeed = Math.min(
          maxScrollSpeed,
          Math.abs(distanceFromRight / 10) + 5,
        )
        autoScrollRef.current.scrollSpeed = scrollSpeed
      }
      // 마우스가 왼쪽 경계 근처에 있는 경우
      else if (distanceFromLeft < scrollThreshold && distanceFromLeft > 0) {
        // 왼쪽 경계 근처에서 왼쪽으로 스크롤
        const scrollSpeed = -Math.max(
          1,
          (scrollThreshold - distanceFromLeft) / 5,
        )
        autoScrollRef.current.scrollSpeed = scrollSpeed
      }
      // 마우스가 오른쪽 경계 근처에 있는 경우
      else if (distanceFromRight < scrollThreshold && distanceFromRight > 0) {
        // 오른쪽 경계 근처에서 오른쪽으로 스크롤
        const scrollSpeed = Math.max(
          1,
          (scrollThreshold - distanceFromRight) / 5,
        )
        autoScrollRef.current.scrollSpeed = scrollSpeed
      } else {
        // 경계에서 멀어지면 자동 스크롤 중지
        stopAutoScroll()
      }

      // 마지막 마우스 위치 업데이트
      autoScrollRef.current.lastMouseX = mouseX
    },
    [stopAutoScroll],
  )

  const activeAutoScroll = useCallback(
    (mouseX: number) => {
      const { containerRef } = useTimelineStore.getState()
      // 자동 스크롤 처리
      const container = containerRef?.current
      if (container && !autoScrollRef.current.isScrolling) {
        const containerRect = container.getBoundingClientRect()

        // 스크롤 영역 경계에서의 거리 계산
        const distanceFromLeft = mouseX - containerRect.left
        const distanceFromRight = containerRect.right - mouseX

        // 경계 근처에서 자동 스크롤 활성화
        const scrollThreshold = 50 // 경계에서 50px 이내
        const maxScrollSpeed = 15 // 최대 스크롤 속도

        // 마우스가 왼쪽 영역 밖으로 나간 경우
        if (distanceFromLeft < 0) {
          // 영역 밖으로 나갈수록 스크롤 속도 증가 (최대 속도 제한)
          const scrollSpeed = -Math.min(
            maxScrollSpeed,
            Math.abs(distanceFromLeft / 10) + 5,
          )
          startAutoScroll(scrollSpeed, mouseX, containerRect)
        }
        // 마우스가 오른쪽 영역 밖으로 나간 경우
        else if (distanceFromRight < 0) {
          // 영역 밖으로 나갈수록 스크롤 속도 증가 (최대 속도 제한)
          const scrollSpeed = Math.min(
            maxScrollSpeed,
            Math.abs(distanceFromRight / 10) + 5,
          )
          startAutoScroll(scrollSpeed, mouseX, containerRect)
        }
        // 마우스가 왼쪽 경계 근처에 있는 경우
        else if (distanceFromLeft < scrollThreshold && distanceFromLeft > 0) {
          // 왼쪽 경계 근처에서 왼쪽으로 스크롤
          const scrollSpeed = -Math.max(
            1,
            (scrollThreshold - distanceFromLeft) / 5,
          )
          startAutoScroll(scrollSpeed, mouseX, containerRect)
        }
        // 마우스가 오른쪽 경계 근처에 있는 경우
        else if (distanceFromRight < scrollThreshold && distanceFromRight > 0) {
          // 오른쪽 경계 근처에서 오른쪽으로 스크롤
          const scrollSpeed = Math.max(
            1,
            (scrollThreshold - distanceFromRight) / 5,
          )
          startAutoScroll(scrollSpeed, mouseX, containerRect)
        } else {
          // 경계에서 멀어지면 자동 스크롤 중지
          stopAutoScroll()
        }
      }
    },
    [startAutoScroll, stopAutoScroll],
  )

  // 컴포넌트 언마운트 시 자동 스크롤 정리
  useEffect(() => {
    return () => {
      if (autoScrollRef.current.scrollInterval !== null) {
        clearInterval(autoScrollRef.current.scrollInterval)
      }
    }
  }, [])

  return {
    startAutoScroll,
    stopAutoScroll,
    updateScrollSpeed,
    activeAutoScroll,
  }
}

export default useAutoScrollRef
