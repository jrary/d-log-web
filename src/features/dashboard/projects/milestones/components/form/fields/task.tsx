import { Select } from "@components/form/select"
import { TextField } from "@components/form/text-field"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { noop } from "es-toolkit"
import Add from "~icons/local/ic_add"
import Cancel from "~icons/local/ic_cancel"
import * as Styled from "./task.styled"

export function TaskField() {
  return (
    <Styled.Field>
      <HStack align="center" justify="between">
        <Styled.Label>
          <Task />
          <VStack spacing="0.38rem">
            <Text typo="body1" color="DEFAULT">
              플랫폼 설정
            </Text>
          </VStack>
        </Styled.Label>

        <Styled.AddTask>
          테스크 추가하기
          <Add />
        </Styled.AddTask>
      </HStack>

      <Styled.Tasks>
        <Task onRemove={noop} />
        <Task onRemove={noop} />
        <Task onRemove={noop} />
        <Task onRemove={noop} />
        <Task onCreate={noop} />
      </Styled.Tasks>
    </Styled.Field>
  )
}

type PlatformProps = {
  onRemove?: () => void
  onCreate?: () => void
}

function Task({ onRemove, onCreate }: PlatformProps) {
  return (
    <Styled.Task data-action={onCreate ? "create" : "remove"}>
      <Styled.Steps data-filled="false">
        <Select.Root>
          <Select.Trigger placeholder="작업범위를 설정해주세요." />
          <Select.Options>
            <Select.Option value="step1">공통 (필수)</Select.Option>
            <Select.Option value="step2">공통 (필수)</Select.Option>
            <Select.Option value="step3">공통 (필수)</Select.Option>
          </Select.Options>
        </Select.Root>
        <Select.Root>
          <Select.Trigger placeholder="작업범위를 설정해주세요." />
          <Select.Options>
            <Select.Option value="step1">공통 (필수)</Select.Option>
            <Select.Option value="step2">공통 (필수)</Select.Option>
            <Select.Option value="step3">공통 (필수)</Select.Option>
          </Select.Options>
        </Select.Root>
        <TextField.Root>
          <TextField.Control placeholder="태스크를 작성해주세요." />
        </TextField.Root>
      </Styled.Steps>

      {onCreate && (
        <Styled.Button onClick={onCreate}>
          <Add />
          <Text>추가</Text>
        </Styled.Button>
      )}
      {onRemove && (
        <Styled.Button onClick={onRemove}>
          <Cancel />
          <Text>삭제</Text>
        </Styled.Button>
      )}
    </Styled.Task>
  )
}
