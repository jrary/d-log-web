import { Button } from "@components/button.styled"
import { FormControl, renderErrorText } from "@components/form/form-control"
import { Select } from "@components/form/select"
import { TextArea } from "@components/form/text-area"
import { TextField } from "@components/form/text-field"
import { show } from "@ebay/nice-modal-react"
import { ApplySuccessModal } from "@features/recruitment/detail/modals/apply-success-modal"
import { useApplyRecruitment } from "@features/recruitment/detail/queries/useApplyRecuriment"
import { recruitmentApplyValidationSchema } from "@features/recruitment/detail/schemas/recruitment-apply-validation-schema"
import { useGetUserDetailInfoQueryObject } from "@features/user-info/queries/useGetUserDetailInfoQueryObject"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useSuspenseQueries } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import { ErrorMessage, Form, FormikProvider, getIn, useFormik } from "formik"
import toast from "react-hot-toast"
import { useParams } from "react-router"
import { toFormikValidate } from "zod-formik-adapter"
import * as Styled from "./apply.styled"

const TEXT = {
  title: "지원서 작성",
  fields: {
    portfolio: {
      label: "포트폴리오 / 깃허브 링크",
      placeholder: "마이페이지에 저장된 링크로 지원됩니다.",
    },
    workHourPerWeek: {
      label: "주별 작업 가능시간",
      placeholder: "주별 작업 가능시간을 선택해주세요.",
    },
    introduce: {
      label: "자기소개",
      placeholder:
        "외주를 하고자 하는 이유와 함께 자신에 대한 간단한 소개를 입력해주세요.",
    },
    currentProjectStatus: {
      label: "현재 진행중인 업무",
      placeholder:
        "프로젝트 적합도 및 업무 가능 시간을 파악하기 위해 현재 진행중인 다른 업무를 작성해주세요.",
    },
    projectExperience: {
      label: "기술스택과 유관한 프로젝트 경험",
      placeholder:
        "지원하신 외주와 관련되어 유사한 프로젝트 경험이 있다면 작성해주세요.",
    },
    ownSkill: {
      label: "스스로 생각한 자기 실력",
      placeholder:
        "스스로 판단하기에 자신의 실력이 어느 정도인지 자유롭게 작성해주세요.",
    },
    coWorkingExperience: {
      label: "협업 경험",
      placeholder:
        "나와 같은, 혹은 다른 직무의 작업자와 협업해본 경험이 있다면 작성해주세요.",
    },
    outsourceWithOtherPlatform: {
      label: "외주 경험",
      placeholder:
        "그릿지 외의 플랫폼에서 외주를 진행한 경험이 있다면 알려주세요.",
    },
    workScopeText: {
      label: "작업범위 확인",
      placeholder:
        "지원하고자 하는 프로젝트를 잘 이해했나요? 이해도 확인을 위해 본인이 수행하게 될 작업을 작성해주세요.",
    },
    question: {
      label: "문의사항",
      placeholder: "이외 프로젝트에 대해 궁금한 점이 있다면 작성해주세요.",
    },
  },
  submit: "지원하기",
}

type ApplyFormProps = {
  setMode: React.Dispatch<React.SetStateAction<"apply" | "detail">>
}

