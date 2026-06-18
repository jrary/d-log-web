import { FormControl, renderErrorText } from "@components/form/form-control"
import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { SelectBox } from "@features/auth/sign-up/components/form/components/select-box"
import { useGetFrameworkListQueryObject } from "@features/auth/sign-up/queries/useGetFrameworkListQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ErrorMessage, useFormikContext } from "formik"
import { Suspense } from "react"
import type { FormValues } from "@features/job-category/types/form-values"

const TEXT = {
  title: "프레임워크",
  description: "사용 가능한 프레임워크를 선택해주세요.",
}

export function FrameworkField() {
  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.title}</FormControl.Label>
      <FormControl.Description>{TEXT.description}</FormControl.Description>
      <FormControl.Content>
        <Suspense fallback={<Box width="100%" height="2.625rem" />}>
          <FrameworkList />
        </Suspense>
      </FormControl.Content>
      <ErrorMessage name="frameworkIdList" render={renderErrorText} />
    </FormControl.Container>
  )
}

function FrameworkList() {
  const { setFieldValue, values } = useFormikContext<FormValues>()
  const { data } = useSuspenseQuery(useGetFrameworkListQueryObject())

  return (
    <HStack flexWrap spacing="0.5rem">
      {data.map((framework) => (
        <SelectBox
          key={framework.id}
          value={framework.id}
          label={framework.name}
          checked={values.frameworkIdList.includes(framework.id)}
          onChange={() => {
            const isSelected = values.frameworkIdList.includes(framework.id)

            const updatedList = isSelected
              ? values.frameworkIdList.filter((id) => id !== framework.id)
              : [...values.frameworkIdList, framework.id]

            setFieldValue("frameworkIdList", updatedList)
          }}
        />
      ))}
    </HStack>
  )
}
