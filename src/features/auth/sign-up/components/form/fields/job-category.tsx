import { FormControl, renderErrorText } from "@components/form/form-control"
import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { SelectBox } from "@features/auth/sign-up/components/form/components/select-box"
import { useGetJobCategoryListQueryObject } from "@features/auth/sign-up/queries/useGetJobCategoryListQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import { concat, filter } from "es-toolkit/compat"
import { ErrorMessage, useFormikContext } from "formik"
import { Suspense } from "react"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"
import type { ChangeEvent } from "react"

const TEXT = {
  title: "직군",
  description: "해당되는 직군을 선택해 주세요.",
}

export function JobCategoryField() {
  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.title}</FormControl.Label>
      <FormControl.Description>{TEXT.description}</FormControl.Description>
      <FormControl.Content>
        <Suspense fallback={<Box width="100%" height="2.625rem" />}>
          <JobCategoryList />
        </Suspense>
      </FormControl.Content>
      <ErrorMessage name="jobCategoryList" render={renderErrorText} />
    </FormControl.Container>
  )
}

function JobCategoryList() {
  const { setFieldValue, values } = useFormikContext<SignUpSchema>()
  const { data } = useSuspenseQuery(useGetJobCategoryListQueryObject())

  return (
    <HStack flexWrap spacing="0.5rem">
      {data.map((jobCategory) => (
        <SelectBox
          key={jobCategory.id}
          label={jobCategory.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFieldValue(
              "jobCategoryList",
              filter(
                concat(values.jobCategoryList, {
                  jobCategoryId: jobCategory.id,
                  roleIdList: [],
                }),
                (r) =>
                  r.jobCategoryId !== jobCategory.id ||
                  (event.target.checked && r.jobCategoryId === jobCategory.id),
              ),
            )
          }}
        />
      ))}
    </HStack>
  )
}
