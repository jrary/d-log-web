import { FormControl } from "@components/form/form-control"
import { Switch } from "@components/form/switch"
import { useFormikContext } from "formik"
import * as Styled from "./alimtalk-field.styled"
import type { UpdateUserInfoValidationSchema } from "@features/my-page/set-account/schemas/update-user-info-validation-schema"

export function AlimtalkField() {
  const { values, setFieldValue } =
    useFormikContext<UpdateUserInfoValidationSchema>()

  return (
    <FormControl.Container>
      <FormControl.Label>알림설정</FormControl.Label>
      <FormControl.Content>
        <Styled.Container>
          <Styled.Label>60일 동안 프로젝트 제안받지 않기</Styled.Label>
          <Switch
            checked={values?.isRecruitmentAlimTalkDeny}
            onChange={() =>
              setFieldValue(
                "isRecruitmentAlimTalkDeny",
                !values.isRecruitmentAlimTalkDeny,
              )
            }
          />
        </Styled.Container>
      </FormControl.Content>
    </FormControl.Container>
  )
}
