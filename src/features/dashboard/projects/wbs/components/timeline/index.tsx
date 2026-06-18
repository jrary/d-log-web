import { Text } from "@components/shared-components/text"
import { IconButton } from "@features/dashboard/projects/wbs/components/shared/index.styled"
import DateRow from "@features/dashboard/projects/wbs/components/timeline/date-row"
import BackgroundRow from "@features/dashboard/projects/wbs/components/timeline/row/background-row"
import EmptyRow from "@features/dashboard/projects/wbs/components/timeline/row/empty-row"
import MilestoneRow from "@features/dashboard/projects/wbs/components/timeline/row/milestone-row"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import { useTaskStore } from "@features/dashboard/projects/wbs/stores/task"
import { useTimelineStore } from "@features/dashboard/projects/wbs/stores/timeline"
import ArrowRight from "~icons/local/ic_arrow_right.svg"
import useTimelineContainerRef from "./hooks/useTimelineContainerRef"
import {
  MonthList,
  MonthWrapper,
  RowWrapper,
  TimelineContentWrapper,
  TimelineHeaderWrapper,
  TimelineInnerWrapper,
  TimelineWrapper,
} from "./index.styled"
import TaskRow from "./row/task-row"
import TodayLine from "./today-line"

export default function Timeline() {
  const { virtualItems } = useTimelineStore()
  const milestones = useMilestoneStore((state) => state.milestones)
  const isCreatingMilestone = useMilestoneStore((state) => state.isCreating)
  const isCreatingTask = useTaskStore((state) => state.isCreatingTask)
  const creatingMilestoneId = useTaskStore((state) => state.creatingMilestoneId)

  const containerRef = useTimelineContainerRef()
  const handleScroll = useTimelineStore((state) => state.handleScroll)

  // 모든 날짜를 하나의 배열로 합치기
  const allDates = virtualItems.reduce<Date[]>(
    (acc, item) => [...acc, ...item.dates],
    [],
  )

  return (
    <TimelineWrapper ref={containerRef} onScroll={handleScroll}>
      {/* 상단 헤더 영역 */}
      <TimelineHeaderWrapper>
        <MonthList>
          {virtualItems.map((month) => (
            <MonthBox
              key={`${month.year}-${month.month}`}
              year={month.year}
              month={month.month}
              days={month.days.length}
            />
          ))}
        </MonthList>
        <DateRow dates={allDates} />
      </TimelineHeaderWrapper>
      <TimelineInnerWrapper>
        {/* 하단 콘텐츠 영역 */}
        <TimelineContentWrapper>
          <BackgroundRow dates={allDates} />
          <TodayLine dates={allDates} />
          {milestones.map((milestone) => (
            <RowWrapper key={milestone.id}>
              <MilestoneRow milestone={milestone} dates={allDates} />
              {milestone.tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  milestone={milestone}
                  dates={allDates}
                  className={milestone.isOpenTasks ? "" : "hidden"}
                />
              ))}
              {isCreatingTask && creatingMilestoneId === milestone.id && (
                <EmptyRow
                  key={`${milestone.id}-create-task`}
                  height={50}
                  dates={allDates}
                />
              )}
            </RowWrapper>
          ))}
          {isCreatingMilestone && (
            <RowWrapper>
              <EmptyRow height={59} dates={allDates} />
            </RowWrapper>
          )}
        </TimelineContentWrapper>
      </TimelineInnerWrapper>
    </TimelineWrapper>
  )
}

const MonthBox = ({
  year,
  month,
  days,
}: {
  year: number
  month: number
  days: number
}) => {
  const width = days * 48
  const goToDate = useTimelineStore((state) => state.goToDate)

  const handlePrevMonth = () => {
    let prevMonth = month - 1
    let prevYear = year

    if (prevMonth <= 0) {
      prevMonth = 12
      prevYear -= 1
    }

    const prevMonthDate = new Date(prevYear, prevMonth - 1, 1)
    goToDate(prevMonthDate, true)
  }

  const handleNextMonth = () => {
    let nextMonth = month + 1
    let nextYear = year

    if (nextMonth > 12) {
      nextMonth = 1
      nextYear += 1
    }

    const nextMonthDate = new Date(nextYear, nextMonth - 1, 1)
    goToDate(nextMonthDate, true)
  }

  return (
    <MonthWrapper width={width}>
      <div>
        <IconButton onClick={handlePrevMonth}>
          <ArrowRight />
        </IconButton>
        <Text typo="body3" weight="regular">
          {`${year}년 ${month}월`}
        </Text>
        <IconButton onClick={handleNextMonth}>
          <ArrowRight />
        </IconButton>
      </div>
    </MonthWrapper>
  )
}
