import { Pagination } from "@components/pagination"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { WorkTableRow } from "@features/dashboard/projects/histories/components/table/worker-table-row"
import { useGetProjectWorkHistoryListQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectWorkHistoryListQueryObject"
import { useGetFirstMilestoneQueryObject } from "@features/dashboard/queries/useGetMilestonesQueryObject"
import { wrap } from "@suspensive/react"
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useState } from "react"
import { useParams, useSearchParams } from "react-router"
import Arrow from "~icons/local/ic_triangle_arrow_down"
import * as Styled from "./filter-table.styled"

type SheetProps = {
  groupName: string
  workHistoryFilter: string | null
  roleId: string | null
  workerId: number | null
  startDate: string | null
  endDate: string | null
}

export const GroupSheet = wrap.Suspense().on(function ({
  groupName,
  workHistoryFilter,
  roleId,
  workerId,
  startDate,
  endDate,
}: SheetProps) {
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useSearchParams()[0].get("milestone"))
  const page = toNumber(useSearchParams()[0].get("page") ?? "0")

  const [isTableOpen, setIsTableOpen] = useState<boolean>(true)
  const toggleTable = () => setIsTableOpen((prev) => !prev)

  const { data: first } = useSuspenseQuery(
    useGetFirstMilestoneQueryObject(clientProjectContractId),
  )
  const { data: workHistory } = useQuery(
    queryOptions({
      ...useGetProjectWorkHistoryListQueryObject(
        clientProjectContractId,
        roleId?.split(",").map(Number),
        workerId || undefined,
        startDate || undefined,
        endDate || undefined,
        milestoneId === 0 ? undefined : milestoneId,
        undefined,
        workHistoryFilter || undefined,
        page,
      ),
      enabled: Boolean(first),
    }),
  )

  const histories = workHistory?.contents ?? []
  const totalWorkTime = histories
    .reduce((acc, history) => {
      return acc + (history.workTime ?? 0)
    }, 0)
    .toLocaleString("ko-KR", {
      maximumFractionDigits: 1,
    })

  return (
    <Styled.Container>
      <Styled.Header>
        <HStack
          spacing="0.38rem"
          paddingHorizontal="0.38rem"
          paddingVertical="0.25rem"
          align="center">
          <Styled.Toggle onClick={toggleTable} isOpened={isTableOpen}>
            <Arrow />
            <Text typo="body1" color="DEFAULT">
              {groupName}
            </Text>
          </Styled.Toggle>

          <Styled.ItemCount>{histories.length}</Styled.ItemCount>
        </HStack>
        <HStack
          hidden={histories.length === 0}
          align="center"
          justify="between"
          spacing="1rem">
          <Text typo="caption" color="SECONDARY">
            작업 시간
          </Text>
          <Text typo="caption" color="HIGH_EMPHASIS">
            {totalWorkTime}
            시간
          </Text>
        </HStack>
      </Styled.Header>

      {isTableOpen && (
        <Styled.Table>
          <thead>
            <tr>
              <Styled.Head width="2.375rem" />
              <Styled.Head width="12.5rem">배정된 작업</Styled.Head>
              <Styled.Head width="17.5rem">상세 내용</Styled.Head>
              <Styled.Head width="8.75rem">담당자</Styled.Head>
              <Styled.Head width="9.375rem">작업 날짜</Styled.Head>
              <Styled.Head width="8.125rem">시작 시각</Styled.Head>
              <Styled.Head width="8.125rem">끝낸 시각</Styled.Head>
              <Styled.Head width="8.125rem">작업 시간</Styled.Head>
              <Styled.Head width="8.125rem">진행률</Styled.Head>
              <Styled.Head width="8.125rem">PM 컨펌</Styled.Head>
              <Styled.Head />
            </tr>
          </thead>
          <tbody>
            {histories.map((history) => (
              <WorkTableRow
                key={history.id}
                id={history.id}
                milestoneId={milestoneId || first?.id || -1}
                history={history}
              />
            ))}
          </tbody>

          <tfoot>
            <Styled.PaginationRow id="row-pagination">
              <td colSpan={9}>
                <Pagination total={workHistory?.totalPages || 1} />
              </td>
            </Styled.PaginationRow>
          </tfoot>
        </Styled.Table>
      )}
    </Styled.Container>
  )
})
