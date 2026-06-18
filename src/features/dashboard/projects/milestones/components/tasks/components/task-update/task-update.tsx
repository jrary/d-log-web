import { RangeDayPicker } from "@components/form/day-picker"
import { FormControl } from "@components/form/form-control"
import { SelectMultiDropdown } from "@components/form/select-multi-dropdown"
import { TitleField } from "@components/form/title"
import { HStack, VStack } from "@components/shared-components/stack"
import { show } from "@ebay/nice-modal-react"
import { OutputField } from "@features/dashboard/projects/milestones/components/tasks/components/task-update/output"
import { WorksTableModal } from "@features/dashboard/projects/milestones/components/tasks/components/task-update/works-table-modal"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { useGetProjectTaskDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/useGetProjectTaskDetailQueryObject"
import { useGetProjectWorkerQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/useGetProjectWorkerQueryObject"
import { usePutProjectTaskDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/usePutProjectTaskDetailQueryObject"
import { taskUpdateValidationSchema } from "@features/dashboard/projects/milestones/components/tasks/schemas/tasks-update-validation-schema"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useGetMilestoneDetailQueryObject } from "@features/dashboard/projects/milestones/queries/useGetMilestoneDetailQueryObject"
import { useGetTaskProgressQueryObject } from "@features/dashboard/projects/my-works/queries/useGetTaskProgressQueryObject"
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { format } from "date-fns"
import { get, toNumber } from "es-toolkit/compat"
import { Form, FormikProvider, useFormik } from "formik"
import { Suspense } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import { toFormikValidate } from "zod-formik-adapter"
import LeftArrow from "~icons/local/ic_arrow_left"
import ArrowRight from "~icons/local/ic_arrow_right"
import Expected from "~icons/local/ic_dashboard_expected"
import Platform from "~icons/local/ic_dashboard_platform"
import Progress from "~icons/local/ic_dashboard_progress"
import Upload from "~icons/local/ic_dashboard_upload"
import User from "~icons/local/ic_dashboard_user"
import * as Styled from "./task-update.styled"

// 테스크 정보 아이템 목록에 들어가는 아이콘, 인덱스, (필요하다면) api와 다른 텍스트 데이터 포맷
const INFO_ITEM = {
  worker: {
    icon: <User color="#8C8E97" />,
    label: "담당자",
    text: (role?: string, name?: string) => `[${role}] ${name}`,
  },
  milestone: {
    icon: <Platform color="#8C8E97" />,
    label: "마일스톤",
  },
  progress: {
    icon: <Progress color="#8C8E97" />,
    label: "진행률",
    text: (percent: number) => {
      return `${percent}%`
    },
  },
  expected: {
    icon: <Expected color="#8C8E97" />,
    label: "일정",
  },
}

const TEXT = {
  close: "닫기",
  commitBtn: "저장하기",
  info: {
    title: "산출물 링크 첨부",
  },
  delete: "태스크 삭제하기",
}

export default function TaskUpdate() {
  const navigate = useNavigate()

  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)
  const taskId = toNumber(useParams().taskId)

  // 작업자 목록 API 호출
  const { data: workerList = [], isLoading: isWorkerListLoading } = useQuery(
    useGetProjectWorkerQueryObject(clientProjectContractId),
  )

  // 상세 정보 API 호출
  const { data: taskDetail, isLoading: isTaskDetailLoading } = useQuery(
    useGetProjectTaskDetailQueryObject(clientProjectContractId, taskId),
  )

  // 수정 API 호출
  const { mutateAsync: putTaskDetail } = usePutProjectTaskDetailQueryObject(
    clientProjectContractId,
    milestoneId,
    taskId,
  )

  // 마일스톤 데이터 불러오기 (예상 업무기간)
  const { data: milestoneData } = useSuspenseQuery(
    useGetMilestoneDetailQueryObject(clientProjectContractId, milestoneId),
  )

  const { data: taskProgress } = useQuery(
    useGetTaskProgressQueryObject(clientProjectContractId, taskId),
  )

  const queryClient = useQueryClient()

  const formik = useFormik({
    validate: toFormikValidate(taskUpdateValidationSchema),
    enableReinitialize: true,
    initialValues: {
      taskName: taskDetail?.taskName ?? "",
      projectWorkerIdList:
        taskDetail?.projectWorkerList?.map((worker) => worker.id) ?? [],
      expectedStartDate: taskDetail?.expectedStartDate ?? undefined,
      expectedEndDate: taskDetail?.expectedEndDate ?? undefined,
    },
    onSubmit: async (values) => {
      try {
        const response = await putTaskDetail(values)
        if (response.data.isSuccess) {
          toast.success("수정이 완료되었습니다.")

          queryClient.invalidateQueries({
            queryKey: [...dashboardTaskQueryKey.all(), "task"],
          })

          queryClient.invalidateQueries({
            queryKey: milestonesQueryKey.tasks(
              clientProjectContractId,
              milestoneId,
              undefined,
            ),
          })

          navigate("..")
        }
      } catch (error) {
        toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  const { values, getFieldProps, setFieldValue } = formik

  if (isWorkerListLoading || isTaskDetailLoading) return <div>loading...</div>

  return (
    <Suspense fallback={<div>loading...</div>}>
      <FormikProvider value={formik}>
        <Styled.Container>
          <Form>
            <VStack spacing="1.25rem">
              {/* 상단 버튼 */}
              <HStack justify="between" align="center">
                <Styled.HideButton onClick={() => navigate("..")}>
                  <LeftArrow />
                  <Styled.HideButtonText>{TEXT.close}</Styled.HideButtonText>
                </Styled.HideButton>

                <Styled.SubmitButton
                  disabled={!formik.isValid || !formik.dirty}>
                  {TEXT.commitBtn}
                </Styled.SubmitButton>
              </HStack>
              {/* 기본 정보 */}
              <VStack spacing="1.88rem">
                <Styled.FieldTitle>
                  <FormControl.Content>
                    <TitleField.Root>
                      <TitleField.Control
                        placeholder="태스크명을 입력해 주세요."
                        {...getFieldProps("taskName")}
                      />
                    </TitleField.Root>
                  </FormControl.Content>
                </Styled.FieldTitle>

                {/* 기본 정보 아이템 */}
                <VStack spacing="1rem">
                  {/* 담당자 */}
                  <Styled.Field>
                    <FormControl.Label>
                      <HStack spacing="0.62rem" marginVertical="0.2rem">
                        {INFO_ITEM.worker.icon}
                        {INFO_ITEM.worker.label}
                      </HStack>
                    </FormControl.Label>
                    <FormControl.Content>
                      <SelectMultiDropdown.Root
                        value={values.projectWorkerIdList}
                        onSelect={(value) => {
                          setFieldValue("projectWorkerIdList", value)
                        }}>
                        <SelectMultiDropdown.Trigger placeholder="담당자를 선택해 주세요." />
                        <SelectMultiDropdown.Options>
                          {workerList.map((item) => (
                            <SelectMultiDropdown.Option
                              key={item.id}
                              value={item.id}>
                              {INFO_ITEM.worker.text(item.role, item.name)}
                            </SelectMultiDropdown.Option>
                          ))}
                        </SelectMultiDropdown.Options>
                      </SelectMultiDropdown.Root>
                    </FormControl.Content>
                  </Styled.Field>

                  {/* 마일스톤 */}
                  <HStack justify="between" paddingVertical="0.25rem">
                    <HStack spacing="0.62rem" color="BLACK">
                      {INFO_ITEM.milestone.icon}
                      <Styled.InfoText>
                        {INFO_ITEM.milestone.label}
                      </Styled.InfoText>
                    </HStack>
                    <Styled.InfoLabelText>
                      {taskDetail?.milestoneName ?? ""}
                    </Styled.InfoLabelText>
                  </HStack>

                  {/* 진행률 */}
                  <HStack justify="between" paddingVertical="0.25rem">
                    <HStack spacing="0.62rem">
                      {INFO_ITEM.progress.icon}
                      <Styled.InfoText>
                        {INFO_ITEM.progress.label}
                      </Styled.InfoText>
                    </HStack>
                    <Styled.InfoLabelText>
                      {INFO_ITEM.progress.text(taskProgress || 0)}
                    </Styled.InfoLabelText>
                  </HStack>

                  {/* 예상 업무기간 */}
                  <Styled.FieldDate direction="horizontal">
                    <FormControl.Label>
                      <HStack spacing="0.62rem" color="BLACK">
                        {INFO_ITEM.expected.icon}
                        <Styled.InfoText>
                          {INFO_ITEM.expected.label}
                        </Styled.InfoText>
                      </HStack>
                    </FormControl.Label>
                    <RangeDayPicker
                      numberOfMonths={2}
                      showOutsideDays
                      placeholder="일정을 선택해주세요"
                      usePortal
                      selected={{
                        from: values.expectedStartDate
                          ? new Date(values.expectedStartDate)
                          : undefined,
                        to: values.expectedEndDate
                          ? new Date(values.expectedEndDate)
                          : undefined,
                      }}
                      disabled={{
                        before: new Date(
                          milestoneData?.milestoneStartDate ?? "",
                        ),
                        after: new Date(milestoneData?.milestoneEndDate ?? ""),
                      }}
                      onSelect={(value) => {
                        const { from = new Date(), to = new Date() } =
                          value ?? {}
                        setFieldValue(
                          "expectedStartDate",
                          format(from, "yyyy-MM-dd"),
                        )
                        setFieldValue(
                          "expectedEndDate",
                          format(to, "yyyy-MM-dd"),
                        )
                      }}
                    />
                  </Styled.FieldDate>

                  {/* 작업 내용 상세 보기 버튼 */}
                  <Styled.DetailButton onClick={() => show(WorksTableModal)}>
                    <HStack spacing="0.62rem" align="center" justify="center">
                      작업 내용 상세 보기
                      <ArrowRight />
                    </HStack>
                  </Styled.DetailButton>
                </VStack>
              </VStack>
            </VStack>
          </Form>

          <Styled.Line />

          {/* 컨펌 히스토리 내역 */}
          {/* <ConfirmHistory /> */}

          {/* <Styled.Line /> */}

          {/* 산출물 링크 입력창*/}
          <VStack spacing="2.5rem">
            {/* 산출물 링크 */}
            <VStack spacing="1.25rem">
              <HStack spacing="0.62rem">
                <Upload color="#8C8E97" />
                <Styled.InfoText>{TEXT.info.title}</Styled.InfoText>
              </HStack>
              <OutputField outputList={taskDetail?.outputList} />
            </VStack>
          </VStack>
        </Styled.Container>
      </FormikProvider>
    </Suspense>
  )
}
