import * as Popover from "@components/popover.styled"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { TEXT } from "@components/shared-components/tokens/color"
import NiceModal from "@ebay/nice-modal-react"
import { historiesQueryKey } from "@features/dashboard/projects/histories/queries/historiesQueryKey"
import { useUpdateProjectWorkConfirmMutation } from "@features/dashboard/projects/histories/queries/useUpdateProjectWorkConfirmMutation"
import { UpdateMyWorksDialog } from "@features/dashboard/projects/my-works/components/update-my-works-dialog"
import { useUpdateMyWorkMutation } from "@features/dashboard/projects/my-works/queries/useUpdateMyWorkMutation"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { get, toNumber } from "es-toolkit/compat"
import { FormikProvider, useFormik } from "formik"
import toast from "react-hot-toast"
import { useParams } from "react-router"
import Checked from "~icons/local/ic_check"
import UserProfile from "~icons/local/ic_dashboard_profile"
import Edit from "~icons/local/ic_edit"
import More from "~icons/local/ic_more"
import * as Styled from "./worker-table-row.styled"
import type {
  PatchProjectWorkHistoryRequest,
  ProjectWorkHistoryListDto,
} from "@apis/model"

type Props = {
  id?: number
  milestoneId?: number
  history: ProjectWorkHistoryListDto
  excludeColumns?: string[]
}

export type WorkTableRowFormikValues = PatchProjectWorkHistoryRequest & {
  workTime?: number
}

export function WorkTableRow({
  id,
  milestoneId,
  history,
  excludeColumns = [],
}: Props) {
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const queryClient = useQueryClient()

  const { mutateAsync: updateMyWork } = useUpdateMyWorkMutation(
    clientProjectContractId,
    id ?? -1,
  )

  const { mutateAsync: updateConfirm } = useUpdateProjectWorkConfirmMutation(
    clientProjectContractId,
    id ?? -1,
  )

  const formik = useFormik<WorkTableRowFormikValues>({
    enableReinitialize: true,
    initialValues: {
      taskId: history.taskId ?? 0,
      workDescription: history.workDescription,
      workStartAt: history.workStartAt,
      workEndAt:
        history.workEndAt ?? format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      progressPercent: history.progressPercent ?? 0,
      workTime: history.workTime,
    },
    onSubmit: async (v) => {
      try {
        const response = await updateMyWork(v)
        if (response.data.isSuccess) {
          toast.success("수정에 성공하였습니다.")
        } else {
          toast.error(
            response.data.message || "알 수 없는 오류가 발생했습니다.",
          )
        }
      } catch (error) {
        toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  return (
    <FormikProvider value={formik}>
      <tr>
        {!excludeColumns.includes("menu") && (
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
                      toast.error("이미 컨펌된 작업은 수정할 수 없습니다.")
                    } else {
                      NiceModal.show(UpdateMyWorksDialog, {
                        clientContractId: clientProjectContractId,
                        milestoneId,
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
              </Popover.Content>
            </Popover.Root>
          </Styled.Cell>
        )}

        {!excludeColumns.includes("task") && (
          <Styled.Cell>
            <Styled.Badge>{history.taskName}</Styled.Badge>
          </Styled.Cell>
        )}

        {!excludeColumns.includes("description") && (
          <Styled.Cell>
            <Text truncated={1}>{history.workDescription}</Text>
          </Styled.Cell>
        )}

        {!excludeColumns.includes("worker") && (
          <Styled.Cell>
            <HStack align="center" spacing="0.5rem">
              <UserProfile />
              <Text as="p">{history.projectWorker.name}</Text>
            </HStack>
          </Styled.Cell>
        )}

        {!excludeColumns.includes("date") && (
          <Styled.Cell>
            {format(new Date(history.workStartAt), "yyyy.MM.dd. E", {
              locale: ko,
            })}
          </Styled.Cell>
        )}

        {!excludeColumns.includes("startTime") && (
          <Styled.Cell>
            <HStack align="center" spacing="0.5rem" justify="end">
              {format(new Date(history.workStartAt), "HH:mm")}
              <Styled.TimeBadge>
                {format(new Date(history.workStartAt), "a")}
              </Styled.TimeBadge>
            </HStack>
          </Styled.Cell>
        )}

        {!excludeColumns.includes("endTime") && (
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
        )}

        {!excludeColumns.includes("workTime") && (
          <Styled.Cell>
            {history.workEndAt && (
              <Text as="p" align="right">
                {history.workTime} 시간
              </Text>
            )}
          </Styled.Cell>
        )}

        {!excludeColumns.includes("progress") && (
          <Styled.Cell>
            <HStack align="center" spacing="0.5rem" justify="center">
              {history.progressPercent && (
                <Styled.ProgressBadge>
                  {history.progressPercent}%
                </Styled.ProgressBadge>
              )}
            </HStack>
          </Styled.Cell>
        )}

        {!excludeColumns.includes("confirm") && (
          <Styled.Cell>
            <Styled.Checked
              data-active={history.isConfirmed}
              onClick={async () => {
                try {
                  const response = await updateConfirm()
                  if (response.data.isSuccess) {
                    queryClient.invalidateQueries({
                      queryKey: [...historiesQueryKey.all(), "history"],
                    })
                    toast.success("업데이트에 성공하였습니다.")
                  } else {
                    toast.error(
                      response.data.message ||
                        "알 수 없는 오류가 발생했습니다.",
                    )
                  }
                } catch (error) {
                  toast.error(
                    get(error, "message", "알 수 없는 오류가 발생했습니다."),
                  )
                }
              }}>
              <Checked />
            </Styled.Checked>
          </Styled.Cell>
        )}

        <Styled.Cell />
      </tr>
    </FormikProvider>
  )
}
