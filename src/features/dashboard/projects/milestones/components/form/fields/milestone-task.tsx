import { renderErrorText } from "@components/form/form-control"
import { TextField } from "@components/form/text-field"
import * as Popover from "@components/popover.styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { TEXT } from "@components/shared-components/tokens/color"
import { show } from "@ebay/nice-modal-react"
import { DeleteMilestoneTaskCheckModal } from "@features/dashboard/projects/milestones/components/modals/delete-task-check"
import { useGetProjectTaskDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/useGetProjectTaskDetailQueryObject"
import { usePutProjectTaskDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/usePutProjectTaskDetailQueryObject"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useCreateMilestoneTaskMutation } from "@features/dashboard/projects/milestones/queries/useCreateMilestoneTaskMutation"
import { useGetTasksQueryObject } from "@features/dashboard/projects/my-works/queries/useGetTasksQueryObject"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import { ErrorMessage } from "formik"
import { Suspense, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import Add from "~icons/local/ic_add"
import TaskIcon from "~icons/local/ic_dashboard_task"
import Edit from "~icons/local/ic_edit"
import More from "~icons/local/ic_more"
import Profile from "~icons/local/ic_task_profile"
import ProfileEmpty from "~icons/local/ic_task_profile_empty"
import Trash from "~icons/local/ic_trash"
import * as Styled from "./milestone-task.styled"

export function MilestoneTaskField() {
  return (
    <Styled.Field>
      <HStack height="1.75rem" />
      <Styled.Label>
        <TaskIcon color="#8C8E97" />
        <VStack spacing="0.38rem">
          <Text typo="body1" color="DEFAULT">
            하위 태스크
          </Text>
        </VStack>
      </Styled.Label>

      <Styled.Tasks>
        <Suspense>
          <Tasks />
        </Suspense>
        <CreateTask />
      </Styled.Tasks>
      <ErrorMessage name="taskList" render={renderErrorText} />
    </Styled.Field>
  )
}

// 기본 태스크 목록
function Tasks() {
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)

  const { data: tasks } = useQuery({
    ...useGetTasksQueryObject(clientProjectContractId, milestoneId, undefined),
  })

  return tasks?.map((task) => (
    <Task key={task.id} taskId={task.id} label={task.taskName} />
  ))
}

// 태스크 추가 관련 (창 + 버튼)
function CreateTask() {
  const [value, setValue] = useState("")
  const [shouldCreateTask, setShouldCreateTask] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const queryClient = useQueryClient()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)

  const { mutateAsync: createMilestoneTask } = useCreateMilestoneTaskMutation(
    clientProjectContractId,
    milestoneId,
  )

  async function triggerSubmit() {
    if (value.length === 0) {
      return
    }

    try {
      await createMilestoneTask({
        taskName: value,
      })

      await queryClient.invalidateQueries({
        queryKey: milestonesQueryKey.tasks(
          clientProjectContractId,
          milestoneId,
          undefined,
        ),
      })

      setShouldCreateTask(false)
      setValue("")
    } catch (e) {
      toast.error(get(e, "message", "알 수 없는 오류가 발생했습니다."))
    }
  }

  useEffect(() => {
    if (shouldCreateTask) {
      inputRef.current?.focus()
    }
  }, [shouldCreateTask])

  return (
    <VStack spacing="0.62rem">
      {shouldCreateTask && (
        <Styled.CreateTask>
          <TextField.Root>
            <TextField.Control
              as="textarea"
              rows={1}
              ref={inputRef}
              placeholder="태스크를 입력해 주세요."
              onKeyDown={async (
                e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => {
                if (e.nativeEvent.isComposing) {
                  return
                }
                if (e.key === "Enter") {
                  e.preventDefault()
                  await triggerSubmit()
                }
              }}
              onBlur={async () => {
                await triggerSubmit()
              }}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = target.scrollHeight + "px"
              }}
            />
          </TextField.Root>
        </Styled.CreateTask>
      )}
      <Styled.AddButton
        onClick={() => {
          if (!shouldCreateTask) {
            setShouldCreateTask(true)
            return
          }
        }}>
        <Text typo="body1" color="DEFAULT">
          하위 태스크 추가
        </Text>
        <Add />
      </Styled.AddButton>
    </VStack>
  )
}

