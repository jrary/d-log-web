import { DATE_ITEM_WIDTH } from "@features/dashboard/projects/wbs/components/timeline/row/constant"
import type {
  MilestoneViewModel,
  TaskViewModel,
} from "@features/dashboard/projects/wbs/types"

/**
 * 위치 배열에서 주어진 마우스 위치에 가장 가까운 날짜의 인덱스를 찾는 함수
 */
export const findClosestDateIndex = (
  positions: number[],
  targetTime: number,
  virtualGrid: Record<number, Date>,
): number => {
  let left = 0
  let right = positions.length - 1
  let foundIndex = -1
  let minDiff = Infinity

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const pos = positions[mid]
    const gridDate = virtualGrid[pos]
    const gridTime = gridDate.getTime()
    const diff = Math.abs(gridTime - targetTime)

    if (diff < minDiff) {
      minDiff = diff
      foundIndex = mid
    }

    if (gridTime < targetTime) {
      left = mid + 1
    } else if (gridTime > targetTime) {
      right = mid - 1
    } else {
      // 정확히 일치하는 날짜를 찾음
      foundIndex = mid
      break
    }
  }

  return foundIndex
}

/**
 * 마우스 움직임에 따른 이동 셀 수 계산
 */
export const calculateCellsToMove = (
  currentMouseX: number,
  mouseDownX: number,
): number => {
  const mouseDeltaX = currentMouseX - mouseDownX
  return Math.round(mouseDeltaX / DATE_ITEM_WIDTH)
}

/**
 * 특정 milestoneId에 해당하는 마일스톤 찾기
 */
export const findMilestoneById = (
  milestones: MilestoneViewModel[],
  milestoneId: number,
): MilestoneViewModel | undefined => {
  return milestones.find((m) => m.id === milestoneId)
}

/**
 * 특정 taskId가 속한 마일스톤과 태스크 찾기
 */
export const findParentMilestoneAndTask = (
  milestones: MilestoneViewModel[],
  taskId: number,
): { parentMilestone?: MilestoneViewModel; taskItem?: TaskViewModel } => {
  for (const milestone of milestones) {
    const task = milestone.tasks.find((t: TaskViewModel) => t.id === taskId)
    if (task) {
      return { parentMilestone: milestone, taskItem: task }
    }
  }
  return { parentMilestone: undefined, taskItem: undefined }
}

/**
 * 마일스톤의 태스크들에서 가장 빠른 시작일과 가장 늦은 종료일 구하기
 */
export const getTasksDateRange = (
  tasks: TaskViewModel[],
): {
  earliestStartDate: Date | null
  latestEndDate: Date | null
} => {
  const tasksWithDates = tasks.filter((task) => task.date)

  if (tasksWithDates.length === 0) {
    return { earliestStartDate: null, latestEndDate: null }
  }

  const taskStartDates = tasksWithDates.map(
    (task) => task.date?.startDate.getTime() || 0,
  )
  const taskEndDates = tasksWithDates.map(
    (task) => task.date?.endDate.getTime() || 0,
  )

  return {
    earliestStartDate: new Date(Math.min(...taskStartDates)),
    latestEndDate: new Date(Math.max(...taskEndDates)),
  }
}

/**
 * 아이템이 마일스톤인지 확인
 */
export const isMilestone = (item: unknown): boolean => {
  return (
    typeof item === "object" &&
    item !== null &&
    "name" in item &&
    "tasks" in item
  )
}

/**
 * 위치 배열에서 주어진 위치에 가장 가까운 위치를 찾는 함수
 */
export const findClosestPositionWithBinarySearch = (
  positions: number[],
  targetPosition: number,
): number | null => {
  if (positions.length === 0) return null

  let left = 0
  let right = positions.length - 1
  let closestPos = positions[0]
  let minDiff = Math.abs(positions[0] - targetPosition)

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const pos = positions[mid]
    const diff = Math.abs(pos - targetPosition)

    if (diff < minDiff) {
      minDiff = diff
      closestPos = pos
    }

    if (pos < targetPosition) {
      left = mid + 1
    } else if (pos > targetPosition) {
      right = mid - 1
    } else {
      // 정확히 일치하는 위치를 찾음
      return pos
    }
  }

  return closestPos
}
