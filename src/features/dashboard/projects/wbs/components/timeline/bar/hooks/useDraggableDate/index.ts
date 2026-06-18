import wbsToast from "@features/dashboard/projects/wbs/components/shared/wbs-toast"
import { DATE_ITEM_WIDTH } from "@features/dashboard/projects/wbs/components/timeline/row/constant"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import { getDaysDifference } from "@features/dashboard/projects/wbs/utils/date"
import { throttle } from "@features/dashboard/projects/wbs/utils/func"
import { useCallback, useMemo, useRef } from "react"
import {
  milestoneContainsTasksValidator,
  taskCenterDragValidator,
  taskEndDateValidator,
} from "./dateValidators"
import useAutoScrollRef from "./useAutoScrollRef"
import useDateOnStartDragRef from "./useDateOnStartDragRef"
import {
  calculateCellsToMove,
  findClosestDateIndex,
  findClosestPositionWithBinarySearch,
  findMilestoneById,
  isMilestone,
} from "./utils"
import type {
  MilestoneViewModel,
  TaskViewModel,
} from "@features/dashboard/projects/wbs/types"
import type { MutableRefObject } from "react"
import type { DateRange, DateValidationResult } from "./dateValidators"

type ItemWithDate = {
  id: number
  date?: DateRange
}

type UpdateFunction<T extends ItemWithDate> = (
  id: number,
  update: Partial<T>,
) => void

