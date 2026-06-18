import { useEffect, useRef, useState } from "react"

/**
 * useSimpleResizeObserver 훅
 *
 * 컨테이너와 컨텐츠 요소의 넓이를 감시하며 필요한 ref 객체를 생성합니다.
 * 컨텐츠가 컨테이너보다 크면 컨테이너의 넓이를 반환하고, 그렇지 않으면 null을 반환합니다.
 */
export function useSimpleResizeObserver(padding = 0) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !contentRef.current) return

      const { width: containerWidth } =
        containerRef.current.getBoundingClientRect()
      const { width: contentWidth } = contentRef.current.getBoundingClientRect()

      if (containerWidth <= contentWidth + padding) {
        setContainerWidth(containerWidth)
      } else {
        setContainerWidth(null)
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [padding])

  return { containerRef, contentRef, containerWidth }
}

/**
 * useDualContentResizeObserver 훅
 *
 * 컨테이너와 두 개의 컨텐츠 요소의 넓이를 감시하며 필요한 ref 객체를 생성합니다.
 * 두 컨텐츠의 합이 컨테이너보다 크면 컨테이너의 넓이를 반환하고, 그렇지 않으면 null을 반환합니다.
 */
export function useDualContentResizeObserver(gap = 0) {
  const containerRef = useRef<HTMLDivElement>(null)
  const content1Ref = useRef<HTMLDivElement>(null)
  const content2Ref = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  useEffect(() => {
    if (!containerRef.current || !content1Ref.current || !content2Ref.current)
      return

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !content1Ref.current || !content2Ref.current)
        return

      const { width: containerWidth } =
        containerRef.current.getBoundingClientRect()
      const { width: content1Width } =
        content1Ref.current.getBoundingClientRect()
      const { width: content2Width } =
        content2Ref.current.getBoundingClientRect()

      if (containerWidth <= content1Width + content2Width + gap) {
        setContainerWidth(containerWidth)
      } else {
        setContainerWidth(null)
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [gap])

  return { containerRef, content1Ref, content2Ref, containerWidth }
}
