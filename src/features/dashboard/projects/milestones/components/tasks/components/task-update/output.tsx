import { TextField } from "@components/form/text-field"
import * as Popover from "@components/popover.styled"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { TEXT } from "@components/shared-components/tokens/color"
import { show } from "@ebay/nice-modal-react"
import { DeleteOutputCheckModal } from "@features/dashboard/projects/milestones/components/tasks/components/modals/delete-output-check"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { usePatchProjectTaskOutputQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/usePatchProjectTaskOutputQueryObject"
import { usePostProjectTaskOutputQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/usePostProjectTaskOutputQueryObject"
import { taskOutputValidationSchema } from "@features/dashboard/projects/milestones/components/tasks/schemas/tasks-output-validation-schema"
import { useQueryClient } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import { useFormik } from "formik"
import { Suspense, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router"
import { toFormikValidate } from "zod-formik-adapter"
import Add from "~icons/local/ic_add"
import Edit from "~icons/local/ic_edit"
import More from "~icons/local/ic_more"
import Trash from "~icons/local/ic_trash"
import * as Styled from "./output.styled"
import type { ProjectMilestoneTaskOutputDto } from "@apis/model"

type OutputFieldProps = {
  outputList?: ProjectMilestoneTaskOutputDto[]
}

export function OutputField({ outputList }: OutputFieldProps) {
  return (
    <>
      <Styled.Outputs>
        <Suspense>
          {outputList?.map((item) => <Output key={item.id} item={item} />)}
          <CreateOutput outputLength={outputList?.length || 0} />
        </Suspense>
      </Styled.Outputs>
    </>
  )
}

// 새로운 산출물 추가 관련 (창 + 버튼)
function CreateOutput({ outputLength }: { outputLength: number }) {
  const [shouldCreateOutput, setShouldCreateOutput] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const queryClient = useQueryClient()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)
  const taskId = toNumber(useParams().taskId)

  const { mutateAsync: createOutput } = usePostProjectTaskOutputQueryObject(
    clientProjectContractId,
    milestoneId,
    taskId,
  )

  const formik = useFormik({
    validate: toFormikValidate(taskOutputValidationSchema),
    initialValues: {
      outputName: "",
      outputUrl: "",
    },
    onSubmit: async (values) => {
      if (!values.outputName && !values.outputUrl) {
        setShouldCreateOutput(false)
        return
      }
      try {
        const response = await createOutput(values)
        if (response.data.isSuccess) {
          toast.success("산출물이 업로드되었습니다.")

          await queryClient.invalidateQueries({
            queryKey: dashboardTaskQueryKey.taskDetail(
              clientProjectContractId,
              taskId,
            ),
          })

          formik.resetForm()
          setShouldCreateOutput(false)
        }
      } catch (e) {
        toast.error(get(e, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  // 입력창 영역 벗어나면 자동으로 api 호출(formik submit)될 수 있도록 함
  // 태스크 입력과는 달리 단일 input 형태가 아니어서
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        formik.submitForm()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [formik])
  // enter key로도 submit 될 수 있도록 함
  // e.nativeEvent.isComposing: 한글 입력중일 때(조합 중일 때) return - 중복 submit 방지
  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === "Enter") {
      e.preventDefault()
      await formik.submitForm()
    }
  }

  useEffect(() => {
    if (shouldCreateOutput) {
      inputRef.current?.focus()
    }
  }, [shouldCreateOutput])

  return (
    <>
      {shouldCreateOutput && (
        <form ref={formRef} onSubmit={formik.handleSubmit}>
          <Styled.CreateOutput>
            <TextField.Root>
              <TextField.Control
                name="outputName"
                ref={inputRef}
                value={formik.values.outputName}
                placeholder="산출물 이름을 입력해 주세요."
                onChange={formik.handleChange}
                onKeyDown={handleKeyDown}
              />
            </TextField.Root>
            <Styled.Divider />
            <TextField.Root>
              <TextField.Control
                name="outputUrl"
                value={formik.values.outputUrl}
                placeholder="링크를 입력해 주세요."
                onChange={formik.handleChange}
                onKeyDown={handleKeyDown}
              />
            </TextField.Root>
          </Styled.CreateOutput>
        </form>
      )}
      <Styled.AddButton
        marginTop={
          outputLength < 1 ? (shouldCreateOutput ? "0.5rem" : "0rem") : "0.5rem"
        }
        onClick={() => {
          if (!shouldCreateOutput) {
            setShouldCreateOutput(true)
            return
          }
        }}>
        <Text typo="body1" color="DEFAULT">
          링크 추가
        </Text>
        <Add />
      </Styled.AddButton>
    </>
  )
}

type OutputProps = {
  item: ProjectMilestoneTaskOutputDto
}
// 산출물 아이템
function Output({ item }: OutputProps) {
  const [isEditing, setIsEditing] = useState(false)

  const queryClient = useQueryClient()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)
  const taskId = toNumber(useParams().taskId)

  const { mutateAsync: modifyOutput } = usePatchProjectTaskOutputQueryObject(
    clientProjectContractId,
    milestoneId,
    taskId,
    item.id,
  )

  const formik = useFormik({
    validate: toFormikValidate(taskOutputValidationSchema),
    enableReinitialize: true,
    initialValues: {
      outputName: item.name ?? "",
      outputUrl: item.url ?? "",
    },
    onSubmit: async (values) => {
      if (!values.outputName && !values.outputUrl) {
        setIsEditing(false)
        return
      }
      try {
        const response = await modifyOutput(values)
        if (response.data.isSuccess) {
          toast.success("수정되었습니다.")

          await queryClient.invalidateQueries({
            queryKey: dashboardTaskQueryKey.taskDetail(
              clientProjectContractId,
              taskId,
            ),
          })

          setIsEditing(false)
        }
      } catch (e) {
        toast.error(get(e, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  // 입력창 영역 벗어나면 자동으로 api 호출(formik submit)될 수 있도록 함
  // 태스크 입력과는 달리 단일 input 형태가 아니어서
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        formik.submitForm()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [formik])
  // enter key로도 submit 될 수 있도록 함
  // e.nativeEvent.isComposing: 한글 입력중일 때(조합 중일 때) return - 중복 submit 방지
  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === "Enter") {
      e.preventDefault()
      await formik.submitForm()
    }
  }

  return isEditing ? (
    // 링크 수정 상태
    <form ref={formRef} onSubmit={formik.handleSubmit}>
      <Styled.CreateOutput>
        <TextField.Root>
          <TextField.Control
            name="outputName"
            value={formik.values.outputName}
            placeholder="산출물 이름을 입력해 주세요."
            onChange={formik.handleChange}
            onKeyDown={handleKeyDown}
          />
        </TextField.Root>
        <Styled.Divider />
        <TextField.Root>
          <TextField.Control
            name="outputUrl"
            value={formik.values.outputUrl}
            placeholder="링크를 입력해 주세요."
            onChange={formik.handleChange}
            onKeyDown={handleKeyDown}
          />
        </TextField.Root>
      </Styled.CreateOutput>
    </form>
  ) : (
    // 기본 상태
    <Styled.Output>
      {item.url ? (
        <Styled.OutputLink to={item.url} target="_blank">
          {item?.name || "링크를 입력해 주세요."}
        </Styled.OutputLink>
      ) : (
        <Styled.OutputText>
          {item?.name || "산출물 이름을 입력해 주세요."}
        </Styled.OutputText>
      )}
      <HStack spacing="0.5rem">
        <PopoverMenu
          onEdit={() => {
            setIsEditing(true)
          }}
          onRemove={() =>
            show(DeleteOutputCheckModal, {
              outputId: item.id,
            })
          }
        />
      </HStack>
    </Styled.Output>
  )
}

type MenuProps = {
  onEdit: () => void
  onRemove: () => void
}
// 태스크 관리 메뉴 Popover (수정, 삭제)
function PopoverMenu({ onEdit, onRemove }: MenuProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Styled.TriggerButton>
          <More />
        </Styled.TriggerButton>
      </Popover.Trigger>
      <Popover.Content sideOffset={8} align="end">
        <Styled.MenuActionButton onClick={() => onEdit()}>
          <Edit width="1.25rem" height="1.25rem" color={TEXT.SECONDARY} />
          <Text typo="body3" color="SECONDARY">
            링크 수정
          </Text>
        </Styled.MenuActionButton>
        <Styled.MenuActionButton onClick={() => onRemove()}>
          <Trash width="1.25rem" height="1.25rem" color={TEXT.DANGER} />
          <Text color="DANGER">삭제</Text>
        </Styled.MenuActionButton>
      </Popover.Content>
    </Popover.Root>
  )
}
