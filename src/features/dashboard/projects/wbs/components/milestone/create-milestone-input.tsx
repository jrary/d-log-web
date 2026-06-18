import { useCreateMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useCreateMilestoneMutation"
import { useMilestoneStore } from "@features/dashboard/projects/wbs/stores/milestone"
import useProjectStore from "@features/dashboard/projects/wbs/stores/project"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { FormikProvider, useFormik } from "formik"
import { useCallback, useEffect, useRef } from "react"
import {
  MilestoneCardInputContent,
  MilestoneCardInputWrapper,
} from "./index.styled"

// CreateMilestoneInput 컴포넌트 - 마일스톤 생성 전용
export function CreateMilestoneInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  const isSubmittingRef = useRef(false)
  const { cancelCreating } = useMilestoneStore()
  const projectId = useProjectStore((state) => state.getProjectContractId())
  const queryClient = useQueryClient()
  const createMilestoneMutation = useCreateMilestoneMutation(Number(projectId))

  useEffect(() => {
    // 컴포넌트가 마운트되면 자동으로 포커스
    inputRef.current?.focus()
    requestAnimationFrame(() => {
      inputRef.current?.scrollIntoView({ behavior: "instant" })
    })
  }, [])

  const handleSubmit = useCallback(
    async (values: { milestoneName: string }) => {
      if (isSubmittingRef.current) return
      isSubmittingRef.current = true

      if (!projectId) {
        isSubmittingRef.current = false
        return
      }
      const trimmedName = values.milestoneName.trim()

      // 빈 데이터면 취소하고 사라지게 함
      if (!trimmedName) {
        cancelCreating()
        isSubmittingRef.current = false
        return
      }

      try {
        const response = await createMilestoneMutation.mutateAsync({
          milestoneName: trimmedName,
          milestoneObjective: "",
        })

        if (response.status) {
          await queryClient.invalidateQueries({
            queryKey: dashboardQueryKey.milestones(projectId),
          })
          cancelCreating()
        }
      } catch (error) {
        console.error("마일스톤 생성 중 오류 발생:", error)
      } finally {
        isSubmittingRef.current = false
      }
    },
    [cancelCreating, createMilestoneMutation, projectId, queryClient],
  )

  const formik = useFormik({
    initialValues: {
      milestoneName: "",
    },
    onSubmit: handleSubmit,
  })

  const { getFieldProps, handleSubmit: formikHandleSubmit } = formik

  useEffect(() => {
    // 외부 클릭 이벤트 처리 - 빈 데이터면 취소하고 사라지게 함
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        const currentValue = formik.values.milestoneName.trim()

        if (!currentValue) {
          cancelCreating()
        } else {
          formikHandleSubmit()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [formikHandleSubmit, formik.values.milestoneName, cancelCreating])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (!isSubmittingRef.current) {
        formikHandleSubmit()
      }
    } else if (e.key === "Escape") {
      cancelCreating()
    }
  }

  return (
    <FormikProvider value={formik}>
      <MilestoneCardInputWrapper>
        <MilestoneCardInputContent
          ref={inputRef}
          onKeyDown={handleKeyDown}
          placeholder="마일스톤명을 입력해 주세요."
          {...getFieldProps("milestoneName")}
        />
      </MilestoneCardInputWrapper>
    </FormikProvider>
  )
}
