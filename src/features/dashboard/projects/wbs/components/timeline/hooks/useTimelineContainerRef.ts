import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import { useEffect, useRef } from "react"

export default function useTimelineContainerRef() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setContainerRef } = useTimelineStore()

  useEffect(() => {
    setContainerRef(containerRef)
  }, [setContainerRef])

  /**
   * 각 값을 저장하는 이유
   * left: 컨테이너의 왼쪽 위치
   * scrollX: 현재 스크롤 위치에서 가상 그리드를 작성하기 위해
   */
  useEffect(() => {
    if (!containerRef || !containerRef.current) return

    useTimelineStore.setState({
      containerInfo: {
        left: 0,
        scrollX: containerRef.current.scrollLeft,
      },
    })
  }, [containerRef])

  return containerRef
}
