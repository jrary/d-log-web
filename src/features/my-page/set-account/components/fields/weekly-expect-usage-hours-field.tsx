import { FormControl } from "@components/form/form-control"
import { Select } from "@components/form/select"
import { TEXT } from "@components/shared-components/tokens/color"
import { useFormikContext } from "formik"
import type { UpdateUserInfoValidationSchema } from "@features/my-page/set-account/schemas/update-user-info-validation-schema"

export function WeeklyExpectUsageHoursField() {
  const { values, setFieldValue } =
    useFormikContext<UpdateUserInfoValidationSchema>()
  return (
    <FormControl.Container>
      <FormControl.Label>일주일 기준 작업 가능 시간</FormControl.Label>
      <FormControl.Description>
        입력하신 시간은 적합도 평가 기준으로만 쓰입니다!
      </FormControl.Description>
      <FormControl.Content>
        <Select.Root
          value={values?.weeklyExpectUsageHours ?? undefined}
          onSelect={(value) => {
            setFieldValue("weeklyExpectUsageHours", value)
          }}
          placeholderColor={TEXT.DEFAULT}>
          <Select.Trigger placeholder="선택해주세요!" />
          <Select.Options>
            <Select.Option value="10">10시간 미만</Select.Option>
            <Select.Option value="20">10시간 이상 20시간 미만</Select.Option>
            <Select.Option value="30">20시간 이상 40시간 미만</Select.Option>
            <Select.Option value="40">40시간 이상</Select.Option>
          </Select.Options>
        </Select.Root>
      </FormControl.Content>
    </FormControl.Container>
  )
}
