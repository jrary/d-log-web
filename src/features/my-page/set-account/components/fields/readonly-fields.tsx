import { FormControl } from "@components/form/form-control"
import { TextField } from "@components/form/text-field"
import { useGetUserDetailInfoQueryObject } from "@features/user-info/queries/useGetUserDetailInfoQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"

export function ReadonlyFields() {
  const { data: detail } = useSuspenseQuery(useGetUserDetailInfoQueryObject())

  return (
    <>
      <FormControl.Container>
        <FormControl.Label>이름</FormControl.Label>
        <FormControl.Content>
          <TextField.Root>
            <TextField.Control disabled defaultValue={detail?.name} />
          </TextField.Root>
        </FormControl.Content>
      </FormControl.Container>

      <FormControl.Container>
        <FormControl.Label>닉네임</FormControl.Label>
        <FormControl.Content>
          <TextField.Root>
            <TextField.Control disabled defaultValue={detail?.nickname} />
          </TextField.Root>
        </FormControl.Content>
      </FormControl.Container>

      <FormControl.Container>
        <FormControl.Label>이메일</FormControl.Label>
        <FormControl.Content>
          <TextField.Root>
            <TextField.Control disabled defaultValue={detail?.email} />
          </TextField.Root>
        </FormControl.Content>
      </FormControl.Container>
    </>
  )
}