type TaskProps = {
  label: string
  taskId: number
}
// 태스크 아이템
function Task({ label, taskId }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(label)

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)

  const { data: taskData } = useQuery(
    useGetProjectTaskDetailQueryObject(clientProjectContractId, taskId),
  )
  const { mutateAsync: updateMilestoneTask } =
    usePutProjectTaskDetailQueryObject(
      clientProjectContractId,
      milestoneId,
      taskId,
    )

  async function triggerEditSubmit() {
    if (editValue.length === 0) {
      setEditValue(label)
      setIsEditing(false)
      return
    }

    await updateMilestoneTask({
      ...taskData,
      projectWorkerIdList:
        taskData?.projectWorkerList?.map((worker) => worker.id) ?? [],
      taskName: editValue,
    })

    await queryClient.invalidateQueries({
      queryKey: milestonesQueryKey.tasks(
        clientProjectContractId,
        milestoneId,
        undefined,
      ),
    })

    setIsEditing(false)
    setEditValue("")
  }

  return isEditing ? (
    // 태스크 수정 상태
    <Styled.CreateTask>
      <TextField.Root>
        <TextField.Control
          as="textarea"
          rows={1}
          placeholder="태스크를 입력해 주세요."
          value={editValue}
          onKeyDown={async (
            e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            if (e.nativeEvent.isComposing) {
              return
            }
            if (e.key === "Enter") {
              e.preventDefault()
              await triggerEditSubmit()
            }
          }}
          onBlur={async () => {
            await triggerEditSubmit()
          }}
          onChange={(e) => {
            setEditValue(e.target.value)
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = "auto"
            target.style.height = target.scrollHeight + "px"
          }}
        />
      </TextField.Root>
    </Styled.CreateTask>
  ) : (
    // 기본 상태
    <Styled.Task onClick={() => navigate(`tasks/${taskId}`)}>
      <Text typo="body1">{label}</Text>
      <HStack spacing="0.5rem">
        {taskData?.projectWorkerList?.length ? <Profile /> : <ProfileEmpty />}
        <PopoverMenu
          defaultValue={!taskData?.milestoneName}
          onEdit={() => {
            setEditValue(label)
            setIsEditing(true)
          }}
          onRemove={() =>
            show(DeleteMilestoneTaskCheckModal, {
              taskId,
            })
          }
        />
      </HStack>
    </Styled.Task>
  )
}

type MenuProps = {
  defaultValue: boolean
  onEdit: () => void
  onRemove: () => void
}
// 태스크 관리 메뉴 Popover (수정, 삭제)
function PopoverMenu({ defaultValue, onEdit, onRemove }: MenuProps) {
  return (
    <Popover.Root>
      <Popover.Trigger onClick={(e) => e.stopPropagation()}>
        <Styled.TriggerButton>
          <More />
        </Styled.TriggerButton>
      </Popover.Trigger>
      <Popover.Content
        sideOffset={8}
        align="end"
        onClick={(e) => e.stopPropagation()}>
        <Styled.MenuActionButton
          disabled={defaultValue}
          onClick={() => onEdit()}>
          <Edit width="1.25rem" height="1.25rem" color={TEXT.SECONDARY} />
          <Text typo="body3" color="SECONDARY">
            태스크명 수정
          </Text>
        </Styled.MenuActionButton>
        <Styled.MenuActionButton
          disabled={defaultValue}
          onClick={() => onRemove()}>
          <Trash width="1.25rem" height="1.25rem" color={TEXT.DANGER} />
          <Text color="DANGER">삭제</Text>
        </Styled.MenuActionButton>
      </Popover.Content>
    </Popover.Root>
  )
}