export function ApplyForm({ setMode }: ApplyFormProps) {
  const { recruitmentId = "0" } = useParams()

  const [{ data: user }, { data: detail }] = useSuspenseQueries({
    queries: [useGetUserInfoQueryObject(), useGetUserDetailInfoQueryObject()],
  })

  const { mutateAsync: applyRecruitment, isPending } = useApplyRecruitment(
    toNumber(recruitmentId),
  )

  const formik = useFormik({
    validate: toFormikValidate(recruitmentApplyValidationSchema),
    enableReinitialize: true,
    initialValues: {
      workHourPerWeek: detail?.weeklyExpectUsageHours ?? "",
      introduce: detail?.introduce ?? "",
      currentProjectStatus: detail?.currentProjectStatus ?? "",
      projectExperience: detail?.projectExperience ?? "",
      ownSkill: detail?.ownSkill ?? "",
      coWorkingExperience: detail?.coWorkingExperience ?? "",
      outsourceWithOtherPlatform: detail?.outsourceWithOtherPlatform ?? "",
      workScopeText: "",
      question: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await applyRecruitment({
          ...values,
          workHourPerWeek: toNumber(values.workHourPerWeek),
        })
        show(ApplySuccessModal, {
          name: user?.nickname,
          phone: response.data.result?.phoneNum,
        })
        formik.resetForm()
        setMode("detail")
      } catch (error) {
        toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  const { values, errors, touched, getFieldProps, setFieldValue } = formik
  const isError = (name: string) => getIn(errors, name) && getIn(touched, name)

  return (
    <FormikProvider value={formik}>
      <Form>
        <Styled.Container>
          <Styled.Title>{TEXT.title}</Styled.Title>

          <Styled.Field>
            <FormControl.Label>{TEXT.fields.portfolio.label}</FormControl.Label>
            <FormControl.Content>
              <TextField.Root>
                <TextField.Control
                  disabled
                  placeholder={TEXT.fields.portfolio.placeholder}
                />
              </TextField.Root>
            </FormControl.Content>
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>
              {TEXT.fields.workHourPerWeek.label}
            </FormControl.Label>
            <FormControl.Content>
              <Select.Root
                hasError={isError("workHourPerWeek")}
                value={values.workHourPerWeek}
                onSelect={(value) => {
                  setFieldValue("workHourPerWeek", value)
                }}>
                <Select.Trigger
                  placeholder={TEXT.fields.workHourPerWeek.placeholder}
                />
                <Select.Options>
                  <Select.Option value="10">10시간 미만</Select.Option>
                  <Select.Option value="20">
                    10시간 이상 20시간 미만
                  </Select.Option>
                  <Select.Option value="30">
                    20시간 이상 40시간 미만
                  </Select.Option>
                  <Select.Option value="40">40시간 이상</Select.Option>
                </Select.Options>
              </Select.Root>
            </FormControl.Content>
            <ErrorMessage name="workHourPerWeek" render={renderErrorText} />
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>{TEXT.fields.introduce.label}</FormControl.Label>
            <FormControl.Content>
              <TextArea.Root maxLength={500}>
                <TextArea.Control
                  {...getFieldProps("introduce")}
                  data-error={isError("introduce")}
                  placeholder={TEXT.fields.introduce.placeholder}
                />
                <TextArea.TextLength />
              </TextArea.Root>
            </FormControl.Content>
            <ErrorMessage name="introduce" render={renderErrorText} />
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>
              {TEXT.fields.currentProjectStatus.label}
            </FormControl.Label>
            <FormControl.Content>
              <TextArea.Root maxLength={500}>
                <TextArea.Control
                  {...getFieldProps("currentProjectStatus")}
                  data-error={isError("currentProjectStatus")}
                  placeholder={TEXT.fields.currentProjectStatus.placeholder}
                />
                <TextArea.TextLength />
              </TextArea.Root>
            </FormControl.Content>
            <ErrorMessage
              name="currentProjectStatus"
              render={renderErrorText}
            />
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>
              {TEXT.fields.projectExperience.label}
            </FormControl.Label>
            <FormControl.Content>
              <TextArea.Root maxLength={500}>
                <TextArea.Control
                  {...getFieldProps("projectExperience")}
                  data-error={isError("projectExperience")}
                  placeholder={TEXT.fields.projectExperience.placeholder}
                />
                <TextArea.TextLength />
              </TextArea.Root>
            </FormControl.Content>
            <ErrorMessage name="projectExperience" render={renderErrorText} />
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>{TEXT.fields.ownSkill.label}</FormControl.Label>
            <FormControl.Content>
              <TextArea.Root maxLength={500}>
                <TextArea.Control
                  {...getFieldProps("ownSkill")}
                  data-error={isError("ownSkill")}
                  placeholder={TEXT.fields.ownSkill.placeholder}
                />
                <TextArea.TextLength />
              </TextArea.Root>
            </FormControl.Content>
            <ErrorMessage name="ownSkill" render={renderErrorText} />
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>
              {TEXT.fields.coWorkingExperience.label}
            </FormControl.Label>
            <FormControl.Content>
              <TextArea.Root maxLength={500}>
                <TextArea.Control
                  {...getFieldProps("coWorkingExperience")}
                  data-error={isError("coWorkingExperience")}
                  placeholder={TEXT.fields.coWorkingExperience.placeholder}
                />
                <TextArea.TextLength />
              </TextArea.Root>
            </FormControl.Content>
            <ErrorMessage name="coWorkingExperience" render={renderErrorText} />
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>
              {TEXT.fields.outsourceWithOtherPlatform.label}
            </FormControl.Label>
            <FormControl.Content>
              <TextArea.Root maxLength={500}>
                <TextArea.Control
                  {...getFieldProps("outsourceWithOtherPlatform")}
                  data-error={isError("outsourceWithOtherPlatform")}
                  placeholder={
                    TEXT.fields.outsourceWithOtherPlatform.placeholder
                  }
                />
                <TextArea.TextLength />
              </TextArea.Root>
            </FormControl.Content>
            <ErrorMessage
              name="outsourceWithOtherPlatform"
              render={renderErrorText}
            />
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>
              {TEXT.fields.workScopeText.label}
            </FormControl.Label>
            <FormControl.Content>
              <TextArea.Root maxLength={500}>
                <TextArea.Control
                  {...getFieldProps("workScopeText")}
                  data-error={isError("workScopeText")}
                  placeholder={TEXT.fields.workScopeText.placeholder}
                />
                <TextArea.TextLength />
              </TextArea.Root>
            </FormControl.Content>
            <ErrorMessage name="workScopeText" render={renderErrorText} />
          </Styled.Field>

          <Styled.Field>
            <FormControl.Label>{TEXT.fields.question.label}</FormControl.Label>
            <FormControl.Content>
              <TextArea.Root maxLength={500}>
                <TextArea.Control
                  {...getFieldProps("question")}
                  data-error={isError("question")}
                  placeholder={TEXT.fields.question.placeholder}
                />
                <TextArea.TextLength />
              </TextArea.Root>
            </FormControl.Content>
            <ErrorMessage name="question" render={renderErrorText} />
          </Styled.Field>

          <Button
            disabled={!formik.isValid || !formik.dirty || isPending}
            type="submit">
            {TEXT.submit}
          </Button>
        </Styled.Container>
      </Form>
    </FormikProvider>
  )
}
