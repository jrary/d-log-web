import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useCreateMilestoneTaskMutation } from "@features/dashboard/projects/milestones/queries/useCreateMilestoneTaskMutation"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { useTaskStore } from "@features/dashboard/projects/wbs/stores/task"
import { useQueryClient } from "@tanstack/react-query"
import { FormikProvider, useFormik } from "formik"
import { useCallback, useEffect, useRef } from "react"
import Sub from "~icons/local/ic_sub2.svg"
import {
  SubIconBox,
  TaskCardInputContent,
  TaskCardInputWrapper,
} from "./index.styled"

export default function CreateTaskInput() {
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const isSubmittingRef = useRef(false)
  const { cancelCreatingTask, creatingMilestoneId } = useTaskStore()
  const clientProjectContractId = useProjectStore((state) =>
    state.getProjectContractId(),
  )
  const milestones = useMilestoneStore((state) => state.milestones)

  // 현재 생성 중인 마일스톤의 서버 ID 찾기
  const currentMilestone = milestones.find((m) => m.id === creatingMilestoneId)

  const { mutateAsync: createTaskMutation } = useCreateMilestoneTaskMutation(
    Number(clientProjectContractId),
    Number(currentMilestone?.id),
  )

  useEffect(() => {
    // 컴포넌트가 마운트되면 자동으로 포커스
    inputRef.current?.focus()
    requestAnimationFrame(() => {
      inputRef.current?.scrollIntoView({ behavior: "instant" })
    })
  }, [])

  const handleSubmit = useCallback(
    async (values: { taskName: string }) => {
      if (isSubmittingRef.current) return
      isSubmittingRef.current = true

      const trimmedTitle = values.taskName.trim()

      // 빈 데이터면 취소하고 사라지게 함
      if (!trimmedTitle) {
        cancelCreatingTask()
        isSubmittingRef.current = false
        return
      }

      if (!clientProjectContractId || !currentMilestone?.id) {
        isSubmittingRef.current = false
        return
      }

      try {
        const response = await createTaskMutation({
          taskName: trimmedTitle,
        })

        if (response.status) {
          await queryClient.invalidateQueries({
            queryKey: milestonesQueryKey.tasks(
              clientProjectContractId,
              Number(currentMilestone?.id),
              undefined,
            ),
          })
          cancelCreatingTask()
        }
      } catch (error) {
        // 실패 시 로컬 상태 처리
        console.error("태스크 생성 중 오류 발생:", error)
      } finally {
        isSubmittingRef.current = false
      }
    },
    [
      queryClient,
      cancelCreatingTask,
      createTaskMutation,
      clientProjectContractId,
      currentMilestone?.id,
    ],
  )

  const formik = useFormik({
    initialValues: {
      taskName: "",
    },
    onSubmit: handleSubmit,
  })

  const { getFieldProps, handleSubmit: formikHandleSubmit } = formik

  useEffect(() => {
    // 외부 클릭 이벤트 처리 - 빈 데이터면 취소하고 사라지게 함
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        const currentValue = formik.values.taskName.trim()

        if (!currentValue) {
          cancelCreatingTask()
        } else {
          formikHandleSubmit()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [formikHandleSubmit, formik.values.taskName, cancelCreatingTask])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (!isSubmittingRef.current) {
        formikHandleSubmit()
      }
    } else if (e.key === "Escape") {
      cancelCreatingTask()
    }
  }

  return (
    <FormikProvider value={formik}>
      <TaskCardInputWrapper>
        <SubIconBox>
          <Sub />
        </SubIconBox>
        <TaskCardInputContent
          ref={inputRef}
          onKeyDown={handleKeyDown}
          placeholder="태스크를 입력해 주세요."
          {...getFieldProps("taskName")}
        />
      </TaskCardInputWrapper>
    </FormikProvider>
  )
}
