import { useEffect, useState } from "react"
import type { TaskViewModel } from "@features/dashboard/projects/wbs/types"

export default function useGetTaskCardHeight(task: TaskViewModel) {
  const [taskCardHeight, setTaskCardHeight] = useState<number | null>(null)

  useEffect(() => {
    const taskCard = document.querySelector(`.task-card-${task.id}`)
    const BORDER_BOTTOM_HEIGHT = 1
    if (taskCard) {
      setTaskCardHeight(taskCard.clientHeight + BORDER_BOTTOM_HEIGHT)
    } else {
      // 기본 높이 설정 (TaskCard의 기본 높이)
      setTaskCardHeight(50)
    }
  }, [task])

  return taskCardHeight
}
