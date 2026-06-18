import { getTasksDateRange } from "./utils"
import type {
  MilestoneViewModel,
  TaskViewModel,
} from "@features/dashboard/projects/wbs/types"

// DateRange 타입 정의
export type DateRange = {
  startDate: Date
  endDate: Date
}

export type MilestoneUpdateInfo = {
  milestoneId: number
  prevEndDate: Date
  nextEndDate: Date
}

export type DateValidationResult = {
  isValid: boolean
  newDateRange?: DateRange
  milestoneUpdateInfo?: MilestoneUpdateInfo
  toast?: {
    showToast: boolean
    toastStatus: "success" | "error"
    toastMessage: string
  }
}

export type DateValidationFunction = (
  prevDateRange: DateRange,
  nextDateRange: DateRange,
  item: TaskViewModel | MilestoneViewModel,
  milestones: MilestoneViewModel[],
) => DateValidationResult

/**
 * 기본 날짜 유효성 검사 함수 - 어떤 변경이든 허용
 */
export const alwaysValidDateValidator: DateValidationFunction = (
  _prevDateRange,
  nextDateRange,
) => {
  return {
    isValid: true,
    newDateRange: nextDateRange,
  }
}

/**
 * 태스크 종료일이 마일스톤 종료일을 초과하지 않도록 검사
 */
export const taskEndDateValidator: DateValidationFunction = (
  _,
  nextDateRange,
  item,
  milestones,
) => {
  if ("name" in item && "tasks" in item) {
    // 마일스톤인 경우 항상 valid
    return {
      isValid: true,
      newDateRange: nextDateRange,
    }
  }

  // 태스크인 경우
  const taskItem = item as TaskViewModel

  // 소속된 마일스톤 찾기
  const parentMilestone = milestones.find((milestone) =>
    milestone.tasks.some((task) => task.id === taskItem.id),
  )

  if (!parentMilestone || !parentMilestone.date) {
    return {
      isValid: true,
      newDateRange: nextDateRange,
    }
  }

  const milestoneStartDate = parentMilestone.date.startDate
  const milestoneEndDate = parentMilestone.date.endDate

  // 시작일 검사: 태스크 시작일이 마일스톤 시작일보다 이전이면 안됨
  if (nextDateRange.startDate < milestoneStartDate) {
    return {
      isValid: true,
      toast: {
        showToast: true,
        toastStatus: "error",
        toastMessage:
          "태스크 시작일을 앞당기려면 마일스톤 시작일을 변경해 주세요.",
      },
      newDateRange: {
        startDate: milestoneStartDate,
        endDate: nextDateRange.endDate,
      },
    }
  }

  // 종료일 검사: 태스크 종료일이 마일스톤 종료일보다 늦으면, 마일스톤 종료일도 함께 업데이트
  if (nextDateRange.endDate > milestoneEndDate) {
    // 명시적으로 마일스톤 업데이트 정보 반환
    return {
      isValid: true,
      newDateRange: nextDateRange,
      milestoneUpdateInfo: {
        milestoneId: parentMilestone.id,
        prevEndDate: milestoneEndDate,
        nextEndDate: new Date(nextDateRange.endDate),
      },
      toast: {
        showToast: true,
        toastStatus: "success",
        toastMessage: "태스크 종료일에 맞춰 마일스톤 종료일이 확장됩니다.",
      },
    }
  }

  // 정상적인 케이스
  return {
    isValid: true,
    newDateRange: nextDateRange,
  }
}

/**
 * Center 드래그에 최적화된 태스크 유효성 검사
 * 시작일과 종료일 간의 기간 유지, 마일스톤 범위 제약 처리
 */
