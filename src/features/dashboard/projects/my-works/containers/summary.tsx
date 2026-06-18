import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { useGetMilestoneDetailQueryObject } from "@features/dashboard/projects/milestones/queries/useGetMilestoneDetailQueryObject"
import { SummaryCard } from "@features/dashboard/projects/my-works/components/summary-card"
import { useGetMyWorkTimeQueryObject } from "@features/dashboard/projects/my-works/queries/useGetMyWorkTimeQueryObject"
import { useGetFirstMilestoneQueryObject } from "@features/dashboard/queries/useGetMilestonesQueryObject"
import { wrap } from "@suspensive/react"
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { differenceInDays, differenceInWeeks } from "date-fns"
import { toNumber } from "es-toolkit/compat"
import { Fragment } from "react"
import { useParams, useSearchParams } from "react-router"
import Calendar from "~icons/local/ic_milestone_calendar"
import Info from "~icons/local/ic_info"
import {
  InfoIcon,
  TooltipContainer,
} from "@features/dashboard/projects/my-works/containers/styled"
import { Tooltip } from "@components/tooltip.styled"

export const Summary = wrap
  .Suspense({
    fallback: <Fragment />,
  })
  .on(function () {
    const projectWorkerId = toNumber(useParams().projectWorkerId)
    const clientProjectContractId = toNumber(
      useParams().clientProjectContractId,
    )
    const milestoneId = toNumber(useSearchParams()[0].get("milestone"))

    const { data: summary } = useSuspenseQuery(
      useGetMyWorkTimeQueryObject(projectWorkerId),
    )
    // 마일스톤 정보(기간) 호출
    const { data: first } = useSuspenseQuery(
      useGetFirstMilestoneQueryObject(clientProjectContractId),
    )
    const milestoneResponse = useQuery(
      queryOptions({
        ...useGetMilestoneDetailQueryObject(
          clientProjectContractId,
          milestoneId || first?.id || 0,
        ),
        enabled: !!(milestoneId || first?.id),
      }),
    )

    const milestone = !milestoneId
      ? null
      : milestoneResponse.isSuccess
        ? milestoneResponse.data
        : null

    //  n주 계산하기
    function calculateWeeks(start?: string, end?: string) {
      if (!start || !end) {
        return "-"
      }

      const startDate = new Date(start)
      const endDate = new Date(end)
      const difference = differenceInDays(endDate, startDate)

      if (difference < 0) {
        return ""
      }
      if (difference >= 7) {
        return `${differenceInWeeks(endDate, startDate)}주`
      }
      return `${difference}일`
    }
    // 날짜 데이터 보여주는 형식 변경하기
    // input: 2000-00-00T00:00
    // output: 2000.00.00
    function formatDate(date?: string) {
      if (!date) {
        return ""
      }
      const dateObject = new Date(date)
      if (String(dateObject) === "Invalid Date") return date
      return `${dateObject.getFullYear()}.${String(dateObject.getMonth() + 1).padStart(2, "0")}.${String(dateObject.getDate()).padStart(2, "0")}`
    }

    return (
      <HStack justify="between">
        <HStack id="summary" spacing="0.62rem">
          <SummaryCard title="프로젝트 전체 작업 시간">
            <HStack justify="end" align="baseline" spacing="0.125rem">
              <Text typo="sub3" color="HIGH_EMPHASIS">
                {summary.totalWorkTime}
              </Text>
              <Text typo="body3" color="HIGH_EMPHASIS">
                시간
              </Text>
            </HStack>
          </SummaryCard>

          <SummaryCard title="이번 달 작업 시간">
            <HStack justify="end" align="baseline" spacing="0.125rem">
              <Text typo="sub3" color="HIGH_EMPHASIS">
                {summary.monthWorkTime}
              </Text>
              <Text typo="body3" color="HIGH_EMPHASIS">
                시간
              </Text>
            </HStack>
          </SummaryCard>

          <SummaryCard
            title="이번 달 예상 정산금"
            icon={
              <InfoIcon>
                <Info />
                <TooltipContainer>
                  <Tooltip>
                    {"PM 컨펌 완료된 작업에 한해서만\n예상 정산금에 반영돼요."}
                  </Tooltip>
                </TooltipContainer>
              </InfoIcon>
            }>
            <HStack justify="end" align="baseline" spacing="0.125rem">
              <Text typo="sub3" color="HIGH_EMPHASIS">
                {summary.expectedPay.toLocaleString()}
              </Text>
              <Text typo="body3" color="HIGH_EMPHASIS">
                원
              </Text>
            </HStack>
          </SummaryCard>
        </HStack>

        {milestone && (
          <SummaryCard title="마일스톤 기간" icon={<Calendar />}>
            <HStack align="baseline" spacing="0.125rem">
              <Text typo="body1" color="HIGH_EMPHASIS">
                {`${formatDate(milestone.milestoneStartDate)} ~ ${formatDate(milestone.milestoneEndDate)}`}
              </Text>
              <Text typo="body3" color="HIGH_EMPHASIS">
                {`(${calculateWeeks(milestone.milestoneStartDate, milestone.milestoneEndDate)})`}
              </Text>
            </HStack>
          </SummaryCard>
        )}
      </HStack>
    )
  })
