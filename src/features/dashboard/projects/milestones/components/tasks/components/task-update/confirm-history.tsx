import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { useGetProjectConfirmHistoryQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/useGetProjectConfirmHistoryQueryObject"
import { usePatchProjectConfirmHistoryQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/usePatchProjectConfirmHistoryQueryObject"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import Icon from "~icons/local/ic_dashboard_message"
import * as Styled from "./confirm-history.styled"
import type { ProjectMilestoneTaskHistoryListDto } from "@apis/model"

const TEXT = {
  title: "컨펌 히스토리",
  button: {
    modify: "수정중으로 변경",
    confirm: "컨펌하기",
  },
}
export default function ConfirmHistory() {
  const { clientProjectContractId } = useParams<{
    clientProjectContractId: string
  }>()
  const { milestoneId } = useParams<{ milestoneId: string }>()
  const { taskId } = useParams<{ taskId: string }>()

  const { data: confirmList } = useQuery(
    useGetProjectConfirmHistoryQueryObject(
      Number(clientProjectContractId),
      Number(milestoneId),
      Number(taskId),
    ),
  )

  const { mutateAsync: patchStatus } = usePatchProjectConfirmHistoryQueryObject(
    Number(clientProjectContractId),
    Number(milestoneId),
    Number(taskId),
  )

  const queryClient = useQueryClient()

  const handlePatchStatus = async (status: "EDITING" | "DONE") => {
    try {
      await patchStatus({ taskStatus: status })
      queryClient.invalidateQueries({
        queryKey: [...dashboardTaskQueryKey.all(), "confirm-history"],
      })
      queryClient.invalidateQueries({
        queryKey: [...dashboardTaskQueryKey.all(), "task"],
      })
    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  return (
    <Styled.Container>
      {/* 타이틀 */}
      <HStack spacing="0.62rem">
        <Icon />
        <Styled.Title>{TEXT.title}</Styled.Title>
      </HStack>

      <Styled.ListContainer>
        {/* 컨펌 내역 리스트 */}
        <VStack spacing="1rem">
          {/* 컨펌 내역 아이템 */}
          {confirmList?.map((item, idx) => (
            <ConfirmHistoryItem key={idx} item={item} />
          ))}
        </VStack>

        {/* 컨펌 내역 하단 버튼 */}
        <HStack spacing="1rem">
          <Styled.HistoryButton onClick={() => handlePatchStatus("EDITING")}>
            <Text typo="body1" color="DEFAULT">
              {TEXT.button.modify}
            </Text>
          </Styled.HistoryButton>
          <Styled.HistoryButton onClick={() => handlePatchStatus("DONE")}>
            <Text typo="body1" color="DEFAULT">
              {TEXT.button.confirm}
            </Text>
          </Styled.HistoryButton>
        </HStack>
      </Styled.ListContainer>
    </Styled.Container>
  )
}

type ConfirmHistoryItemProps = {
  item: ProjectMilestoneTaskHistoryListDto
}

function ConfirmHistoryItem({ item }: ConfirmHistoryItemProps) {
  function formatDate(date?: string) {
    if (!date) return " - "

    const dateObject = new Date(date)
    if (String(dateObject) === "Invalid Date") return date
    return `${dateObject.getFullYear()}.${String(dateObject.getMonth() + 1).padStart(2, "0")}.${String(dateObject.getDate()).padStart(2, "0")}`
  }

  function getStatusText(status?: string) {
    switch (status) {
      case "IN_PROGRESS":
        return "태스크가 생성되었습니다."
      case "EDITING":
        return "수정중으로 변경되었습니다."
      case "DONE":
        return "컨펌이 완료되었습니다."
      default:
        return "상태가 변경되었습니다."
    }
  }

  return (
    <Styled.Item>
      <Text typo="body1" color="DEFAULT">
        {`${formatDate(item.updatedDate)}에 ${getStatusText(item.taskStatus)}`}
      </Text>
    </Styled.Item>
  )
}
