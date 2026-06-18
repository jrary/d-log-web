import { MilestoneFields } from "@features/dashboard/projects/milestones/components/form"
import { Navigation } from "@features/dashboard/projects/milestones/components/form/navigation"
import * as Styled from "@features/dashboard/projects/milestones/components/form/styled"
import { useMilestoneForm } from "@features/dashboard/projects/milestones/hooks/useMilestoneForm"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useCreateMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useCreateMilestoneMutation"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import { FormikProvider } from "formik"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"

export default function MilestoneCreatePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const { mutateAsync: createMilestone } = useCreateMilestoneMutation(
    clientProjectContractId,
  )

  const formik = useMilestoneForm({
    onSubmit: async (values) => {
      try {
        const response = await createMilestone({
          ...values,
          milestoneStartDate: values.milestoneStartDate ?? undefined,
          milestoneEndDate: values.milestoneEndDate ?? undefined,
        })
        if (response.status) {
          toast.success("마일스톤이 추가되었습니다.")
          await queryClient.invalidateQueries({
            queryKey: milestonesQueryKey.list(clientProjectContractId),
          })
          await queryClient.invalidateQueries({
            queryKey: dashboardQueryKey.milestones(clientProjectContractId),
          })
          navigate("..")
        }
      } catch (error) {
        toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  return (
    <FormikProvider value={formik}>
      <Styled.Form>
        <Navigation isSubmitDisabled={!formik.isValid || !formik.dirty} />
        <MilestoneFields />
      </Styled.Form>
    </FormikProvider>
  )
}
