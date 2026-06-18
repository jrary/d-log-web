import { FormControl, renderErrorText } from "@components/form/form-control"
import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { SelectBox } from "@features/auth/sign-up/components/form/components/select-box"
import { useGetJobCategoryListQueryObject } from "@features/auth/sign-up/queries/useGetJobCategoryListQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import { filter, some } from "es-toolkit/compat"
import { ErrorMessage, useFormikContext } from "formik"
import { Suspense } from "react"
import type { FormValues } from "@features/job-category/types/form-values"
import type { ChangeEvent } from "react"

const TEXT = {
  label: "직군",
  description: "해당되는 직군을 선택해주세요.",
}

export function JobCategoryField() {
  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.label}</FormControl.Label>
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

export function JobCategoryList() {
  const { setFieldValue, values } = useFormikContext<FormValues>()
  const { data: jobCategories } = useSuspenseQuery(
    useGetJobCategoryListQueryObject(),
  )

  const handleChange =
    (jobCategoryId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setFieldValue("jobCategoryList", [
          ...values.jobCategoryList,
          {
            jobCategoryId,
            roleIdList: [],
          },
        ])
        return
      }

      setFieldValue(
        "jobCategoryList",
        filter(
          values.jobCategoryList,
          (r) => r.jobCategoryId !== jobCategoryId,
        ),
      )
    }

  return (
    <HStack flexWrap spacing="0.5rem">
      {jobCategories.map((jobCategory) => {
        const checked = some(
          values.jobCategoryList,
          (r) => r.jobCategoryId === jobCategory.id,
        )
        return (
          <SelectBox
            key={jobCategory.id}
            checked={checked}
            label={jobCategory.name}
            onChange={handleChange(jobCategory.id)}
          />
        )
      })}
    </HStack>
  )
}
