import { FormControl, renderErrorText } from "@components/form/form-control"
import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { SelectBox } from "@features/auth/sign-up/components/form/components/select-box"
import { useGetLanguageListQueryObject } from "@features/auth/sign-up/queries/useGetLanguageListQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ErrorMessage, useFormikContext } from "formik"
import { Suspense } from "react"
import type { FormValues } from "@features/job-category/types/form-values"

const TEXT = {
  title: "언어",
  description: "사용 가능한 언어를 선택해주세요.",
}

export function LanguageField() {
  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.title}</FormControl.Label>
      <FormControl.Description>{TEXT.description}</FormControl.Description>
      <FormControl.Content>
        <Suspense fallback={<Box width="100%" height="2.625rem" />}>
          <LanguageList />
        </Suspense>
      </FormControl.Content>
      <ErrorMessage name="languageIdList" render={renderErrorText} />
    </FormControl.Container>
  )
}

function LanguageList() {
  const { setFieldValue, values } = useFormikContext<FormValues>()
  const { data } = useSuspenseQuery(useGetLanguageListQueryObject())

  return (
    <HStack flexWrap spacing="0.5rem">
      {data.map((language) => (
        <SelectBox
          key={language.id}
          value={language.id}
          label={language.name}
          checked={values.languageIdList.includes(language.id)}
          onChange={() => {
            const isSelected = values.languageIdList.includes(language.id)

            const updatedList = isSelected
              ? values.languageIdList.filter((id) => id !== language.id)
              : [...values.languageIdList, language.id]

            setFieldValue("languageIdList", updatedList)
          }}
        />
      ))}
    </HStack>
  )
}
