import { DATE_ITEM_WIDTH } from "@features/dashboard/projects/wbs/components/timeline/row/constant"
import { calculateTimelineRange } from "@features/dashboard/projects/wbs/utils/date"
import { create } from "zustand"
import type { YearMonth } from "@features/dashboard/projects/wbs/types"

type VirtualItem = {
  year: number
  month: number
  days: number[]
  dates: Date[]
}

type TimelineStore = {
  containerRef: React.RefObject<HTMLDivElement> | null
  containerInfo: {
    left: number
    scrollX: number
  }
  milestoneListRef: React.RefObject<HTMLDivElement> | null
  isReadyForSaveVirtualGrid: boolean
  virtualGrid: Record<number, Date>
  virtualItems: VirtualItem[]
  containerTransform: number
  setContainerRef: (ref: React.RefObject<HTMLDivElement>) => void
  setMilestoneListRef: (ref: React.RefObject<HTMLDivElement>) => void
  addVirtualGrid: (left: number, date: Date) => void
  readyForSaveVirtualGrid: () => void
  resetVirtualGrid: () => void
  setVirtualGrid: (grid: Record<number, Date>) => void
  startYearMonth: YearMonth
  endYearMonth: YearMonth
  isScrolling: boolean
  goToday: (smooth?: boolean) => boolean
  goToDate: (date: Date, smooth?: boolean) => boolean
  handleScroll: () => void
  handleMilestoneScroll: () => void
  isAddingPrevMonth: boolean
}

const { startYearMonth, endYearMonth } = calculateTimelineRange()

// 특정 연월의 모든 날짜를 생성하는 함수
const getDatesForMonth = (year: number, month: number): Date[] => {
  const dates: Date[] = []
  const lastDay = new Date(year, month, 0).getDate()

  for (let day = 1; day <= lastDay; day++) {
    dates.push(new Date(year, month - 1, day))
  }

  return dates
}

// 초기 가상 아이템 생성 함수
const createInitialVirtualItems = (
  start: YearMonth,
  end: YearMonth,
): VirtualItem[] => {
  const items: VirtualItem[] = []
  let currentYear = start.year
  let currentMonth = start.month

  while (
    currentYear < end.year ||
    (currentYear === end.year && currentMonth <= end.month)
  ) {
    const dates = getDatesForMonth(currentYear, currentMonth)
    items.push({
      year: currentYear,
      month: currentMonth,
      days: Array.from({ length: dates.length }, (_, i) => i + 1),
      dates,
    })

    currentMonth++
    if (currentMonth > 12) {
      currentMonth = 1
      currentYear++
    }
  }

  return items
}

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  containerRef: null,
  containerInfo: {
    left: 0,
    scrollX: 0,
  },
  milestoneListRef: null,
  virtualGrid: {},
  isReadyForSaveVirtualGrid: false,
  virtualItems: createInitialVirtualItems(startYearMonth, endYearMonth),
  containerTransform: 0,
  startYearMonth,
  endYearMonth,
  isScrolling: false,
  isAddingPrevMonth: false,

  setContainerRef: (ref: React.RefObject<HTMLDivElement>) =>
    set({ containerRef: ref }),

  setMilestoneListRef: (ref: React.RefObject<HTMLDivElement>) =>
    set({ milestoneListRef: ref }),

  addVirtualGrid: (right: number, date: Date) => {
    const virtualGrid = get().virtualGrid
    virtualGrid[right] = date
  },

  readyForSaveVirtualGrid: () => set({ isReadyForSaveVirtualGrid: true }),
  resetVirtualGrid: () => set({ virtualGrid: {} }),
  setVirtualGrid: (grid: Record<number, Date>) => set({ virtualGrid: grid }),

  goToday: (smooth = false) => {
    return get().goToDate(new Date(), smooth)
  },

  goToDate: (date: Date, smooth = false) => {
    const { containerRef } = get()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const dateItem = document.querySelector(
      `.date-cell-${year}-${month}-${day}`,
    )

    if (containerRef && dateItem && containerRef.current) {
      set({ isScrolling: true })

      const dateRect = dateItem.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      const today = new Date()
      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()

      const scrollLeft =
        dateRect.left -
        containerRect.left +
        containerRef.current.scrollLeft -
        (isToday ? DATE_ITEM_WIDTH * 1 : 0)

      containerRef.current.scrollTo({
        left: scrollLeft,
        behavior: smooth ? "smooth" : "instant",
      })

      const scrollDuration = smooth ? 600 : 0
      setTimeout(() => {
        set({ isScrolling: false })
      }, scrollDuration + 100)

      return true
    }

    return false
  },

  handleScroll: () => {
    const {
      containerRef,
      milestoneListRef,
      startYearMonth,
      isScrolling,
      virtualItems,
      isAddingPrevMonth,
    } = get()

    if (!containerRef?.current || isScrolling) return

    const container = containerRef.current
    const scrollLeft = container.scrollLeft
    const clientWidth = container.clientWidth

    // 세로 스크롤 동기화
    if (milestoneListRef?.current && containerRef.current) {
      milestoneListRef.current.scrollTop = containerRef.current.scrollTop
    }

    // 버퍼 영역 계산 (현재 보이는 영역의 2배)
    const bufferWidth = clientWidth * 2

    // 스크롤이 왼쪽 버퍼 영역에 진입하면
    if (scrollLeft < bufferWidth && !isAddingPrevMonth) {
      let prevMonth = startYearMonth.month - 1
      let prevYear = startYearMonth.year

      if (prevMonth <= 0) {
        prevMonth = 12
        prevYear -= 1
      }

      // 이미 해당 월이 추가되어 있는지 확인
      const monthExists = virtualItems.some(
        (item) => item.year === prevYear && item.month === prevMonth,
      )

      if (!monthExists) {
        const dates = getDatesForMonth(prevYear, prevMonth)
        const currentScrollLeft = container.scrollLeft
        const addedWidth = dates.length * DATE_ITEM_WIDTH

        set({ isAddingPrevMonth: true })

        set((state) => ({
          startYearMonth: { year: prevYear, month: prevMonth },
          virtualItems: [
            {
              year: prevYear,
              month: prevMonth,
              days: Array.from({ length: dates.length }, (_, i) => i + 1),
              dates,
            },
            ...state.virtualItems,
          ],
        }))

        // 새로운 월이 추가된 후 스크롤 위치 조정
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.scrollLeft = currentScrollLeft + addedWidth
            set({ isAddingPrevMonth: false })
          }
        })
      }
    }

    // 오른쪽 스크롤 처리
    if (
      scrollLeft + clientWidth >
      container.scrollWidth - DATE_ITEM_WIDTH * 31
    ) {
      let nextMonth = get().endYearMonth.month + 1
      let nextYear = get().endYearMonth.year

      if (nextMonth > 12) {
        nextMonth = 1
        nextYear += 1
      }

      const dates = getDatesForMonth(nextYear, nextMonth)

      set((state) => ({
        endYearMonth: { year: nextYear, month: nextMonth },
        virtualItems: [
          ...state.virtualItems,
          {
            year: nextYear,
            month: nextMonth,
            days: Array.from({ length: dates.length }, (_, i) => i + 1),
            dates,
          },
        ],
      }))
    }
  },

  handleMilestoneScroll: () => {
    const { milestoneListRef, containerRef } = get()
    if (milestoneListRef?.current && containerRef?.current) {
      containerRef.current.scrollTop = milestoneListRef.current.scrollTop
    }
  },
}))
