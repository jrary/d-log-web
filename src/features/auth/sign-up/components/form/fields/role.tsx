import { FormControl } from "@components/form/form-control"
import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { SelectBox } from "@features/auth/sign-up/components/form/components/select-box"
import { useGetRoleListQueryObject } from "@features/auth/sign-up/queries/useGetRoleListQueryObject"
import { queryOptions, useSuspenseQueries } from "@tanstack/react-query"
import { findIndex, get } from "es-toolkit/compat"
import { useFormikContext } from "formik"
import { Suspense } from "react"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"

const TEXT = {
  title: "직무",
  description: "해당하는 직무를 선택해 주세요.",
}

export function RoleField() {
  const {
    errors,
    values: { jobCategoryList = [] },
  } = useFormikContext<SignUpSchema>()

  if (jobCategoryList.length === 0) {
    return null
  }

  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.title}</FormControl.Label>
      <FormControl.Description>{TEXT.description}</FormControl.Description>
      <FormControl.Content>
        <Suspense fallback={<Box width="100%" height="2.625rem" />}>
          <RoleList
            jobCategoryIds={jobCategoryList
              .map((r) => r.jobCategoryId)
              .map(Number)}
          />
        </Suspense>
      </FormControl.Content>
      <FormControl.ErrorText>
        {jobCategoryList
          .map((_, index) => {
            return get(
              errors,
              `jobCategoryList${index > 0 ? `.${index}` : ""}.roleIdList`,
            )
          })
          .at(0)}
      </FormControl.ErrorText>
    </FormControl.Container>
  )
}

function RoleList({ jobCategoryIds }: { jobCategoryIds: number[] }) {
  const {
    values: { jobCategoryList = [] },
    getFieldProps,
  } = useFormikContext<SignUpSchema>()

  const response = useSuspenseQueries({
    queries: jobCategoryIds.map((jobCategoryId) => {
      return queryOptions({
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ...useGetRoleListQueryObject({ jobCategoryId }),
        select: (data) => {
          return data.map((role) => ({ ...role, jobCategoryId }))
        },
      })
    }),
  })

  return (
    <HStack flexWrap spacing="0.5rem">
      {response
        .flatMap((r) => r.data)
        .map((role) => {
          const index = findIndex(
            jobCategoryList,
            (j) => j.jobCategoryId === role.jobCategoryId,
          )

          return (
            <SelectBox
              key={role.id}
              label={role.name}
              {...getFieldProps(`jobCategoryList.${index}.roleIdList`)}
              value={role.id}
            />
          )
        })}
    </HStack>
  )
}
