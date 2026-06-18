import { Pagination } from "@components/pagination"
import * as Popover from "@components/popover.styled"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { TEXT } from "@components/shared-components/tokens/color"
import NiceModal from "@ebay/nice-modal-react"
import { historiesQueryKey } from "@features/dashboard/projects/histories/queries/historiesQueryKey"
import { useGetProjectWorkHistoryListQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectWorkHistoryListQueryObject"
import { UpdateMyWorksDialog } from "@features/dashboard/projects/my-works/components/update-my-works-dialog"
import { myWorksQueryKey } from "@features/dashboard/projects/my-works/queries/myWorksQueryKey"
import { useGetMyWorkHistoriesQueryObject } from "@features/dashboard/projects/my-works/queries/useGetMyWorkHistoriesQueryObject"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useDeleteMyWorkMutation } from "@features/dashboard/queries/useDeleteMyWorkMutation"
import { useGetFirstMilestoneQueryObject } from "@features/dashboard/queries/useGetMilestonesQueryObject"
import { wrap } from "@suspensive/react"
import {
  queryOptions,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { format } from "date-fns"
import ko from "date-fns/locale/ko"
import { get, toNumber } from "es-toolkit/compat"
import { useMemo } from "react"
import toast from "react-hot-toast"
import { useParams, useSearchParams } from "react-router"
import Checked from "~icons/local/ic_check"
import Edit from "~icons/local/ic_edit"
import More from "~icons/local/ic_more"
import Trash from "~icons/local/ic_trash"
import * as Styled from "./works-table.styled"
import { Tooltip } from "@components/tooltip.styled"

export const WorksTable = wrap.Suspense().on(function () {
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const projectWorkerId = toNumber(useParams().projectWorkerId)
  const milestoneId = toNumber(useSearchParams()[0].get("milestone"))
  const milestoneIdForWbs = useParams().milestoneId
  const taskId = useParams().taskId
  const page = toNumber(useSearchParams()[0].get("page") ?? "0")

  const isWbsPage = !!(
    milestoneIdForWbs &&
    taskId &&
    !isNaN(Number(milestoneIdForWbs)) &&
    !isNaN(Number(taskId))
  )

  const { data: first } = useSuspenseQuery(
    useGetFirstMilestoneQueryObject(clientProjectContractId),
  )
  const { data: history } = useQuery(
    queryOptions({
      ...useGetMyWorkHistoriesQueryObject(
        clientProjectContractId,
        projectWorkerId,
        milestoneId === 0 ? undefined : milestoneId,
        page,
      ),
      enabled: !isWbsPage,
    }),
  )

  const { data: historyForWBS } = useQuery(
    queryOptions({
      ...useGetProjectWorkHistoryListQueryObject(
        clientProjectContractId,
        undefined,
        projectWorkerId,
        undefined,
        undefined,
        Number(milestoneIdForWbs),
        Number(taskId),
      ),
      enabled: isWbsPage,
    }),
  )

  const queryClient = useQueryClient()
  const { mutateAsync: deleteMyWork } = useDeleteMyWorkMutation(
    clientProjectContractId,
  )

  const histories = useMemo(() => {
    if (isWbsPage) {
      return historyForWBS?.contents ?? []
    }
    return history?.contents ?? []
  }, [history, historyForWBS, isWbsPage])

  const totalWorkTime = histories
    .reduce((acc, history) => {
      return acc + (history.workTime ?? 0)
    }, 0)
    .toLocaleString("ko-KR", {
      maximumFractionDigits: 1,
    })

  return (
    <Styled.TooltipContainer>
      {(() => {
        const emptyIndexes = histories
          .map((history, index) =>
            !history.workDescription ||
            !history.workEndAt ||
            !history.workTime ||
            !history.progressPercent
              ? index
              : -1,
          )
          .filter((index) => index !== -1)

        return emptyIndexes.length === 0 ? null : (
          <Styled.TooltipPosition
            key={`tooltip-${emptyIndexes[0]}`}
            index={emptyIndexes.length > 1 ? 0 : emptyIndexes[0]}>
            <Tooltip>
              {
                "내용은 빠짐없이 입력해주세요!\n빈 작업 내역은 정산 시 반영이 되지 않아요."
              }
            </Tooltip>
          </Styled.TooltipPosition>
        )
      })()}
      <Styled.Container>
        <Styled.Table>
          <thead>
            <tr>
              <Styled.Head width="2.375rem" />
              <Styled.Head width="12.5rem">배정된 작업</Styled.Head>
              <Styled.Head width="17.5rem">상세 내용</Styled.Head>
              <Styled.Head width="9.375rem">작업 날짜</Styled.Head>
              <Styled.Head width="8.125rem">시작 시각</Styled.Head>
              <Styled.Head width="8.125rem">끝낸 시각</Styled.Head>
              <Styled.Head width="8.125rem">작업 시간</Styled.Head>
              <Styled.Head width="8.125rem">진행률</Styled.Head>
              <Styled.Head width="8.125rem">PM 컨펌</Styled.Head>
            </tr>
          </thead>

          <tbody>
            {histories.map((history) => (
              <tr key={history.id}>
                <Styled.Cell data-no-spacing>
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <Styled.MenuTriggerButton>
                        <More />
                      </Styled.MenuTriggerButton>
                    </Popover.Trigger>
                    <Popover.Content sideOffset={8} align="start">
                      <Styled.MenuActionButton
                        onClick={() => {
                          if (history.isConfirmed) {
                            toast.error(
                              "이미 컨펌된 작업은 수정할 수 없습니다.",
                            )
                          } else {
                            NiceModal.show(UpdateMyWorksDialog, {
                              clientContractId: clientProjectContractId,
                              milestoneId: milestoneId || first?.id,
                              history,
                            })
                          }
                        }}>
                        <Edit
                          width="1.25rem"
                          height="1.25rem"
                          color={TEXT.SECONDARY}
                        />
                        <Text color="SECONDARY">작업 수정</Text>
                      </Styled.MenuActionButton>
                      <Styled.MenuActionButton
                        onClick={async () => {
                          if (history.isConfirmed) {
                            toast.error(
                              "이미 컨펌된 작업은 삭제할 수 없습니다.",
                            )
                          } else {
                            try {
                              const response = await deleteMyWork(history.id)
                              if (response.data.isSuccess) {
                                await queryClient.invalidateQueries({
                                  queryKey: myWorksQueryKey.all(
                                    clientProjectContractId,
                                  ),
                                })
                                await queryClient.invalidateQueries({
                                  queryKey: dashboardQueryKey.milestones(
                                    clientProjectContractId,
                                  ),
                                })
                                await queryClient.invalidateQueries({
                                  queryKey: historiesQueryKey.all(),
                                })
                                toast.success("작업 기록을 삭제하였습니다.")
                              }
                            } catch (error) {
                              toast.error(
                                get(
                                  error,
                                  "message",
                                  "알 수 없는 오류가 발생했습니다.",
                                ),
                              )
                            }
                          }
                        }}>
                        <Trash
                          width="1.25rem"
                          height="1.25rem"
                          color={TEXT.DANGER}
                        />
                        <Text color="DANGER">작업 삭제</Text>
                      </Styled.MenuActionButton>
                    </Popover.Content>
                  </Popover.Root>
                </Styled.Cell>
                <Styled.Cell>
                  <Styled.Badge truncated>{history.taskName}</Styled.Badge>
                </Styled.Cell>
                <Styled.Cell>
                  <Text truncated={1}>{history.workDescription}</Text>
                </Styled.Cell>
                <Styled.Cell>
                  {format(new Date(history.workStartAt), "yyyy.MM.dd. E", {
                    locale: ko,
                  })}
                </Styled.Cell>
                <Styled.Cell>
                  <HStack align="center" spacing="0.5rem" justify="end">
                    {format(new Date(history.workStartAt), "HH:mm")}
                    <Styled.TimeBadge>
                      {format(new Date(history.workStartAt), "a")}
                    </Styled.TimeBadge>
                  </HStack>
                </Styled.Cell>
                <Styled.Cell>
                  <HStack align="center" spacing="0.5rem" justify="end">
                    {history.workEndAt && (
                      <>
                        {(() => {
                          // 끝나는 시간은 00:00이면 24:00으로 표시
                          const date = new Date(history.workEndAt)
                          const hours = date.getHours()
                          const minutes = date.getMinutes()

                          if (hours === 0 && minutes === 0) {
                            return "24:00"
                          }
                          return format(date, "HH:mm")
                        })()}

                        <Styled.TimeBadge>
                          {format(new Date(history.workEndAt), "a")}
                        </Styled.TimeBadge>
                      </>
                    )}
                  </HStack>
                </Styled.Cell>
                <Styled.Cell>
                  {history.workEndAt && (
                    <Text as="p" align="right">
                      {history.workTime} 시간
                    </Text>
                  )}
                </Styled.Cell>
                <Styled.Cell>
                  <HStack align="center" spacing="0.5rem" justify="center">
                    {history.progressPercent && (
                      <Styled.ProgressBadge>
                        {history.progressPercent}%
                      </Styled.ProgressBadge>
                    )}
                  </HStack>
                </Styled.Cell>
                <Styled.Cell>
                  <Styled.Checked data-active={history.isConfirmed}>
                    <Checked />
                  </Styled.Checked>
                </Styled.Cell>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <Styled.Cell colSpan={6} />
              <Styled.Cell>
                <HStack
                  hidden={histories.length === 0}
                  align="center"
                  justify="between"
                  spacing="1rem">
                  <Text typo="body3" color="SECONDARY">
                    합계
                  </Text>
                  <Text typo="body3" color="HIGH_EMPHASIS">
                    {totalWorkTime}
                    시간
                  </Text>
                </HStack>
              </Styled.Cell>
            </tr>
            <Styled.PaginationRow id="row-pagination">
              <td colSpan={9}>
                <Pagination total={history?.totalPages || 1} />
              </td>
            </Styled.PaginationRow>
          </tfoot>
        </Styled.Table>
      </Styled.Container>
    </Styled.TooltipContainer>
  )
})
