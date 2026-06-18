import * as Dialog from "@components/dialog.styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { create, useModal } from "@ebay/nice-modal-react"
import { FilterSheet } from "@features/dashboard/projects/histories/components/table/filter-table"
import { useGetProjectTaskDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/useGetProjectTaskDetailQueryObject"
import { useQuery } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useParams } from "react-router"
import Close from "~icons/local/ic_close"

export const WorksTableModal = create(function () {
  const { visible, remove } = useModal()

  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const taskId = toNumber(useParams().taskId)

  const { data: taskDetail } = useQuery(
    useGetProjectTaskDetailQueryObject(clientProjectContractId, taskId),
  )

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content paddingHorizontal="0" paddingVertical="0">
          <VStack spacing="1.25rem" width="100%">
            <HStack
              spacing="0.375rem"
              paddingLeft="2.5rem"
              paddingRight="2.5rem"
              paddingTop="2.5rem"
              justify="between">
              <HStack spacing="0.375rem">
                <Text typo="sub2" weight="bold" color="HIGH_EMPHASIS">
                  {taskDetail?.taskName}
                </Text>
                <Text typo="sub2" weight="bold">
                  작업 내역
                </Text>
              </HStack>
              <Dialog.CloseButton>
                <Close />
              </Dialog.CloseButton>
            </HStack>
            <FilterSheet
              workHistoryFilter={null}
              roleId={null}
              workerId={null}
              taskId={taskId}
              startDate={null}
              endDate={null}
              excludeColumns={["task"]}
            />
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
