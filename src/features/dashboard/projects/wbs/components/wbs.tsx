import FloatingButton from "@features/dashboard/projects/wbs/components/floating-button"
import MilestoneList from "@features/dashboard/projects/wbs/components/milestone/milestone-list"
import Timeline from "@features/dashboard/projects/wbs/components/timeline"
import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import { useEffect } from "react"
import { TodayButtonPosition, WBSWrapper } from "./index.styled"

export default function WBS() {
  const goToday = useTimelineStore((state) => state.goToday)
  const readyForSaveVirtualGrid = useTimelineStore(
    (state) => state.readyForSaveVirtualGrid,
  )
  const resetVirtualGrid = useTimelineStore((state) => state.resetVirtualGrid)

  useEffect(() => {
    goToday()
    readyForSaveVirtualGrid()
    return () => {
      resetVirtualGrid()
    }
  }, [goToday, readyForSaveVirtualGrid, resetVirtualGrid])

  return (
    <WBSWrapper>
      <MilestoneList />
      <Timeline />

      <TodayButtonPosition>
        <FloatingButton onClick={goToday}>오늘</FloatingButton>
      </TodayButtonPosition>
    </WBSWrapper>
  )
}
