import { HStack } from "@components/shared-components/stack"
import MilestoneItem from "@features/dashboard/projects/histories/components/milestone/milestone-item"
import OptionDropdown from "@features/dashboard/projects/histories/components/option/option-dropdown"
import { FilterSheet } from "@features/dashboard/projects/histories/components/table/filter-table"
import { GroupSheet } from "@features/dashboard/projects/histories/components/table/group-table"
import Title from "@features/dashboard/projects/histories/components/title/title"
import { useGetProjectListQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectListQueryObject"
import { useGetProjectRoleQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectRoleQueryObject"
import { useGetProjectWorkerQueryObject } from "@features/dashboard/projects/histories/queries/useGetProjectWorkerQueryObject"
import { useGetMilestonesQueryObject } from "@features/dashboard/projects/milestones/queries/useGetMilestonesQueryObject"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useQueries } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useState } from "react"
import { useParams, useSearchParams } from "react-router"
import Close from "~icons/local/ic_close"
import Folder from "~icons/local/ic_folder"
import Sort from "~icons/local/ic_sort"
import * as Styled from "./styled"

export default function Histories() {
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isOpened, setIsOpened] = useState<"filter" | "folder" | null>(null)

  const category = searchParams.get("c")
  const type = searchParams.get("type")
  const roleId = searchParams.get("role")
  const workerId = searchParams.get("worker")
  const startDate = searchParams.get("start")
  const endDate = searchParams.get("end")

  // 현재 마일스톤 아이디를 쿼리에서 가져오기
  const selectedMilestoneId = searchParams.get("milestone")

  // 마일스톤 리스트, 직무/담당자 리스트 불러오기 API
  const [
    { data: projectList = [] },
    { data: userInfo },
    { data: milestoneList = [] },
    { data: roleList = [] },
    { data: workerList = [] },
  ] = useQueries({
    queries: [
      useGetProjectListQueryObject(),
      useGetUserInfoQueryObject(),
      useGetMilestonesQueryObject(clientProjectContractId),
      useGetProjectRoleQueryObject(clientProjectContractId),
      useGetProjectWorkerQueryObject(clientProjectContractId),
    ],
  })

  const projectInfo = projectList.find(
    (project) => project.clientProjectContractId === clientProjectContractId,
  )

  // 현재 마일스톤 아이디를 변경하기 (새 마일스톤 아이디 저장, 기존의 필터링 옵션 삭제)
  const setCurrentTab = (milestoneId: string) => () => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete("c")
    newParams.delete("type")
    newParams.delete("role")
    newParams.delete("worker")
    newParams.delete("start")
    newParams.delete("end")
    newParams.set("milestone", milestoneId)
    setSearchParams(newParams)
  }

  // 기존의 필터링 옵션 삭제
  const deleteFilter = () => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete("c")
    newParams.delete("type")
    newParams.delete("role")
    newParams.delete("worker")
    newParams.delete("start")
    newParams.delete("end")
    setSearchParams(newParams)
  }

  const getFilterText = () => {
    switch (type) {
      case "ROLE": {
        const roleNames = roleId
          ?.split(",")
          .map((id) => {
            const role = roleList.find((role) => String(role.id) === id)
            return role ? role.role : "전체"
          })
          .join(", ")

        return `직무: ${roleNames}`
      }
      case "PROJECT_WORKER": {
        const worker = workerList.find(
          (worker) => String(worker.id) === workerId,
        )
        return `담당자: ${worker ? worker?.name : "전체"}`
      }
      case "WORK_DATE":
        return `${startDate}~${endDate}`
    }
  }

  return (
    <Styled.Container>
      <Title
        title={`[${projectInfo?.title}] 의 작업 내역 조회`}
        description={`${userInfo?.nickname}님에게 배정된 작업 내역을 기록해 주세요`}
      />
      <>
        {/* 마일스톤 목록 */}
        <Styled.MilestoneContainer>
          <MilestoneItem
            objective="전체"
            isSelected={!selectedMilestoneId}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams)
              newParams.delete("milestone")
              setSearchParams(newParams)
            }}
          />
          {milestoneList.map((item, idx) => (
            <MilestoneItem
              key={idx}
              objective={item.milestoneName}
              isSelected={Number(selectedMilestoneId) === item.id}
              onClick={setCurrentTab(String(item.id))}
            />
          ))}
        </Styled.MilestoneContainer>

        <HStack spacing="0.62rem" position="relative">
          <Styled.FilterButton
            onClick={() => setIsOpened("filter")}
            isClicked={isOpened === "filter" || category === "filter"}>
            <Sort />
            <Styled.ButtonText>
              필터
              {category === "filter" && `: ${getFilterText()}`}
            </Styled.ButtonText>
            {category === "filter" && (
              <Close
                onClick={(e) => {
                  e.stopPropagation()
                  deleteFilter()
                }}
              />
            )}
          </Styled.FilterButton>

          <Styled.FilterButton
            onClick={() => setIsOpened("folder")}
            isClicked={isOpened === "folder" || category === "folder"}>
            <Folder />
            <Styled.ButtonText>
              그룹별 보기
              {category === "folder" && `: ${getFilterText()}`}
            </Styled.ButtonText>
            {category === "folder" && (
              <Close
                onClick={(e) => {
                  e.stopPropagation()
                  deleteFilter()
                }}
              />
            )}
          </Styled.FilterButton>

          {isOpened !== null && (
            <OptionDropdown
              category={isOpened}
              setIsOpened={setIsOpened}
              roleList={roleList}
              workerList={workerList}
            />
          )}
        </HStack>

        {/* 작업 내용 표 */}
        {(category === "filter" || category === null) && (
          <FilterSheet
            workHistoryFilter={type}
            roleId={roleId}
            workerId={Number(workerId) || null}
            taskId={null}
            startDate={startDate}
            endDate={endDate}
          />
        )}
        {category === "folder" &&
          (roleId && !workerId ? (
            roleId === "all" ? (
              roleList.map((item, idx) => (
                <GroupSheet
                  key={idx}
                  groupName={item.role}
                  workHistoryFilter={type}
                  roleId={String(item.id)}
                  workerId={Number(workerId) || null}
                  startDate={startDate}
                  endDate={endDate}
                />
              ))
            ) : (
              roleId
                ?.split(",")
                .map((item, idx) => (
                  <GroupSheet
                    key={idx}
                    groupName={
                      String(
                        roleList.find((role) => String(role.id) === item)?.role,
                      ) || ""
                    }
                    workHistoryFilter={type}
                    roleId={item}
                    workerId={Number(workerId) || null}
                    startDate={startDate}
                    endDate={endDate}
                  />
                ))
            )
          ) : workerId === "all" ? (
            workerList.map((item, idx) => (
              <GroupSheet
                key={idx}
                groupName={item.name}
                workHistoryFilter={type}
                roleId={roleId}
                workerId={item.id}
                startDate={startDate}
                endDate={endDate}
              />
            ))
          ) : (
            <GroupSheet
              groupName={String(
                workerList.find((worker) => String(worker.id) === workerId)
                  ?.name || "",
              )}
              workHistoryFilter={type}
              roleId={roleId}
              workerId={Number(workerId)}
              startDate={startDate}
              endDate={endDate}
            />
          ))}
      </>
    </Styled.Container>
  )
}
