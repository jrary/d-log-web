import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { show } from "@ebay/nice-modal-react"
import { useDeleteMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useDeleteMilestoneMutation"
import { IconButton } from "@features/dashboard/projects/wbs/components/shared/index.styled"
import { WbsModal } from "@features/dashboard/projects/wbs/components/shared/wbs-modal"
import WbsPopoverMenu from "@features/dashboard/projects/wbs/components/shared/wbs-popover"
import wbsToast from "@features/dashboard/projects/wbs/components/shared/wbs-toast"
import CreateTaskInput from "@features/dashboard/projects/wbs/components/task/create-task-input"
import TaskCard from "@features/dashboard/projects/wbs/components/task/task-card"
import useGetMilestoneCardHeight from "@features/dashboard/projects/wbs/components/timeline/hooks/useGetMilestoneCardHeight"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { useTaskStore } from "@features/dashboard/projects/wbs/stores/task"
import {
  formatDate,
  getDaysDifference,
} from "@features/dashboard/projects/wbs/utils/date"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useNavigate } from "react-router"
import ArrowRight from "~icons/local/ic_arrow_right"
import Calendar from "~icons/local/ic_calendar"
import Plus from "~icons/local/ic_plus"
import EditMilestoneInput from "./edit-milestone-input"
import {
  AnimatedContainer,
  DateTextWrapper,
  Header,
  MilestoneCardContent,
  MilestoneCardInfoBox,
  MilestoneCardWrapper,
  RotatedIconButton,
  StyledActionBox,
  Title,
  TitleBox,
} from "./index.styled"
import type { MilestoneViewModel } from "@features/dashboard/projects/wbs/types"

type MilestoneCardProps = {
  milestone: MilestoneViewModel
}

