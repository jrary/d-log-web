import { useCallback, useRef } from "react"

type InitialDatesRef = {
  lastCellsToMove: number
  mouseDownX: number | null
  initialPosition: number | null
}

const useDateOnStartDragRef = () => {
  const dateOnStartDragRef = useRef<InitialDatesRef>({
    lastCellsToMove: 0,
    mouseDownX: null,
    initialPosition: null,
  })

  const resetDateOnStartDragRef = useCallback(() => {
    dateOnStartDragRef.current = {
      lastCellsToMove: 0,
      mouseDownX: null,
      initialPosition: null,
    }
  }, [])

  const updateLastCellsToMove = useCallback((value: number) => {
    dateOnStartDragRef.current.lastCellsToMove = value
  }, [])

  return { dateOnStartDragRef, resetDateOnStartDragRef, updateLastCellsToMove }
}

export default useDateOnStartDragRef