export default function useDraggableDate<T extends ItemWithDate>(
  item: T,
  updateFn: UpdateFunction<T>,
  updatedMilestoneRef?: MutableRefObject<{
    milestoneId: number
    startDate: Date
    endDate: Date
  } | null>,
) {
  const updateMilestone = useMilestoneStore((state) => state.updateMilestone)
  const virtualGrid = useTimelineStore((state) => state.virtualGrid)
  const { dateOnStartDragRef, resetDateOnStartDragRef } =
    useDateOnStartDragRef()
  const { stopAutoScroll, updateScrollSpeed, activeAutoScroll } =
    useAutoScrollRef()

  // UI 상태 관리용 ref
  const isMoveable = useRef(true)
  const toastShown = useRef(false)

  // 가상 그리드 위치 배열
  const positions = useMemo(() => {
    return Object.keys(virtualGrid)
      .map(Number)
      .sort((a, b) => a - b)
  }, [Object.keys(virtualGrid).length])

  // 날짜 유효성 검사
  const validateDate = useCallback(
    (
      prevDateRange: DateRange,
      nextDateRange: DateRange,
      dragType: "center" | "left-right" = "left-right",
    ): DateValidationResult => {
      const milestones = useMilestoneStore.getState().milestones

      // 아이템 타입에 따라 적절한 유효성 검사 적용
      if (isMilestone(item)) {
        return milestoneContainsTasksValidator(
          prevDateRange,
          nextDateRange,
          item as unknown as MilestoneViewModel,
          milestones,
        )
      } else {
        // 태스크: 드래그 유형에 따라 다른 유효성 검사 함수 사용
        const validatorFn =
          dragType === "center" ? taskCenterDragValidator : taskEndDateValidator

        const result = validatorFn(
          prevDateRange,
          nextDateRange,
          item as unknown as TaskViewModel,
          milestones,
        )

        // 마일스톤 업데이트 참조 갱신
        if (result.milestoneUpdateInfo && updatedMilestoneRef) {
          const { milestoneId, nextEndDate } = result.milestoneUpdateInfo
          const milestone = findMilestoneById(milestones, milestoneId)

          if (milestone && milestone.date) {
            // updatedMilestoneRef 업데이트
            updatedMilestoneRef.current = {
              milestoneId,
              startDate: milestone.date.startDate,
              endDate: nextEndDate,
            }
            updateMilestone(milestoneId, {
              date: {
                startDate: milestone.date.startDate,
                endDate: nextEndDate,
              },
            })
          }
        }

        return result
      }
    },
    [item, updatedMilestoneRef],
  )

  // center 위치 드래그 처리 함수
  const handleCenterDrag = useCallback(
    (e: MouseEvent, containerInfo: { scrollX: number }) => {
      if (!item.date) return

      // 마일스톤에 하위 태스크가 있는 경우 이동 불가
      if (isMilestone(item)) {
        const milestone = item as unknown as MilestoneViewModel
        if (milestone.tasks.length > 0) {
          if (!toastShown.current) {
            wbsToast.error("하위 태스크가 존재하면 마일스톤 이동이 불가합니다.")
            toastShown.current = true
          }
          isMoveable.current = false
          return
        }
      }

      if (!isMoveable.current) return

      // 날짜 간격 계산
      const currentDateRange = item.date
      const daysDiff =
        getDaysDifference(
          currentDateRange.startDate,
          currentDateRange.endDate,
        ) - 1

      // 드래그 시작 시점의 정보 저장 (첫 이동 시)
      if (dateOnStartDragRef.current.mouseDownX === null) {
        dateOnStartDragRef.current.lastCellsToMove = 0
        dateOnStartDragRef.current.mouseDownX =
          e.clientX + containerInfo.scrollX

        // 초기 시작일에 해당하는 위치 찾기
        const initialStartTime = currentDateRange.startDate.getTime()
        const foundIndex = findClosestDateIndex(
          positions,
          initialStartTime,
          virtualGrid,
        )

        if (foundIndex !== -1) {
          dateOnStartDragRef.current.initialPosition = positions[foundIndex]
        }
      }

      // 마우스 이동에 따른 위치 변경 계산
      const currentMouseX = e.clientX + containerInfo.scrollX
      const cellsToMove = calculateCellsToMove(
        currentMouseX,
        dateOnStartDragRef.current.mouseDownX,
      )

      // 이전에 이동한 셀 수와 동일하면 업데이트 생략
      if (cellsToMove === dateOnStartDragRef.current.lastCellsToMove) return

      dateOnStartDragRef.current.lastCellsToMove = cellsToMove

      // 초기 위치에서 이동한 셀 위치 계산
      const initialPosition = dateOnStartDragRef.current.initialPosition || 0
      const targetPosition = initialPosition + cellsToMove * DATE_ITEM_WIDTH

      // 가상 그리드에서 가장 가까운 날짜 찾기
      const closestPos = findClosestPositionWithBinarySearch(
        positions,
        targetPosition,
      )
      if (closestPos === null) return

      // 새로운 시작 날짜 계산
      const newStartDate = virtualGrid[closestPos]
      if (!newStartDate) return

      // 종료일을 daysDiff에 맞게 계산
      const newEndDate = new Date(newStartDate)
      newEndDate.setDate(newStartDate.getDate() + daysDiff)

      // 날짜 유효성 검사 - center 드래그 유효성 검사 함수 사용
      const validationResult = validateDate(
        currentDateRange,
        {
          startDate: newStartDate,
          endDate: newEndDate,
        },
        "center",
      )

      // 토스트 메시지 표시
      const toast = validationResult.toast
      if (toast && !toastShown.current) {
        if (toast.showToast) {
          wbsToast[toast.toastStatus](toast.toastMessage)
          toastShown.current = true
        }
      }

      // 유효한 경우 업데이트
      if (validationResult.isValid && validationResult.newDateRange) {
        const update = {
          date: validationResult.newDateRange,
        } as unknown as Partial<T>

        updateFn(item.id, update)
      }

      // 자동 스크롤 속도 업데이트
      updateScrollSpeed(e)
    },
    [
      item,
      positions,
      virtualGrid,
      updateFn,
      dateOnStartDragRef,
      validateDate,
      updateScrollSpeed,
    ],
  )

  // 좌우 핸들 드래그 처리 함수
  const handleLeftRightDrag = useCallback(
    (e: MouseEvent, isLeft: boolean, containerInfo: { scrollX: number }) => {
      if (!item.date) return

      // 드래그 시작 시점의 정보 저장 (첫 이동 시)
      if (dateOnStartDragRef.current.mouseDownX === null) {
        dateOnStartDragRef.current.lastCellsToMove = 0
        dateOnStartDragRef.current.mouseDownX =
          e.clientX + containerInfo.scrollX

        const targetDate = isLeft ? item.date.startDate : item.date.endDate

        const targetTime = targetDate.getTime()
        const foundIndex = findClosestDateIndex(
          positions,
          targetTime,
          virtualGrid,
        )

        if (foundIndex !== -1) {
          dateOnStartDragRef.current.initialPosition = positions[foundIndex]
        }
      }

      // 마우스 이동에 따른 위치 변경 계산
      const currentMouseX = e.clientX + containerInfo.scrollX
      const cellsToMove = calculateCellsToMove(
        currentMouseX,
        dateOnStartDragRef.current.mouseDownX,
      )

      // 이전에 이동한 셀 수와 동일하면 업데이트 생략
      if (cellsToMove === dateOnStartDragRef.current.lastCellsToMove) return

      dateOnStartDragRef.current.lastCellsToMove = cellsToMove

      // 초기 위치에서 이동한 셀 위치 계산
      const initialPosition = dateOnStartDragRef.current.initialPosition || 0
      const targetPosition = initialPosition + cellsToMove * DATE_ITEM_WIDTH

      // 가상 그리드에서 가장 가까운 날짜 찾기
      const closestPos = findClosestPositionWithBinarySearch(
        positions,
        targetPosition,
      )
      if (closestPos === null) return

      // 새로운 날짜 계산
      const newDate = virtualGrid[closestPos]
      if (!newDate) return

      // 변경할 날짜 범위 계산
      let newStartDate = item.date.startDate
      let newEndDate = item.date.endDate

      if (isLeft) {
        // 왼쪽 핸들 드래그 - 시작일 변경
        newStartDate = newDate
        // 새 시작일이 종료일보다 나중이면 시작일을 종료일로 설정
        if (newStartDate > newEndDate) {
          newStartDate = newEndDate
        }
      } else {
        // 오른쪽 핸들 드래그 - 종료일 변경
        newEndDate = newDate
        // 새 종료일이 시작일보다 이전이면 종료일을 시작일로 설정
        if (newEndDate < newStartDate) {
          newEndDate = newStartDate
        }
      }

      // 날짜 유효성 검사
      const validationResult = validateDate(
        { startDate: item.date.startDate, endDate: item.date.endDate },
        { startDate: newStartDate, endDate: newEndDate },
        "left-right",
      )

      // 토스트 메시지 표시
      if (validationResult.toast && !toastShown.current) {
        const toast = validationResult.toast
        if (toast.showToast) {
          wbsToast[toast.toastStatus](toast.toastMessage)
          toastShown.current = true
        }
      }

      // 유효한 경우 업데이트
      if (validationResult.isValid && validationResult.newDateRange) {
        const update = {
          date: validationResult.newDateRange,
        } as unknown as Partial<T>

        updateFn(item.id, update)
      }

      // 자동 스크롤 속도 업데이트
      updateScrollSpeed(e)
    },
    [
      item,
      positions,
      virtualGrid,
      updateFn,
      dateOnStartDragRef,
      validateDate,
      updateScrollSpeed,
    ],
  )

  // 스로틀링 적용 함수들
  const throttledHandleCenterDrag = useMemo(
    () =>
      throttle((e: MouseEvent, containerInfo: { scrollX: number }) => {
        handleCenterDrag(e, containerInfo)
      }, 30),
    [handleCenterDrag],
  )

  const throttledHandleLeftRightDrag = useMemo(
    () =>
      throttle(
        (
          e: MouseEvent,
          isLeft: boolean,
          containerInfo: { scrollX: number },
        ) => {
          handleLeftRightDrag(e, isLeft, containerInfo)
        },
        30,
      ),
    [handleLeftRightDrag],
  )

  // 드래그 초기화 함수
  const resetDrag = useCallback(() => {
    resetDateOnStartDragRef()
    isMoveable.current = true
    toastShown.current = false
    stopAutoScroll()
  }, [resetDateOnStartDragRef, stopAutoScroll])

  // 가까운 셀 위치 찾기 리셋 함수
  const resetFindClosestCell = useMemo(
    () =>
      function resetFindClosestCell() {
        dateOnStartDragRef.current.mouseDownX = null
        toastShown.current = false
        stopAutoScroll()
      },
    [dateOnStartDragRef, stopAutoScroll],
  )

  // 기존 findClosestCell 인터페이스와 호환되는 함수 제공
  const findClosestCell = useCallback(
    (e: MouseEvent, position: "left" | "right" | "center") => {
      // 드래그 시작 시 마일스톤 업데이트 ref를 초기화
      if (e.type === "mousedown") {
        if (updatedMilestoneRef) {
          updatedMilestoneRef.current = null
        }
        toastShown.current = false
      }

      const containerInfo = {
        scrollX:
          document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      }

      // activeAutoScroll 호출 (자동 스크롤 기능)
      activeAutoScroll(e.clientX)

      if (position === "center") {
        throttledHandleCenterDrag(e, containerInfo)
      } else {
        throttledHandleLeftRightDrag(e, position === "left", containerInfo)
      }
    },
    [
      throttledHandleCenterDrag,
      throttledHandleLeftRightDrag,
      activeAutoScroll,
      updatedMilestoneRef,
    ],
  )

  return {
    handleCenterDrag: throttledHandleCenterDrag,
    handleLeftRightDrag: throttledHandleLeftRightDrag,
    findClosestCell,
    resetFindClosestCell,
    resetDrag,
    activeAutoScroll,
  }
}
