import { FormControl } from "@components/form/form-control"
import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { SelectBox } from "@features/auth/sign-up/components/form/components/select-box"
import { useGetRoleListQueriesObject } from "@features/job-category/queries/useGetRoleListQueriesObject"
import { useSuspenseQueries } from "@tanstack/react-query"
import { find, findIndex, get, includes, keys } from "es-toolkit/compat"
import { useFormikContext } from "formik"
import { Suspense } from "react"
import type { FormValues } from "@features/job-category/types/form-values"

const TEXT = {
  label: "직무",
  description: "해당하는 직무를 선택해 주세요.",
}

export function RoleField() {
  const formik = useFormikContext<FormValues>()
  const errorKey =
    keys(formik.errors).findLast((key) => key.includes("roleIdList")) ?? ""

  if (formik.values.jobCategoryList.length === 0) {
    return null
  }

  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.label}</FormControl.Label>
      <FormControl.Description>{TEXT.description}</FormControl.Description>
      <FormControl.Content>
        <Suspense fallback={<Box width="100%" height="2.625rem" />}>
          <RoleList />
        </Suspense>
      </FormControl.Content>
      <FormControl.ErrorText>
        {get(formik.errors, errorKey)}
      </FormControl.ErrorText>
    </FormControl.Container>
  )
}

function RoleList() {
  const {
    values: { jobCategoryList = [] },
    getFieldProps,
  } = useFormikContext<FormValues>()

  const roles = useSuspenseQueries({
    queries: useGetRoleListQueriesObject(
      jobCategoryList.map(({ jobCategoryId }) => jobCategoryId),
    ),
  })

  return (
    <HStack flexWrap spacing="0.5rem">
      {roles
        .flatMap(({ data }) => data)
        .map((role) => {
          const checked = find(jobCategoryList, (r) =>
            includes(r.roleIdList, role.id),
          )
          const index = findIndex(roles, (r) =>
            find(r.data, (r) => r.id === role.id),
          )

          return (
            <SelectBox
              key={role.id}
              label={role.name}
              checked={checked}
              {...getFieldProps(`jobCategoryList.${index}.roleIdList`)}
              value={role.id}
            />
          )
        })}
    </HStack>
  )
}
