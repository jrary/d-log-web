import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { show } from "@ebay/nice-modal-react"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { useDeleteProjectTaskMutation } from "@features/dashboard/projects/milestones/components/tasks/queries/useDeleteProjectTaskMutation"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { WbsModal } from "@features/dashboard/projects/wbs/components/shared/wbs-modal"
import WbsPopoverMenu from "@features/dashboard/projects/wbs/components/shared/wbs-popover"
import wbsToast from "@features/dashboard/projects/wbs/components/shared/wbs-toast"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { useTaskStore } from "@features/dashboard/projects/wbs/stores/task"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import Sub from "~icons/local/ic_sub2.svg"
import EditTaskInput from "./edit-task-input"
import { SubIconBox, TaskCardWrapper, Title, TitleButton } from "./index.styled"
import type {
  MilestoneViewModel,
  TaskViewModel,
} from "@features/dashboard/projects/wbs/types"

type TaskCardProps = {
  milestone: MilestoneViewModel
  task: TaskViewModel
}

export default function TaskCard({ milestone, task }: TaskCardProps) {
  const navigate = useNavigate()
  const { title, progress, date, id } = task
  const { startEditingTask, isEditingTask, editingTaskId } = useTaskStore()
  const clientProjectContractId = useProjectStore((state) =>
    state.getProjectContractId(),
  )

  const queryClient = useQueryClient()

  const { mutateAsync: deleteTaskMutation } = useDeleteProjectTaskMutation()

  const isEditingThisTask = isEditingTask && editingTaskId === id

  const handleClick = () => {
    navigate(`${milestone.id}/tasks/${id}`)
  }

  const handleEdit = () => {
    startEditingTask(id)
  }

  const handleDelete = async () => {
    if (!clientProjectContractId || !milestone.id) return

    // TODO: 작업기록 기능 추가 후 구현
    // if (true) {
    //   show(WbsModal, {
    //     title: "작업 기록이 존재할 때는\n태스크 삭제가 불가능해요!",
    //     primaryButtonText: "확인",
    //   })
    //   return
    // }

    show(WbsModal, {
      title: "태스크를 삭제하시겠어요?",
      primaryButtonText: "삭제",
      onPrimaryButtonClick: async () => {
        try {
          await deleteTaskMutation({
            clientProjectContractId,
            milestoneId: milestone.id,
            taskId: id,
          })

          // 쿼리 무효화
          queryClient.invalidateQueries({
            queryKey: milestonesQueryKey.tasks(
              clientProjectContractId,
              milestone.id,
              undefined,
            ),
          })

          queryClient.invalidateQueries({
            queryKey: [...dashboardTaskQueryKey.all(), "task"],
          })

          wbsToast.success("태스크가 삭제되었습니다.")

          // URL이 tasks/:taskId 패턴인 경우 뒤로가기
          const pathname = window.location.pathname
          if (pathname.includes(`/tasks/${id}`)) {
            navigate(-1)
          }
        } catch (error) {
          wbsToast.error("태스크 삭제 중 오류가 발생했습니다.")
          console.error("태스크 삭제 중 오류 발생:", error)
        }
      },
      secondaryButtonText: "취소",
    })
  }

  return (
    <>
      {isEditingThisTask ? (
        <EditTaskInput milestone={milestone} task={task} />
      ) : (
        <TaskCardWrapper className={`task-card-${id}`}>
          <SubIconBox>
            <Sub />
          </SubIconBox>
          <TitleButton onClick={handleClick}>
            <Title typo="body3" weight="regular">
              {title}
            </Title>
          </TitleButton>
          <Text typo="caption" weight="medium" color={COLOR.NEUTRAL_500}>
            {date ? `${progress}%` : "기간을 설정해 주세요."}
          </Text>
          <WbsPopoverMenu
            editName="태스크명 수정"
            onEdit={handleEdit}
            onRemove={handleDelete}
          />
        </TaskCardWrapper>
      )}
    </>
  )
}
