import { useEffect, useState } from "react"
import type { MilestoneViewModel } from "@features/dashboard/projects/wbs/types"

export default function useGetMilestoneCardHeight(
  milestone: MilestoneViewModel,
) {
  const [milestoneCardHeight, setMilestoneCardHeight] = useState<number | null>(
    null,
  )

  useEffect(() => {
    const milestoneCard = document.querySelector(
      `.milestone-card-${milestone.id}`,
    )
    const BORDER_BOTTOM_HEIGHT = 1
    if (milestoneCard) {
      setMilestoneCardHeight(milestoneCard.clientHeight + BORDER_BOTTOM_HEIGHT)
    }
  }, [milestone])

  return milestoneCardHeight
}
