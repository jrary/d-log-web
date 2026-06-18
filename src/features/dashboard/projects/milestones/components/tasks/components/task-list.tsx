import { HStack, VStack } from "@components/shared-components/stack"
import { FilterSheet } from "@features/dashboard/projects/histories/components/table/filter-table"
import { Empty } from "@features/dashboard/projects/milestones/components/tasks/components/empty"
import TaskItem from "@features/dashboard/projects/milestones/components/tasks/components/task-item/task-item"
import Title from "@features/dashboard/projects/milestones/components/tasks/components/title/title"
import { useGetProjectMilestoneDetailQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/useGetProjectMilestoneDetailQueryObject"
import { useGetProjectTaskQueryObject } from "@features/dashboard/projects/milestones/components/tasks/queries/useGetProjectTaskQueryObject"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import * as Styled from "./styled"

const TEXT = {
  title: (title?: string) => `${title}`,
  description: `마일스톤의 세부 태스크와 작업자가 남긴 작업 기록을 관리할 수 있습니다.`,
  button: `태스크 생성하기`,
  listTitle: `작업 리스트`,
}

export default function TaskList() {
  const navigate = useNavigate()
  const location = useLocation()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)

  const lastPath = location.pathname.split("/").pop()
  const isSideMenuOpen = lastPath !== "tasks"

  const { data: mileStoneDetail } = useSuspenseQuery(
    useGetProjectMilestoneDetailQueryObject(
      clientProjectContractId,
      milestoneId,
    ),
  )

  const { data: taskList = [] } = useQuery(
    useGetProjectTaskQueryObject(clientProjectContractId, milestoneId),
  )

  const [visibleSheets, setVisibleSheets] = useState<number[]>([])

  const toggleSheet = (idx: number) => {
    setVisibleSheets((prev) =>
      prev.includes(idx) ? prev.filter((id) => id !== idx) : [...prev, idx],
    )
  }

  return (
    <VStack width="100%">
      <VStack spacing="1.62rem">
        <HStack justify="between">
          <Title
            title={TEXT.title(mileStoneDetail?.milestoneName)}
            description={TEXT.description}
          />
          <Styled.AddButton
            isSideMenuOpen={isSideMenuOpen}
            onClick={() => navigate("create")}>
            {TEXT.button}
          </Styled.AddButton>
        </HStack>

        <Styled.Line />

        {taskList.length > 0 ? (
          <VStack spacing="1.88rem" marginVertical="2.63rem">
            <Styled.ListTitle>{TEXT.listTitle}</Styled.ListTitle>

            <VStack spacing="0.81rem">
              {taskList.map((item, idx) => (
                <VStack spacing="0.81rem" key={idx}>
                  <TaskItem
                    item={item}
                    isOpened={visibleSheets.includes(item.id)}
                    toggleSheet={toggleSheet}
                  />
                  {visibleSheets.includes(item.id) && (
                    <FilterSheet
                      workHistoryFilter={null}
                      roleId={null}
                      workerId={null}
                      taskId={item.id}
                      startDate={null}
                      endDate={null}
                    />
                  )}
                </VStack>
              ))}
            </VStack>
          </VStack>
        ) : (
          <Empty />
        )}
      </VStack>
    </VStack>
  )
}
