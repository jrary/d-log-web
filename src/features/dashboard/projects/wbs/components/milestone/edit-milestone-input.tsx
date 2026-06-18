import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useUpdateMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useUpdateMilestoneMutation"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { get } from "es-toolkit/compat"
import { FormikProvider, useFormik } from "formik"
import { useCallback, useEffect, useRef } from "react"
import toast from "react-hot-toast"
import {
  MilestoneCardInputContent,
  MilestoneCardInputWrapper,
  MilestoneEditInputWrapper,
} from "./index.styled"
import type { MilestoneViewModel } from "@features/dashboard/projects/wbs/types"

// EditMilestoneInput 컴포넌트 - 마일스톤 편집 전용
type EditMilestoneInputProps = {
  milestone: MilestoneViewModel
  height?: number
}

export default function EditMilestoneInput({
  milestone,
  height,
}: EditMilestoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { submitEditMilestone, cancelEditing } = useMilestoneStore()
  const clientProjectContractId = useProjectStore((state) =>
    state.getProjectContractId(),
  )
  const queryClient = useQueryClient()

  const { mutateAsync: updateMilestone } = useUpdateMilestoneMutation(
    clientProjectContractId || 0,
    Number(milestone.id) || 0,
  )

  const handleUpdateMilestone = useCallback(
    async (milestoneName: string) => {
      if (
        !clientProjectContractId ||
        !milestone.id ||
        !milestone.date?.startDate ||
        !milestone.date?.endDate
      ) {
        return
      }

      try {
        // 현재 마일스톤 정보 가져오기
        const milestones = useMilestoneStore.getState().milestones
        const currentMilestone = milestones.find((m) => m.id === milestone.id)

        if (!currentMilestone) {
          return
        }

        const response = await updateMilestone({
          milestoneName,
          milestoneObjective: milestone.objective,
          milestoneStartDate: format(milestone.date.startDate, "yyyy-MM-dd"),
          milestoneEndDate: format(milestone.date.endDate, "yyyy-MM-dd"),
        })

        if (response.status) {
          // 쿼리 무효화
          await queryClient.invalidateQueries({
            queryKey: dashboardQueryKey.milestones(clientProjectContractId),
          })
          await queryClient.invalidateQueries({
            queryKey: milestonesQueryKey.detail(
              clientProjectContractId,
              milestone.id,
            ),
          })
          submitEditMilestone(milestoneName)
        }
      } catch (error) {
        toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
    [
      clientProjectContractId,
      milestone,
      updateMilestone,
      submitEditMilestone,
      queryClient,
    ],
  )

  const handleSubmit = useCallback(
    async (values: { milestoneName: string }) => {
      const trimmedName = values.milestoneName.trim()

      // 빈 데이터면 취소하고 사라지게 함
      if (!trimmedName) {
        cancelEditing()
        return
      }

      // 이름이 변경되지 않았다면 API 호출 없이 편집 모드 종료
      if (trimmedName === milestone.name) {
        cancelEditing()
        return
      }

      if (clientProjectContractId) {
        // API를 통한 업데이트 실행
        handleUpdateMilestone(trimmedName)
      } else {
        // 로컬 상태만 업데이트
        submitEditMilestone(trimmedName)
      }
    },
    [
      clientProjectContractId,
      submitEditMilestone,
      cancelEditing,
      handleUpdateMilestone,
      milestone,
    ],
  )

  const formik = useFormik({
    initialValues: {
      milestoneName: milestone.name || "",
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
        const currentValue = formik.values.milestoneName.trim()

        if (!currentValue) {
          cancelEditing()
        } else {
          formikHandleSubmit()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [formikHandleSubmit, formik.values.milestoneName, cancelEditing])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      formikHandleSubmit()
    } else if (e.key === "Escape") {
      cancelEditing()
    }
  }

  return (
    <FormikProvider value={formik}>
      <MilestoneEditInputWrapper style={height ? { height } : undefined}>
        <MilestoneCardInputWrapper>
          <MilestoneCardInputContent
            ref={inputRef}
            onKeyDown={handleKeyDown}
            placeholder="마일스톤 이름을 입력하세요"
            {...getFieldProps("milestoneName")}
          />
        </MilestoneCardInputWrapper>
      </MilestoneEditInputWrapper>
    </FormikProvider>
  )
}
