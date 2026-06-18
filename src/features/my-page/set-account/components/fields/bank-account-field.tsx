import { FormControl } from "@components/form/form-control"
import { TextField } from "@components/form/text-field"
import { HStack, VStack } from "@components/shared-components/stack"
import { useFormikContext } from "formik"

export function BankAccountField() {
  const { getFieldProps } = useFormikContext()

  return (
    <FormControl.Container>
      <FormControl.Label>계좌번호</FormControl.Label>
      <FormControl.Description>
        계정에 등록되어 있는 이름과 예금주는 동일해야 합니다.
      </FormControl.Description>
      <FormControl.Content>
        <HStack spacing="0.5rem" width="100%">
          <VStack grow={1} minWidth="5rem">
            <TextField.Root>
              <TextField.Control
                placeholder="은행명"
                {...getFieldProps("bankName")}
              />
            </TextField.Root>
          </VStack>

          <VStack grow={10} minWidth="5rem">
            <TextField.Root>
              <TextField.Control
                placeholder="계좌번호"
                {...getFieldProps("bankAccountNumber")}
              />
            </TextField.Root>
          </VStack>
        </HStack>
      </FormControl.Content>
    </FormControl.Container>
  )
}
