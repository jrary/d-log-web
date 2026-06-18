import { FormControl } from "@components/form/form-control"
import { TextArea } from "@components/form/text-area"
import { ErrorMessage, useFormikContext } from "formik"

export function InformationFields() {
  const { getFieldProps } = useFormikContext()

  return (
    <>
      <FormControl.Container>
        <FormControl.Label>자기소개</FormControl.Label>
        <FormControl.Content>
          <TextArea.Root maxLength={500}>
            <TextArea.Control
              placeholder="외주를 하고자 하는 이유와 함께 자신에 대한 간단한 소개를 입력해주세요."
              {...getFieldProps("introduce")}
            />
            <TextArea.TextLength />
          </TextArea.Root>
        </FormControl.Content>
        <ErrorMessage name="introduce" />
      </FormControl.Container>

      <FormControl.Container>
        <FormControl.Label>현재 진행중인 프로젝트</FormControl.Label>
        <FormControl.Content>
          <TextArea.Root maxLength={500}>
            <TextArea.Control
              placeholder="프로젝트 적합도 및 업무 가능 시간을 파악하기 위해 현재 진행중인 다른 업무를 작성해주세요."
              {...getFieldProps("currentProjectStatus")}
            />
            <TextArea.TextLength />
          </TextArea.Root>
        </FormControl.Content>
        <ErrorMessage name="currentProjectStatus" />
      </FormControl.Container>

      <FormControl.Container>
        <FormControl.Label>기술스택과 유관한 프로젝트 경험</FormControl.Label>
        <FormControl.Content>
          <TextArea.Root maxLength={500}>
            <TextArea.Control
              placeholder="지원하신 외주와 관련되어 유사한 프로젝트 경험이 있다면 작성해주세요."
              {...getFieldProps("projectExperience")}
            />
            <TextArea.TextLength />
          </TextArea.Root>
        </FormControl.Content>
        <ErrorMessage name="projectExperience" />
      </FormControl.Container>

      <FormControl.Container>
        <FormControl.Label>스스로 생각한 자기 실력</FormControl.Label>
        <FormControl.Content>
          <TextArea.Root maxLength={500}>
            <TextArea.Control
              placeholder="스스로 판단하기에 자신의 실력이 어느 정도인지 자유롭게 작성해주세요."
              {...getFieldProps("ownSkill")}
            />
            <TextArea.TextLength />
          </TextArea.Root>
        </FormControl.Content>
        <ErrorMessage name="ownSkill" />
      </FormControl.Container>

      <FormControl.Container>
        <FormControl.Label>협업 경험</FormControl.Label>
        <FormControl.Content>
          <TextArea.Root maxLength={500}>
            <TextArea.Control
              placeholder="나와 같은, 혹은 다른 직무의 작업자와 협업해본 경험이 있다면 작성해주세요."
              {...getFieldProps("coWorkingExperience")}
            />
            <TextArea.TextLength />
          </TextArea.Root>
        </FormControl.Content>
        <ErrorMessage name="coWorkingExperience" />
      </FormControl.Container>

      <FormControl.Container>
        <FormControl.Label>외주 경험</FormControl.Label>
        <FormControl.Content>
          <TextArea.Root maxLength={500}>
            <TextArea.Control
              placeholder="그릿지 외의 플랫폼에서 외주를 진행한 경험이 있다면 알려주세요."
              {...getFieldProps("outsourceWithOtherPlatform")}
            />
            <TextArea.TextLength />
          </TextArea.Root>
        </FormControl.Content>
        <ErrorMessage name="outsourceWithOtherPlatform" />
      </FormControl.Container>
    </>
  )
}
