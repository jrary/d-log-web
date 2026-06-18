import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { usePutProjectTaskDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/usePutProjectTaskDetailQueryObject"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import wbsToast from "@features/dashboard/projects/wbs/components/shared/wbs-toast"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { useTaskStore } from "@features/dashboard/projects/wbs/stores/task"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { FormikProvider, useFormik } from "formik"
import { useCallback, useEffect, useRef } from "react"
import Sub from "~icons/local/ic_sub2.svg"
import {
  SubIconBox,
  TaskCardEditWrapper,
  TaskCardInputContent,
  TaskCardInputWrapper,
} from "./index.styled"
import type {
  MilestoneViewModel,
  TaskViewModel,
} from "@features/dashboard/projects/wbs/types"

// EditTaskInput 컴포넌트 - 태스크 편집 전용
type EditTaskInputProps = {
  milestone: MilestoneViewModel
  task: TaskViewModel
}

export default function EditTaskInput({ milestone, task }: EditTaskInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { cancelEditingTask } = useTaskStore()
  const projectId = useProjectStore((state) => state.getProjectContractId())
  const queryClient = useQueryClient()

  // 업데이트 뮤테이션 생성
  const updateTaskMutation = usePutProjectTaskDetailQueryObject(
    Number(projectId),
    Number(milestone.id),
    Number(task.id),
  )

  const handleSubmit = useCallback(
    async (values: { taskName: string }) => {
      const trimmedTitle = values.taskName.trim()

      // 빈 데이터면 취소하고 사라지게 함
      if (!trimmedTitle) {
        cancelEditingTask()
        return
      }

      // 이름이 변경되지 않았다면 API 호출 없이 편집 모드 종료
      if (trimmedTitle === task.title) {
        cancelEditingTask()
        return
      }

      // 서버 ID들이 있을 경우에만 서버에 저장 시도
      if (!projectId || !milestone.id) return

      try {
        const response = await updateTaskMutation.mutateAsync({
          taskName: trimmedTitle,
          expectedStartDate: task.date
            ? format(task.date.startDate, "yyyy-MM-dd")
            : undefined,
          expectedEndDate: task.date
            ? format(task.date.endDate, "yyyy-MM-dd")
            : undefined,
          projectWorkerIdList:
            task.projectWorkerList?.map((worker) => worker.id) ?? [],
        })

        if (response.status) {
          await queryClient.invalidateQueries({
            queryKey: milestonesQueryKey.tasks(
              Number(projectId),
              Number(milestone.id),
              undefined,
            ),
          })

          await queryClient.invalidateQueries({
            queryKey: dashboardTaskQueryKey.taskDetail(projectId, task.id),
          })
        }
        cancelEditingTask()
      } catch (error) {
        console.error("태스크 수정 중 오류 발생:", error)
        cancelEditingTask()
        wbsToast.error("태스크 수정 중 오류가 발생했습니다.")
      }
    },
    [
      projectId,
      milestone.id,
      task,
      updateTaskMutation,
      cancelEditingTask,
      queryClient,
    ],
  )

  const formik = useFormik({
    initialValues: {
      taskName: task.title || "",
    },
    onSubmit: handleSubmit,
  })

  const { getFieldProps, handleSubmit: formikHandleSubmit } = formik

  useEffect(() => {
    // 컴포넌트가 마운트되면 자동으로 포커스
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    // 외부 클릭 이벤트 처리 - 빈 데이터면 취소하고 사라지게 함
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        const currentValue = formik.values.taskName.trim()

        if (!currentValue) {
          cancelEditingTask()
        } else {
          formikHandleSubmit()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [formikHandleSubmit, formik.values.taskName, cancelEditingTask])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      formikHandleSubmit()
    } else if (e.key === "Escape") {
      cancelEditingTask()
    }
  }

  return (
    <FormikProvider value={formik}>
      <TaskCardEditWrapper>
        <TaskCardInputWrapper>
          <SubIconBox>
            <Sub />
          </SubIconBox>
          <TaskCardInputContent
            ref={inputRef}
            onKeyDown={handleKeyDown}
            placeholder="태스크 이름을 입력하세요"
            {...getFieldProps("taskName")}
          />
        </TaskCardInputWrapper>
      </TaskCardEditWrapper>
    </FormikProvider>
  )
}
