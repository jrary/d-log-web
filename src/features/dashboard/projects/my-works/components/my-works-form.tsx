import { Button } from "@components/button.styled"
import Autocomplete from "@components/form/autocomplete"
import { DayPicker } from "@components/form/day-picker"
import { SelectBox } from "@components/form/select-box/select-box"
import { TextField } from "@components/form/text-field"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { useModal } from "@ebay/nice-modal-react"
import { useGetMilestoneDetailQueryObject } from "@features/dashboard/projects/milestones/queries/useGetMilestoneDetailQueryObject"
import { TimeInput } from "@features/dashboard/projects/my-works/components/time-input"
import { useGetTasksQueryObject } from "@features/dashboard/projects/my-works/queries/useGetTasksQueryObject"
import { useGetWorkHistoryDetailQueryObject } from "@features/dashboard/projects/my-works/queries/useGetWorkHistoryDetailQueryObject"
import { useGetWorkProgressRangeQueryObject } from "@features/dashboard/projects/my-works/queries/useGetWorkProgressRangeQueryObject"
import { useGetFirstMilestoneQueryObject } from "@features/dashboard/queries/useGetMilestonesQueryObject"
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import {
  differenceInCalendarDays,
  differenceInMinutes,
  format,
  isAfter,
} from "date-fns"
import { ko } from "date-fns/locale"
import { get, invariant, toNumber } from "es-toolkit/compat"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import * as Styled from "./my-works-form.styled"
import type { PostProjectWorkHistoryRequest } from "@apis/model"

type Props = {
  clientContractId: number
  milestoneId: number
  historyId?: number
}

