import { OpenedRangeDayPicker } from "@components/form/day-picker"
import { format } from "date-fns"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router"
import Check from "~icons/local/ic_check_green"
import Calendar from "~icons/local/ic_dropdown_calendar"
import Category from "~icons/local/ic_dropdown_category"
import User from "~icons/local/ic_dropdown_user"
import * as Styled from "./option-dropdown.styled"
import type { ProjectRoleListDto, ProjectWorkerListDto } from "@apis/model"

type OptionDropdownProps = {
  category: "filter" | "folder" | null
  setIsOpened: React.Dispatch<React.SetStateAction<"filter" | "folder" | null>>
  roleList: ProjectRoleListDto[]
  workerList: ProjectWorkerListDto[]
}

export default function OptionDropdown({
  category,
  setIsOpened,
  roleList,
  workerList,
}: OptionDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedType, setSelectedType] = useState<
    "ROLE" | "PROJECT_WORKER" | "WORK_DATE"
  >("ROLE")

  const workerId = searchParams.get("worker")
  const roleId = searchParams.get("role")
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()

  // 컨테이너 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpened(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchParams, setIsOpened, setSearchParams])

  const handleTabClick = (type: "ROLE" | "PROJECT_WORKER" | "WORK_DATE") => {
    setSelectedType(type)
  }

  // 옵션 쿼리 세팅
  const setOptionQuery = (
    newParams: URLSearchParams,
    type: string,
    firstParam?: string | number,
  ) => {
    if (category === null) return

    // 현재 쿼리에 저장된 role 또는 worker의 리스트
    let currentQueryList = searchParams.get(type)?.split(",") || []
    // 전체 항목을 선택했을 경우
    if (!firstParam) {
      // 필터의 경우 쿼리를 없애고, 그룹의 경우 '전체'라고 명시를 해야 함
      if (category === "filter") currentQueryList = []
      else currentQueryList = ["all"]
    } else {
      // 직무 메뉴인 경우 다중선택 가능, 그 외 (담당자) 다중선택 불가능
      if (type === "role") {
        // 직무
        currentQueryList = currentQueryList.filter((id) => id !== "all")
        if (currentQueryList.includes(String(firstParam))) {
          currentQueryList = currentQueryList.filter(
            (id) => id !== String(firstParam),
          )
        } else {
          currentQueryList.push(String(firstParam))
        }
      } else {
        // 담당자
        currentQueryList = [String(firstParam)]
      }
    }

    // 변경한 쿼리 리스트에 아무것도 없는 경우 (필터 메뉴에서 전체를 눌렀을 때 - 필터를 할 필요가 없음)
    if (currentQueryList.length < 1) {
      // 저장해둔 쿼리 전부 삭제
      newParams.delete("c")
      newParams.delete("type")
      newParams.delete(type)
    } else {
      // 그 외, 카테고리(필터/그룹), 타입(직무/담당자/작업 날짜), 타입별 쿼리를 저장
      newParams.set("c", category)
      newParams.set("type", selectedType)
      newParams.set(type, currentQueryList.join(","))
    }
  }

  const handleItemClick = (
    firstParam?: string | number,
    secondParam?: string,
  ) => {
    if (category !== null) {
      const newParams = new URLSearchParams(searchParams)
      // 기존 설정되어있는 쿼리 삭제
      newParams.delete("role")
      newParams.delete("worker")
      newParams.delete("start")
      newParams.delete("end")

      switch (selectedType) {
        case "ROLE": {
          setOptionQuery(newParams, "role", firstParam)
          break
        }
        case "PROJECT_WORKER": {
          setOptionQuery(newParams, "worker", firstParam)
          break
        }
        case "WORK_DATE":
          newParams.set("c", category)
          newParams.set("type", selectedType)
          newParams.set("start", firstParam ? String(firstParam) : "all")
          newParams.set("end", secondParam ? String(secondParam) : "all")
          break
        default:
          break
      }

      setSearchParams(newParams)
    }
  }

  return (
    <Styled.Container ref={containerRef} category={category}>
      {/* 탭 메뉴 */}
      <Styled.TabContainer>
        <Styled.Tab
          onClick={() => handleTabClick("ROLE")}
          isClicked={selectedType === "ROLE"}>
          <Category />
          직무
        </Styled.Tab>
        <Styled.Tab
          onClick={() => handleTabClick("PROJECT_WORKER")}
          isClicked={selectedType === "PROJECT_WORKER"}>
          <User />
          담당자
        </Styled.Tab>
        {category === "filter" && (
          <Styled.Tab
            onClick={() => handleTabClick("WORK_DATE")}
            isClicked={selectedType === "WORK_DATE"}>
            <Calendar />
            작업 날짜
          </Styled.Tab>
        )}
      </Styled.TabContainer>

      <Styled.Line />

      {/* 선택 */}
      {selectedType === "ROLE" && (
        <Styled.SelectContainer>
          <Styled.Item onClick={() => handleItemClick()}>
            전체
            {(roleId === null || roleId === "all") && <Check />}
          </Styled.Item>
          {roleList.map((item, idx) => (
            <Styled.Item key={idx} onClick={() => handleItemClick(item.id)}>
              {item.role}
              {roleId?.split(",").includes(String(item.id)) && <Check />}
            </Styled.Item>
          ))}
        </Styled.SelectContainer>
      )}

      {selectedType === "PROJECT_WORKER" && (
        <Styled.SelectContainer>
          <Styled.Item onClick={() => handleItemClick()}>
            전체
            {(workerId === null || workerId === "all") && <Check />}
          </Styled.Item>
          {workerList.map((item, idx) => (
            <Styled.Item key={idx} onClick={() => handleItemClick(item.id)}>
              {`[${item.role}] ${item.name}`}
              {workerId?.split(",").includes(String(item.id)) && <Check />}
            </Styled.Item>
          ))}
        </Styled.SelectContainer>
      )}

      {category === "filter" && selectedType === "WORK_DATE" && (
        <OpenedRangeDayPicker
          numberOfMonths={1}
          showOutsideDays
          selected={{
            from: startDate ? new Date(startDate) : undefined,
            to: endDate ? new Date(endDate) : undefined,
          }}
          onSelect={(value) => {
            const { from = new Date(), to = new Date() } = value ?? {}
            const formattedFrom = format(from, "yyyy-MM-dd")
            const formattedTo = format(to, "yyyy-MM-dd")

            if (formattedFrom && formattedTo) {
              setStartDate(formattedFrom)
              setEndDate(formattedTo)
              handleItemClick(formattedFrom, formattedTo)
            }
          }}
        />
      )}
    </Styled.Container>
  )
}