export const taskCenterDragValidator: DateValidationFunction = (
  prevDateRange,
  nextDateRange,
  item,
  milestones,
) => {
  if ("name" in item && "tasks" in item) {
    // 마일스톤인 경우 별도 처리 없이 전달
    return {
      isValid: true,
      newDateRange: nextDateRange,
    }
  }

  // 태스크인 경우
  const taskItem = item as TaskViewModel

  // 소속된 마일스톤 찾기
  const parentMilestone = milestones.find((milestone) =>
    milestone.tasks.some((task) => task.id === taskItem.id),
  )

  if (!parentMilestone || !parentMilestone.date) {
    return {
      isValid: true,
      newDateRange: nextDateRange,
    }
  }

  const milestoneStartDate = parentMilestone.date.startDate
  const milestoneEndDate = parentMilestone.date.endDate

  // 시작일이 마일스톤 시작일보다 이전이면 이동을 제한
  // 이전 조건: nextDateRange.startDate < milestoneStartDate
  // 새 조건: nextDateRange.startDate가 milestoneStartDate보다 하루 이상 이전이면 제한
  const oneDayInMs = 24 * 60 * 60 * 1000
  if (
    nextDateRange.startDate.getTime() <
    milestoneStartDate.getTime() - oneDayInMs
  ) {
    return {
      isValid: false, // 이동 불가로 설정
      toast: {
        showToast: true,
        toastStatus: "error",
        toastMessage: "태스크는 마일스톤 범위를 벗어날 수 없습니다.",
      },
      newDateRange: prevDateRange, // 원래 위치로 유지
    }
  }

  // 종료일이 마일스톤 종료일을 초과하면 마일스톤도 함께 확장
  if (nextDateRange.endDate > milestoneEndDate) {
    return {
      isValid: true,
      newDateRange: nextDateRange,
      milestoneUpdateInfo: {
        milestoneId: parentMilestone.id,
        prevEndDate: milestoneEndDate,
        nextEndDate: new Date(nextDateRange.endDate),
      },
      toast: {
        showToast: true,
        toastStatus: "success",
        toastMessage:
          "변경된 태스크 마감일로 마일스톤 마감일이 수정되었습니다.",
      },
    }
  }

  // 정상적인 케이스
  return {
    isValid: true,
    newDateRange: nextDateRange,
  }
}

/**
 * 마일스톤의 날짜 범위가 내부 태스크들의 날짜 범위를 포함하는지 검사
 */
export const milestoneContainsTasksValidator: DateValidationFunction = (
  _,
  nextDateRange,
  item,
  _milestones,
) => {
  // 마일스톤이 아니면 항상 valid
  if (!("tasks" in item)) {
    return {
      isValid: true,
      newDateRange: nextDateRange,
    }
  }

  const milestoneItem = item as MilestoneViewModel
  const { tasks } = milestoneItem

  // 마일스톤에 태스크가 없거나 모든 태스크에 날짜가 없는 경우
  if (tasks.length === 0 || !tasks.some((task) => task.date)) {
    return {
      isValid: true,
      newDateRange: nextDateRange,
    }
  }

  // 태스크들의 날짜 범위 계산
  const { earliestStartDate, latestEndDate } = getTasksDateRange(tasks)

  if (!earliestStartDate || !latestEndDate) {
    return {
      isValid: true,
      newDateRange: nextDateRange,
    }
  }

  // 마일스톤 시작일 검사
  if (nextDateRange.startDate > earliestStartDate) {
    return {
      isValid: true,
      toast: {
        showToast: true,
        toastStatus: "error",
        toastMessage: "이미 등록된 태스크가 있어 시작일을 변경할 수 없습니다.",
      },
      newDateRange: {
        startDate: earliestStartDate,
        endDate: nextDateRange.endDate,
      },
    }
  }

  // 마일스톤 종료일 검사
  if (nextDateRange.endDate < latestEndDate) {
    return {
      isValid: true,
      toast: {
        showToast: true,
        toastStatus: "error",
        toastMessage: "이미 등록된 태스크가 있어 마감일을 변경할 수 없습니다.",
      },
      newDateRange: {
        startDate: nextDateRange.startDate,
        endDate: latestEndDate,
      },
    }
  }

  // 정상적인 케이스
  return {
    isValid: true,
    newDateRange: nextDateRange,
  }
}
