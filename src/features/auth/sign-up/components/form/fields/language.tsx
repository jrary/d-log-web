import { FormControl, renderErrorText } from "@components/form/form-control"
import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { SelectBox } from "@features/auth/sign-up/components/form/components/select-box"
import { DEV_JOB_CATEGORY_ID } from "@features/auth/sign-up/components/form/constants/job-category"
import { useGetLanguageListQueryObject } from "@features/auth/sign-up/queries/useGetLanguageListQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ErrorMessage, useFormikContext } from "formik"
import { Suspense } from "react"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"

const TEXT = {
  title: "언어",
  description: "사용 가능한 언어를 선택해주세요.",
}

export function LanguageField() {
  const {
    values: { jobCategoryList = [] },
  } = useFormikContext<SignUpSchema>()

  if (
    jobCategoryList.length < 1 ||
    !jobCategoryList.some((j) => j.jobCategoryId === DEV_JOB_CATEGORY_ID)
  ) {
    return null
  }

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
  const { getFieldProps } = useFormikContext<SignUpSchema>()
  const { data } = useSuspenseQuery(useGetLanguageListQueryObject())

  return (
    <HStack flexWrap spacing="0.5rem">
      {data.map((language) => (
        <SelectBox
          key={language.id}
          {...getFieldProps("languageIdList")}
          value={language.id.toString()}
          label={language.name}
        />
      ))}
    </HStack>
  )
}