export function MyWorksForm({
  clientContractId,
  milestoneId,
  historyId,
}: Props) {
  const { remove } = useModal()
  const { setFieldValue, values, isSubmitting } =
    useFormikContext<PostProjectWorkHistoryRequest>()

  invariant(values.projectWorkerId, "projectWorkerId is required")
  const { data: tasks = [] } = useSuspenseQuery(
    useGetTasksQueryObject(
      clientContractId,
      milestoneId,
      values.projectWorkerId,
    ),
  )

  // 작업 내역 상세 조회 api
  // 선택된 taskId가 false(undefined이거나, 0 - 초기값)이면 호출되지 않음
  const { data: histories = [] } = useQuery(
    queryOptions({
      ...useGetWorkHistoryDetailQueryObject(
        clientContractId,
        values.projectWorkerId,
        values.taskId,
      ),
      enabled: Boolean(values.taskId),
    }),
  )

  // 작업 내역 선택 가능한 진행률의 범위 조회 api
  // 상세 내용과 시작 시간 둘 중 하나라도 선택되지 않았을 경우 호출되지 않음
  const { data: range } = useQuery(
    queryOptions({
      ...useGetWorkProgressRangeQueryObject(
        clientContractId,
        values.workDescriptionId ?? -1,
        values.workStartAt,
        historyId,
      ),
      enabled: Boolean(values.workDescriptionId && values.workStartAt),
    }),
  )

  // workerDescription을 입력받은 뒤, 이것이 이미 존재하는 workDescription일 경우 workDescriptionId를 추가로 저장
  useEffect(() => {
    if (values.workDescription) {
      const selectedHistory = histories.find(
        (v) => v.workDescription === values.workDescription,
      )
      setFieldValue("workDescriptionId", selectedHistory?.id ?? undefined)
    } else {
      setFieldValue("workDescriptionId", undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.workDescription])

  const clientProjectContractId = toNumber(useParams().clientProjectContractId)

  // 마일스톤 정보(기간) 호출
  // 마일스톤이 존재하지 않을 경우 호출되지 않음
  const { data: first } = useSuspenseQuery(
    useGetFirstMilestoneQueryObject(clientProjectContractId),
  )
  const { data: milestoneData } = useQuery(
    queryOptions({
      ...useGetMilestoneDetailQueryObject(
        clientProjectContractId,
        milestoneId || first?.id || 0,
      ),
      enabled: Boolean(milestoneId || first?.id),
    }),
  )

  const _workStartAt = values.workStartAt
    ? new Date(values.workStartAt)
    : new Date()

  const _workEndAt = values.workEndAt ? new Date(values.workEndAt) : ""

  const [workStartDate, setWorkStartDate] = useState<string>(
    _workStartAt ? format(_workStartAt, "yyyy-MM-dd") : "",
  )

  const [workStartTime, setWorkStartTime] = useState<string>(
    values.workStartAt && _workStartAt ? format(_workStartAt, "HH:mm") : "",
  )

  const [workStartAmPm, setWorkStartAmPm] = useState<"am" | "pm">(
    _workStartAt
      ? Number(format(_workStartAt, "HH")) > 12
        ? "am"
        : "pm"
      : "pm",
  )

  const [workEndTime, setWorkEndTime] = useState<string>(() => {
    if (!_workEndAt || !_workStartAt) return ""

    const isMidnight =
      format(_workEndAt, "HH:mm") === "00:00" &&
      differenceInCalendarDays(_workEndAt, _workStartAt) === 1

    return isMidnight ? "24:00" : format(_workEndAt, "HH:mm")
  })

  const [workEndAmPm, setWorkEndAmPm] = useState<"am" | "pm">(
    _workEndAt ? (Number(format(_workEndAt, "HH")) > 12 ? "am" : "pm") : "pm",
  )

  const [workDiffHours, setWorkDiffHours] = useState<string>("0")

  const [selectStartMenu, toggleSelectStartMenu] = useState(false)
  const [selectEndMenu, toggleSelectEndMenu] = useState(false)

  useEffect(
    function recalculateWorkTime() {
      const startTime = new Date(workStartDate + "T" + workStartTime + ":00")
      const endTime = new Date(workStartDate + "T" + workEndTime + ":00")

      // 시작 날짜, 시간 계산하여 field에 미리 저장
      if (isNaN(startTime.getTime())) return

      if (startTime.getHours() >= 12) {
        setWorkStartAmPm("pm")
      } else {
        setWorkStartAmPm("am")
      }
      setFieldValue("workStartAt", format(startTime, "yyyy-MM-dd'T'HH:mm:ss"))

      // 끝나는 시간을 아직 입력하지 않은 경우 시간 계산 하지 않음
      if (isNaN(endTime.getTime())) return

      if (endTime.getHours() >= 12) {
        setWorkEndAmPm("pm")
      } else {
        setWorkEndAmPm("am")
      }

      if (isAfter(startTime, endTime)) {
        endTime.setDate(endTime.getDate() + 1)
      }

      setFieldValue("workEndAt", format(endTime, "yyyy-MM-dd'T'HH:mm:ss"))

      setWorkDiffHours(
        (differenceInMinutes(endTime, startTime) / 60).toFixed(1),
      )
    },
    [
      workStartDate,
      workStartTime,
      workEndTime,
      workStartAmPm,
      workEndAmPm,
      setFieldValue,
    ],
  )

  const minuteChange = (name: "workStartAt" | "workEndAt", minutes: number) => {
    try {
      // 24:00 대응
      if (name === "workEndAt") {
        if (minutes === 0) {
          const nextDay = new Date(workStartDate + "T00:00:00")
          nextDay.setDate(nextDay.getDate() + 1)
          setFieldValue("workEndAt", format(nextDay, "yyyy-MM-dd'T'HH:mm:ss"))
          setWorkEndTime("24:00")
          return
        }
      }

      const time = new Date(values[name] ?? "")
      time.setMinutes(minutes)

      if (isNaN(time.getTime())) {
        const formattedMinutes = String(minutes).padStart(2, "0")
        if (name === "workStartAt") setWorkStartTime(`00:${formattedMinutes}`)
        else setWorkEndTime(`00:${formattedMinutes}`)
        return
      }

      const formattedTime = format(time, "yyyy-MM-dd'T'HH:mm:ss")
      setFieldValue(name, formattedTime)

      if (name === "workStartAt") setWorkStartTime(formattedTime.slice(11, 16))
      else setWorkEndTime(formattedTime.slice(11, 16))
    } catch (error) {
      console.error("시간 설정 오류: ", get(error, "message"))
    }
  }

  const isDisabled =
    !values.taskId || !values.workDescription || !values.workStartAt

  return (
    <VStack spacing="1.5rem" align="start" width="100%" height="100%">
      <VStack spacing="0.5rem">
        <Text typo="body3" color="SECONDARY">
          배정된 작업
        </Text>
        <HStack flexWrap spacing="0.5rem">
          {tasks.length < 1 ? (
            <Text typo="caption" color="SECONDARY">
              배정된 작업이 없습니다.
            </Text>
          ) : (
            tasks.map((task) => (
              <SelectBox
                key={task.id}
                label={task.taskName}
                name="taskId"
                checked={task.id === values.taskId}
                onChange={() => setFieldValue("taskId", task.id)}
              />
            ))
          )}
        </HStack>
      </VStack>

      <VStack spacing="0.5rem" width="100%">
        <Text typo="body3" color="SECONDARY">
          상세 내용
        </Text>
        <Autocomplete
          name="workDescription"
          options={histories.map((v) => v.workDescription)}
          value={values.workDescription}
          placeholder="상세 내용을 등록해 주세요."
        />
      </VStack>
      <VStack spacing="0.5rem">
        <Text typo="body3" color="SECONDARY">
          작업 날짜
        </Text>
        <DayPicker
          mode="single"
          // 마일스톤 기간 내의 값만 선택할 수 있도록, 미래의 날짜는 선택할 수 없도록 disabled 설정
          disabled={{
            before: milestoneData?.milestoneStartDate
              ? new Date(milestoneData?.milestoneStartDate)
              : undefined,
            after: milestoneData?.milestoneEndDate
              ? new Date(
                  Math.min(
                    new Date(milestoneData?.milestoneEndDate).getTime(),
                    new Date().setDate(new Date().getDate()),
                  ),
                )
              : new Date(),
          }}
          content={
            <Styled.DateButton>
              {_workStartAt ? (
                <Text typo="body3">
                  {format(_workStartAt, "yyyy.MM.dd (EEE)", {
                    locale: ko,
                  })}
                </Text>
              ) : (
                <Text typo="body3" color="TERTIARY">
                  날짜를 선택해 주세요
                </Text>
              )}
            </Styled.DateButton>
          }
          selected={_workStartAt || undefined}
          onSelect={(v = new Date()) => {
            if (!v) return
            setWorkStartDate(format(v, "yyyy-MM-dd"))
            setFieldValue("workStartAt", format(v, "yyyy-MM-dd'T'HH:mm:ss"))
          }}
          align="start"
        />
      </VStack>

      <VStack spacing="0.5rem" justify="between" width="100%" flexWrap>
        <Text typo="body3" color="SECONDARY">
          작업 시각
        </Text>

        <HStack spacing="0.75rem" align="center">
          <HStack align="center" spacing="0.5rem" grow={1} position="relative">
            <TextField.Root>
              <TimeInput
                value={workStartTime}
                placeholder="시작 시각"
                onBlur={() => toggleSelectStartMenu(false)}
                onFocus={() => toggleSelectStartMenu(true)}
                onChange={(value) => {
                  const hour = Math.min(toNumber(value.slice(0, 2)), 23)
                    .toString()
                    .padStart(2, "0")
                  const minute = Math.min(toNumber(value.slice(3, 5)), 59)
                    .toString()
                    .padStart(2, "0")

                  if (Number(hour) < 0 || Number(hour) >= 13) {
                    toggleSelectStartMenu(false)
                  } else {
                    toggleSelectStartMenu(true)
                  }

                  setWorkStartTime(`${hour}:${minute}`)
                  setFieldValue(
                    "workStartAt",
                    workStartDate + "T" + hour + ":" + minute + ":00",
                  )
                }}
              />
            </TextField.Root>
            {selectStartMenu && (
              <Styled.Content onMouseDown={(e) => e.preventDefault()}>
                <VStack width="100%">
                  {[0, 15, 30, 45].map((minute) => (
                    <Button
                      key={minute}
                      type="button"
                      onClick={() => {
                        minuteChange("workStartAt", minute)
                        toggleSelectStartMenu(false)
                      }}
                      variant="ghost">
                      {values.workStartAt.slice(11, 13) || "00"}:
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </VStack>
              </Styled.Content>
            )}
            <div>
              <Button
                variant="darkSolid"
                size="xs"
                type="button"
                onClick={() => {
                  if (!workStartTime || !workStartDate) return

                  const isAm = workStartAmPm === "am"
                  setWorkStartAmPm(isAm ? "pm" : "am")

                  const date = new Date(values.workStartAt)
                  date.setHours(date.getHours() + (isAm ? 12 : -12))

                  setWorkStartTime(format(date, "HH:mm"))
                  setFieldValue("workStartAt", date.toISOString())
                }}>
                <Text typo="body3">{workStartAmPm === "am" ? "AM" : "PM"}</Text>
              </Button>
            </div>
          </HStack>

          <Text weight="bold">-</Text>

          <HStack align="center" spacing="0.5rem" grow={1} position="relative">
            <TextField.Root>
              <TimeInput
                value={workEndTime ?? ""}
                placeholder="끝낸 시각"
                onBlur={() => toggleSelectEndMenu(false)}
                onFocus={() => toggleSelectEndMenu(true)}
                onChange={(value) => {
                  if (!value) return

                  let hour = toNumber(value.slice(0, 2))
                  let minute = toNumber(value.slice(3, 5))

                  // 끝난 시간에서 24:00 허용
                  if (hour === 24 && minute === 0) {
                    const endDate = new Date(workStartDate + "T00:00:00")
                    endDate.setDate(endDate.getDate() + 1)

                    // 24:00인 경우 endDate 설정해주고 종료
                    setWorkEndTime("24:00")
                    setFieldValue(
                      "workEndAt",
                      format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
                    )
                    toggleSelectEndMenu(false)
                    return
                  }

                  hour = Math.min(hour, 23)
                  minute = Math.min(minute, 59)

                  // 00:00은 종료 시간으로 허용 안 함
                  if (hour === 0 && minute === 0) {
                    toggleSelectEndMenu(false)
                    return
                  }

                  const hourStr = hour.toString().padStart(2, "0")
                  const minuteStr = minute.toString().padStart(2, "0")

                  setWorkEndTime(`${hourStr}:${minuteStr}`)
                  setFieldValue(
                    "workEndAt",
                    `${workStartDate}T${hourStr}:${minuteStr}:00`,
                  )
                }}
              />
            </TextField.Root>
            {selectEndMenu && (
              <Styled.Content onMouseDown={(e) => e.preventDefault()}>
                <VStack width="100%">
                  {[0, 15, 30, 45].map((minute) => (
                    <Button
                      key={minute}
                      type="button"
                      onClick={() => {
                        minuteChange("workEndAt", minute)
                        toggleSelectEndMenu(false)
                      }}
                      variant="ghost">
                      {values.workStartAt.slice(11, 13) || "00"}:
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </VStack>
              </Styled.Content>
            )}
            <div>
              <Button
                variant="darkSolid"
                size="xs"
                type="button"
                onClick={() => {
                  if (!workStartTime || !workStartDate) return

                  const isAm = workEndAmPm === "am"
                  setWorkEndAmPm(isAm ? "pm" : "am")

                  const date = new Date(`${workStartDate}T${workEndTime}:00`)
                  if (isNaN(date.getTime())) return

                  date.setHours(date.getHours() + (isAm ? 12 : -12))

                  // 12:00일 때 AM/PM 버튼 선택 시 field에는 00:00으로 수정되지만 표시는 24:00으로 되도록 설정
                  if (workEndTime === "12:00") setWorkEndTime("24:00")
                  else setWorkEndTime(format(date, "HH:mm"))
                  setFieldValue("workEndAt", date.toISOString())
                }}>
                <Text typo="body3">{workEndAmPm === "am" ? "AM" : "PM"}</Text>
              </Button>
            </div>
          </HStack>
        </HStack>
      </VStack>

      <VStack spacing="0.5rem">
        <Text typo="body3" color="SECONDARY">
          총 작업 시간 (자동 기록)
        </Text>

        <Text typo="body1" color="HIGH_EMPHASIS">
          {workDiffHours} 시간
        </Text>
      </VStack>
      <VStack spacing="0.5rem">
        <Text typo="body3" color="SECONDARY">
          진행률 선택
        </Text>
        <HStack flexWrap spacing="0.5rem">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((progress) => (
            <SelectBox
              key={progress}
              disabled={
                (range?.prevProgressPercent ?? 0) > progress ||
                progress > (range?.nextProgressPercent ?? 101)
              }
              label={`${progress}%`}
              name="progressPercent"
              checked={progress === values.progressPercent}
              onChange={() => setFieldValue("progressPercent", progress)}
            />
          ))}
        </HStack>
      </VStack>
      <HStack justify="end" width="100%" spacing="0.5rem">
        <Button type="button" variant="ghost" size="round" onClick={remove}>
          취소
        </Button>
        <Button
          variant="primary"
          size="round"
          disabled={isDisabled || isSubmitting}>
          <Text typo="body2">{historyId ? "수정하기" : "등록하기"}</Text>
        </Button>
      </HStack>
    </VStack>
  )
}
