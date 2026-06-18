import { RangeDayPicker } from "@components/form/day-picker"
import { FormControl, renderErrorText } from "@components/form/form-control"
import { TextArea } from "@components/form/text-area"
import { TitleField } from "@components/form/title"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { format } from "date-fns"
import { ErrorMessage, useFormikContext } from "formik"
import Calendar from "~icons/local/ic_dashboard_expected"
import Map from "~icons/local/ic_map"
import * as Styled from "./information.styled"
import * as FieldStyled from "./milestone-task.styled"
import type { MilestoneFormValidationSchema } from "@features/dashboard/projects/milestones/schemas/milestone-form-validation-schema"

export function InformationFields() {
  const { getFieldProps, setFieldValue, values } =
    useFormikContext<MilestoneFormValidationSchema>()

  return (
    <Styled.Container>
      <Styled.FieldTitle>
        <FormControl.Content>
          <TitleField.Root>
            <TitleField.Control
              placeholder="마일스톤명을 입력해 주세요"
              {...getFieldProps("milestoneName")}
            />
          </TitleField.Root>
        </FormControl.Content>
        <ErrorMessage name="milestoneName" render={renderErrorText} />
      </Styled.FieldTitle>

      <VStack spacing="1rem">
        <FieldStyled.Field>
          <FieldStyled.Label>
            <Map color="#8C8E97" />
            <Text typo="body1" color="DEFAULT">
              달성 목표
            </Text>
          </FieldStyled.Label>
          <TextArea.Root maxLength={50}>
            <TextArea.Control
              {...getFieldProps("milestoneObjective")}
              placeholder="이 마일스톤의 최종 목표는 무엇인가요? (50자 이내)"
            />
            <TextArea.TextLength />
          </TextArea.Root>
          <ErrorMessage name="milestoneObjective" render={renderErrorText} />
        </FieldStyled.Field>

        <FieldStyled.Field direction="horizontal">
          <FieldStyled.Label>
            <Calendar color="#8C8E97" />
            <Text typo="body1" color="DEFAULT">
              일정
            </Text>
          </FieldStyled.Label>
          <RangeDayPicker
            numberOfMonths={2}
            showOutsideDays
            placeholder="일정을 선택해주세요"
            usePortal
            selected={{
              from: values.milestoneStartDate
                ? new Date(values.milestoneStartDate)
                : undefined,
              to: values.milestoneEndDate
                ? new Date(values.milestoneEndDate)
                : undefined,
            }}
            onSelect={(value) => {
              const { from = new Date(), to = new Date() } = value ?? {}
              setFieldValue("milestoneStartDate", format(from, "yyyy-MM-dd"))
              setFieldValue("milestoneEndDate", format(to, "yyyy-MM-dd"))
            }}
          />
          <ErrorMessage name="milestoneStartDate" render={renderErrorText} />
        </FieldStyled.Field>
      </VStack>
    </Styled.Container>
  )
}
