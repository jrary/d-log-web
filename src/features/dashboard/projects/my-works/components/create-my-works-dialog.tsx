import * as Dialog from "@components/dialog.styled"
import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { historiesQueryKey } from "@features/dashboard/projects/histories/queries/historiesQueryKey"
import { MyWorksForm } from "@features/dashboard/projects/my-works/components/my-works-form"
import { myWorksQueryKey } from "@features/dashboard/projects/my-works/queries/myWorksQueryKey"
import { useCreateMyWorkMutation } from "@features/dashboard/projects/my-works/queries/useCreateMyWorkMutation"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { wrap } from "@suspensive/react"
import { useQueryClient } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import { Form, FormikProvider, useFormik } from "formik"
import toast from "react-hot-toast"
import { useParams } from "react-router"
import Close from "~icons/local/ic_close"
import type { PostProjectWorkHistoryRequest } from "@apis/model"

type Props = {
  clientContractId: number
  milestoneId: number
}

function CreateMyWorksDialogBase({ clientContractId, milestoneId }: Props) {
  const { visible, remove } = useModal()

  const queryClient = useQueryClient()
  const projectWorkerId = toNumber(useParams().projectWorkerId)
  const { mutateAsync: createMyWork } =
    useCreateMyWorkMutation(clientContractId)

  const initialValues: PostProjectWorkHistoryRequest = {
    taskId: 0,
    projectWorkerId,
    workDescriptionId: undefined,
    workDescription: undefined,
    workStartAt: "",
    workEndAt: undefined,
    progressPercent: undefined,
  }

  const formik = useFormik<PostProjectWorkHistoryRequest>({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await createMyWork({
          ...values,
          workEndAt: values.workEndAt ? values.workEndAt : undefined,
        })
        if (response.data.isSuccess) {
          await queryClient.invalidateQueries({
            queryKey: myWorksQueryKey.all(clientContractId),
          })
          await queryClient.invalidateQueries({
            queryKey: dashboardQueryKey.milestones(clientContractId),
          })
          await queryClient.invalidateQueries({
            queryKey: historiesQueryKey.all(),
          })

          toast.success("작업 기록을 추가하였습니다.")
          remove()
        }
      } catch (error) {
        toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  // 자동으로 업데이트되는 workStartAt, workEndAt 제외하고 값이 변경되었는지 감지
  const isDirty = Object.keys(formik.values).some((key) => {
    if (key === "workStartAt" || key === "workEndAt") return false
    return (
      formik.values[key as keyof PostProjectWorkHistoryRequest] !==
      initialValues[key as keyof PostProjectWorkHistoryRequest]
    )
  })

  return (
    <Dialog.Root open={visible} onOpenChange={remove}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            if (!isDirty) remove()
            else
              toast.error(
                "작성 중인 내용이 있습니다. 닫기 버튼으로 입력을 종료해 주세요.",
              )
          }}>
          <Dialog.Content
            width="26.25rem"
            style={{ padding: "2.5rem" }}
            onClick={(e: MouseEvent) => e.stopPropagation()}>
            <Dialog.Title hidden>작업 기록 추가</Dialog.Title>
            <FormikProvider value={formik}>
              <Form style={{ width: "100%" }}>
                <Dialog.CloseButton>
                  <Close />
                </Dialog.CloseButton>
                <MyWorksForm
                  clientContractId={clientContractId}
                  milestoneId={milestoneId}
                />
              </Form>
            </FormikProvider>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const CreateMyWorksDialog = NiceModal.create(
  wrap.Suspense().on(CreateMyWorksDialogBase),
)
