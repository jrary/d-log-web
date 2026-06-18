import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import Dash from "~icons/local/ic_dash"
import {
  ResizableContent,
  ResizableWrapper,
  ResizeHandle,
} from "./index.styled"

export type onMouseMoveInResizable = (
  e: MouseEvent,
  position: "left" | "right" | "center",
) => void

type ResizableBarProps = {
  children?: React.ReactNode
  width?: number
  onClick?: () => void
  onMouseDown?: (e: React.MouseEvent) => void
  onMouseMove?: onMouseMoveInResizable
  onMouseUp?: (e: MouseEvent) => void
  className?: string
}

const ResizableBar = forwardRef<HTMLDivElement, ResizableBarProps>(
  (
    {
      children,
      width,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      className,
      onClick,
    },
    ref,
  ) => {
    const isDraggingRef = useRef<"left" | "right" | "center" | null>(null)
    const [isDragging, setIsDragging] = useState<
      "left" | "right" | "center" | null
    >(null)

    // 마우스 다운 위치 저장
    const mouseDownPosRef = useRef<{
      x: number
      scrollX: number
      initialDeltaX: number // 누적 deltaX 방지를 위한 초기값
    } | null>(null)

    // 콜백 함수들을 ref로 저장하여 최신 상태를 유지
    const callbacksRef = useRef({
      onMouseDown,
      onMouseMove,
      onMouseUp,
    })

    // 콜백 ref 업데이트
    useEffect(() => {
      callbacksRef.current = {
        onMouseDown,
        onMouseMove,
        onMouseUp,
      }
    }, [onMouseDown, onMouseMove, onMouseUp])

    const handleMouseDown = useCallback(
      (position: "left" | "right" | "center", e: React.MouseEvent) => {
        isDraggingRef.current = position
        setIsDragging(position) // UI 업데이트를 위한 상태 설정
        if (position === "center") {
          document.body.style.cursor = "pointer"
        } else {
          document.body.style.cursor = "col-resize"
        }
        callbacksRef.current.onMouseDown?.(e)

        // 마우스 이벤트 캡처 - pointerId 사용 제거
        e.preventDefault()
        e.stopPropagation()

        // 마우스 다운 위치 저장
        mouseDownPosRef.current = {
          x: e.clientX,
          scrollX: window.scrollX,
          initialDeltaX: 0, // 초기값 설정
        }
      },
      [],
    )

    const handleMouseUp = useCallback((e: MouseEvent) => {
      if (!isDraggingRef.current) return // 드래깅 중이 아니면 무시

      isDraggingRef.current = null
      setIsDragging(null) // UI 업데이트를 위한 상태 설정
      document.body.style.cursor = ""
      mouseDownPosRef.current = null // 마우스 다운 위치 초기화
      callbacksRef.current.onMouseUp?.(e)
    }, [])

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!isDraggingRef.current) return

      // center 위치일 때도 deltaX 없이 마우스 이벤트만 전달
      callbacksRef.current.onMouseMove?.(e, isDraggingRef.current)
    }, [])

    useEffect(() => {
      // 여러 이벤트 타입을 사용하여 마우스 업 이벤트 놓침 방지
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("pointerup", handleMouseUp as EventListener)
      document.addEventListener("touchend", handleMouseUp as EventListener)

      // 페이지를 벗어났을 때도 드래그 상태 해제
      window.addEventListener("blur", () => {
        if (isDraggingRef.current) {
          isDraggingRef.current = null
          setIsDragging(null) // UI 업데이트를 위한 상태 설정
          document.body.style.cursor = ""
        }
      })

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener(
          "pointerup",
          handleMouseUp as EventListener,
        )
        document.removeEventListener("touchend", handleMouseUp as EventListener)
      }
    }, [handleMouseMove, handleMouseUp])

    return (
      <ResizableWrapper
        ref={ref}
        width={width}
        className={`${isDragging ? "dragging" : ""} ${className || ""}`}
        onMouseDown={(e) => {
          // 이미 ResizeHandle에서 처리된 이벤트는 무시
          if ((e.target as HTMLElement).closest(".left, .right")) {
            return
          }
          // 중앙 영역 드래그 시 'center' 위치로 처리
          handleMouseDown("center", e)
        }}
        onClick={onClick}>
        <ResizeHandle
          className="left"
          onMouseDown={(e) => handleMouseDown("left", e)}>
          <Dash />
        </ResizeHandle>
        <ResizableContent>{children}</ResizableContent>
        <ResizeHandle
          className="right"
          onMouseDown={(e) => handleMouseDown("right", e)}>
          <Dash />
        </ResizeHandle>
      </ResizableWrapper>
    )
  },
)

export default ResizableBar