export default function MilestoneCard({ milestone }: MilestoneCardProps) {
  const { id, name, date, tasks, isOpenTasks, progressPercent } = milestone
  const isCreatingTask = useTaskStore((state) => state.isCreatingTask)
  const creatingMilestoneId = useTaskStore((state) => state.creatingMilestoneId)
  const isEditing = useMilestoneStore((state) => state.isEditing)
  const editingMilestoneId = useMilestoneStore(
    (state) => state.editingMilestoneId,
  )
  const { updateMilestone } = useMilestoneStore()
  const milestoneCardHeight = useGetMilestoneCardHeight(milestone)

  const isCreatingTaskForThisMilestone =
    isCreatingTask && creatingMilestoneId === id

  const isEditingThisMilestone = isEditing && editingMilestoneId === id

  const handleToggleOpenTasks = () => {
    updateMilestone(id, { isOpenTasks: !isOpenTasks })
  }

  return (
    <>
      {isEditingThisMilestone ? (
        <EditMilestoneInput
          height={milestoneCardHeight ?? undefined}
          milestone={milestone}
        />
      ) : (
        <MilestoneCardWrapper className={`milestone-card-${id}`}>
          <RotatedIconButton
            className={isOpenTasks ? "open" : ""}
            onClick={handleToggleOpenTasks}>
            <ArrowRight width={12} height={12} color={COLOR.NEUTRAL_600} />
          </RotatedIconButton>
          <MilestoneCardContent>
            <MilestoneCardInfoBox>
              <HeaderBox id={id} name={name} />
              <DateBox date={date} />
            </MilestoneCardInfoBox>
            {date && (
              <TaskInfoBox tasks={tasks} progressPercent={progressPercent} />
            )}
          </MilestoneCardContent>
          <ActionBox milestone={milestone} />
        </MilestoneCardWrapper>
      )}
      <AnimatedContainer className={isOpenTasks ? "" : "hidden"}>
        {tasks.map((task) => (
          <TaskCard key={task.id} milestone={milestone} task={task} />
        ))}
        {isCreatingTaskForThisMilestone && <CreateTaskInput />}
      </AnimatedContainer>
    </>
  )
}
const HeaderBox = ({ id, name }: Pick<MilestoneViewModel, "id" | "name">) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${id}`)
  }

  return (
    <Header onClick={handleClick}>
      <TitleBox>
        <Title typo="body3" weight="regular">
          {name}
        </Title>
      </TitleBox>
    </Header>
  )
}
const DateBox = ({ date }: Pick<MilestoneViewModel, "date">) => {
  const dateRangeText = useMemo(
    () =>
      date
        ? `${formatDate(date.startDate)}~${formatDate(date.endDate)} (${getDaysDifference(date.startDate, date.endDate)}일)`
        : "기간을 설정해 주세요.",
    [date],
  )

  return (
    <DateTextWrapper>
      <Calendar width={14} height={14} color={COLOR.NEUTRAL_500} />
      <Text typo="caption" weight="regular" color={COLOR.NEUTRAL_600}>
        {dateRangeText}
      </Text>
    </DateTextWrapper>
  )
}

const TaskInfoBox = ({
  tasks,
  progressPercent,
}: Pick<MilestoneViewModel, "tasks" | "progressPercent">) => {
  if (tasks.length === 0)
    return (
      <Text typo="caption" weight="medium" color={COLOR.NEUTRAL_500}>
        태스크를 추가해 주세요.
      </Text>
    )
  return (
    <Text
      typo="caption"
      weight="medium"
      color={progressPercent > 0 ? COLOR.GREEN_500 : COLOR.NEUTRAL_600}>
      진행률 {progressPercent.toFixed(0)}%
    </Text>
  )
}

const ActionBox = ({ milestone }: MilestoneCardProps) => {
  const { id } = milestone
  const { startEditing, updateMilestone } = useMilestoneStore()
  const { startCreatingTask } = useTaskStore()
  const milestones = useMilestoneStore((state) => state.milestones)
  const clientProjectContractId = useProjectStore((state) =>
    state.getProjectContractId(),
  )
  const deleteMilestoneMutation = useDeleteMilestoneMutation()
  const queryClient = useQueryClient()

  const handleAddTask = () => {
    const currentMilestone = milestones.find((milestone) => milestone.id === id)

    if (currentMilestone && !currentMilestone.isOpenTasks) {
      updateMilestone(id, { isOpenTasks: true })
    }

    startCreatingTask(id)
  }

  const handleEdit = () => {
    startEditing(id)
  }

  const handleDelete = async () => {
    if (!clientProjectContractId) return
    // TODO: 작업기록 기능 추가 후 구현
    // if (tasks.length > 0) {
    //   show(WbsModal, {
    //     title: "작업 기록이 존재할 때는\n마일스톤 삭제가 불가능해요!",
    //     primaryButtonText: "확인",
    //   })
    //   return
    // }

    show(WbsModal, {
      title: "마일스톤을 삭제하시겠어요?",
      description: `하위 태스크도 전부 삭제됩니다.`,
      primaryButtonText: "삭제",
      onPrimaryButtonClick: async () => {
        try {
          await deleteMilestoneMutation.mutate({
            clientProjectContractId,
            milestoneId: Number(id),
          })

          //TODO: 쿼리 무효화가 안되고 있어서, setTimeout으로 임시처리
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: dashboardQueryKey.milestones(clientProjectContractId),
            })
          }, 100)

          wbsToast.success("마일스톤이 삭제되었습니다.")
        } catch (error) {
          console.error(error)
        }
      },
      secondaryButtonText: "취소",
    })
  }

  return (
    <StyledActionBox>
      {milestone.date && (
        <IconButton onClick={handleAddTask}>
          <Plus width={12} height={12} color={COLOR.NEUTRAL_600} />
        </IconButton>
      )}
      <WbsPopoverMenu
        editName="마일스톤명 수정"
        onEdit={handleEdit}
        onRemove={handleDelete}
      />
    </StyledActionBox>
  )
}
