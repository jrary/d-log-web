import { Pagination } from "@components/pagination"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { WorkTableRow } from "@features/dashboard/projects/histories/components/table/worker-table-row"
import { useGetProjectWorkHistoryListQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectWorkHistoryListQueryObject"
import { useGetFirstMilestoneQueryObject } from "@features/dashboard/queries/useGetMilestonesQueryObject"
import { wrap } from "@suspensive/react"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useParams, useSearchParams } from "react-router"
import * as Styled from "./filter-table.styled"

type SheetProps = {
  workHistoryFilter: string | null
  roleId: string | null
  workerId: number | null
  taskId: number | null
  startDate: string | null
  endDate: string | null
  excludeColumns?: string[]
}

export const FilterSheet = wrap.Suspense().on(function ({
  workHistoryFilter,
  roleId,
  workerId,
  taskId,
  startDate,
  endDate,
  excludeColumns = [],
}: SheetProps) {
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useSearchParams()[0].get("milestone"))
  const page = toNumber(useSearchParams()[0].get("page") ?? "0")

  const { data: first } = useSuspenseQuery(
    useGetFirstMilestoneQueryObject(clientProjectContractId),
  )
  const { data: workHistory } = useQuery(
    useGetProjectWorkHistoryListQueryObject(
      clientProjectContractId,
      roleId?.split(",").map(Number),
      workerId || undefined,
      startDate || undefined,
      endDate || undefined,
      milestoneId === 0 ? undefined : milestoneId,
      taskId || undefined,
      workHistoryFilter || undefined,
      page,
    ),
  )

  const histories = workHistory?.contents ?? []

  const totalWorkTime = histories
    .reduce((acc, history) => {
      return acc + (history.workTime ?? 0)
    }, 0)
    .toLocaleString("ko-KR", {
      maximumFractionDigits: 1,
    })

  const columnDefinitions = [
    {
      id: "menu",
      width: "2.375rem",
      label: "",
      hidden: excludeColumns.includes("menu"),
    },
    {
      id: "task",
      width: "12.5rem",
      label: "배정된 작업",
      hidden: excludeColumns.includes("task"),
    },
    {
      id: "description",
      width: "17.5rem",
      label: "상세 내용",
      hidden: excludeColumns.includes("description"),
    },
    {
      id: "worker",
      width: "8.75rem",
      label: "담당자",
      hidden: excludeColumns.includes("worker"),
    },
    {
      id: "date",
      width: "9.375rem",
      label: "작업 날짜",
      hidden: excludeColumns.includes("date"),
    },
    {
      id: "startTime",
      width: "8.125rem",
      label: "시작 시각",
      hidden: excludeColumns.includes("startTime"),
    },
    {
      id: "endTime",
      width: "8.125rem",
      label: "끝낸 시각",
      hidden: excludeColumns.includes("endTime"),
    },
    {
      id: "workTime",
      width: "8.125rem",
      label: "작업 시간",
      hidden: excludeColumns.includes("workTime"),
    },
    {
      id: "progress",
      width: "8.125rem",
      label: "진행률",
      hidden: excludeColumns.includes("progress"),
    },
    {
      id: "confirm",
      width: "8.125rem",
      label: "PM 컨펌",
      hidden: excludeColumns.includes("confirm"),
    },
    { id: "empty", width: "", label: "", hidden: false },
  ]

  const visibleColumns = columnDefinitions.filter((column) => !column.hidden)

  return (
    <Styled.Container>
      <Styled.Table>
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <Styled.Head key={column.id} width={column.width}>
                {column.label}
              </Styled.Head>
            ))}
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <WorkTableRow
              key={history.id}
              id={history.id}
              milestoneId={milestoneId || first?.id}
              history={history}
              excludeColumns={excludeColumns}
            />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <Styled.Cell colSpan={visibleColumns.length - 2} />
            <Styled.Cell>
              <HStack
                hidden={histories.length === 0}
                align="center"
                justify="between"
                spacing="1rem">
                <Text typo="caption" color="SECONDARY">
                  합계
                </Text>
                <Text typo="caption" color="HIGH_EMPHASIS">
                  {totalWorkTime}
                  시간
                </Text>
              </HStack>
            </Styled.Cell>
          </tr>
          <Styled.PaginationRow id="row-pagination">
            <td colSpan={visibleColumns.length}>
              <Pagination total={workHistory?.totalPages || 1} />
            </td>
          </Styled.PaginationRow>
        </tfoot>
      </Styled.Table>
    </Styled.Container>
  )
})
