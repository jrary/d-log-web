import { MilestoneFields } from "@features/dashboard/projects/milestones/components/form"
import { MilestoneTaskField } from "@features/dashboard/projects/milestones/components/form/fields/milestone-task"
import { Navigation } from "@features/dashboard/projects/milestones/components/form/navigation"
import * as Styled from "@features/dashboard/projects/milestones/components/form/styled"
import { useMilestoneForm } from "@features/dashboard/projects/milestones/hooks/useMilestoneForm"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useGetMilestoneDetailQueryObject } from "@features/dashboard/projects/milestones/queries/useGetMilestoneDetailQueryObject"
import { useUpdateMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useUpdateMilestoneMutation"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import { FormikProvider } from "formik"
import { Suspense } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import type { PatchProjectMilestoneRequest } from "@apis/model"

export default function MilestoneEditPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)

  const { data: milestone, isLoading } = useSuspenseQuery(
    useGetMilestoneDetailQueryObject(clientProjectContractId, milestoneId),
  )
  const { mutateAsync: updateMilestone } = useUpdateMilestoneMutation(
    clientProjectContractId,
    milestoneId,
  )

  const formik = useMilestoneForm({
    initialValues: milestone,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          milestoneObjective: values.milestoneObjective ?? undefined,
        } as PatchProjectMilestoneRequest

        if (values.milestoneStartDate === null) {
          payload.milestoneStartDate = undefined
        }
        if (values.milestoneEndDate === null) {
          payload.milestoneEndDate = undefined
        }

        const response = await updateMilestone(payload)
        if (response.status) {
          toast.success("마일스톤 정보가 수정되었습니다.")
          await queryClient.invalidateQueries({
            queryKey: milestonesQueryKey.list(clientProjectContractId),
          })
          await queryClient.invalidateQueries({
            queryKey: dashboardQueryKey.milestones(clientProjectContractId),
          })
          await queryClient.invalidateQueries({
            queryKey: milestonesQueryKey.detail(
              clientProjectContractId,
              milestoneId,
            ),
          })
          navigate("..")
        }
      } catch (error) {
        toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  if (isLoading) return <div>loading...</div>

  return (
    <Suspense fallback={<div>fallback...</div>}>
      <FormikProvider value={formik}>
        <Styled.Form>
          <Navigation isSubmitDisabled={!formik.isValid || !formik.dirty} />
          <MilestoneFields />
        </Styled.Form>
        <MilestoneTaskField />
      </FormikProvider>
    </Suspense>
  )
}
