import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR, TEXT } from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled, { css } from "styled-components"
import Calendar from "~icons/local/ic_calendar"
import ResizableBar from "./resizable-bar"

/** Milestone Bar */

export const MilestoneBarContainer = styled.div`
  position: sticky;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const MilestoneBarWrapper = styled.div`
  position: relative;
`
export const ResizableMilestoneBarWrapper = styled(ResizableBar)`
  position: relative;
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 80px;
  background: #ffffff;
  border: 1px solid ${COLOR.NEUTRAL_300};
  border-radius: 4px;
  overflow: hidden;
  user-select: none;
  cursor: pointer;

  &:hover,
  &.dragging {
    background-color: ${COLOR.NEUTRAL_200};
  }
  &.dragging * {
    cursor: col-resize;
  }
`

export const ContentWrapper = styled.div<{ wrapperWidth: number | null }>`
  position: absolute;
  will-change: transform;
  transition: transform 0.3s ease-out;
  pointer-events: none;

  ${({ wrapperWidth }) =>
    wrapperWidth && `transform: translateX(0px) !important`}
`
export const Content = styled.div<{
  wrapperWidth: number | null
  isSticky: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;

  z-index: 1;
  left: 0;
  top: 0;

  transition: transform 0.3s ease-out;
  pointer-events: none;

  ${MilestoneBarContainer}:hover &,
  ${MilestoneBarWrapper} ${ResizableMilestoneBarWrapper}.dragging ~ ${ContentWrapper} & {
    transform: translateX(10px);
  }

  ${({ isSticky }) =>
    isSticky &&
    css`
      transform: translateX(0px) !important;
    `}

  /** 조건문으로는 위 hover css가 사라지지 않아서 important 추가 */
  ${({ wrapperWidth }) =>
    wrapperWidth && `transform: translateX(${wrapperWidth}px) !important`}
`

export const DateTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const MilestoneName = styled(Text).attrs({
  typo: "body3",
  weight: "medium",
})`
  white-space: nowrap;
`

export const MilestoneDateText = styled(Text).attrs({
  typo: "caption",
  weight: "regular",
  color: COLOR.NEUTRAL_600,
})`
  white-space: nowrap;
`

export const MilestoneCalendar = styled(Calendar).attrs({
  width: 14,
  height: 14,
  color: COLOR.NEUTRAL_500,
})``

/** Task Bar */

export const Tooltip = styled(HStack)`
  display: none;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: ${TEXT.NEUTRAL};

  padding: 10px 20px;

  ${typography.body3};
  color: ${TEXT.WHITE};
  text-align: center;
  border-radius: 14px;
  white-space: pre-wrap;
  word-break: keep-all;
  z-index: 99;

  /* 말풍선 아래 삼각형 */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    padding: 0;
    margin: 0;
    transform: translateX(-50%);
    border-width: 9px 7px;
    border-style: solid;
    border-color: ${TEXT.NEUTRAL} transparent transparent transparent;
  }
`

export const ResizeableTaskBarWrapper = styled(ResizableBar)`
  position: relative;
  height: 40px;

  border-radius: 4px;
  background-color: ${COLOR.GRAY_45};
  overflow: hidden;
  cursor: pointer;

  transition: background-color 0.3s ease-out;
  &:hover,
  &.dragging {
    background-color: ${COLOR.GRAY_50};
  }
  &.dragging * {
    cursor: col-resize;
  }
`

export const TaskBarContent = styled.div<{ wrapperWidth: number | null }>`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 8px 10px;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  pointer-events: none;

  transition:
    transform 0.3s ease-out,
    margin 0.3s ease-out;

  & > * {
    transition:
      transform 0.3s ease-out,
      color 0.3s ease-out;
    white-space: nowrap;
    word-break: keep-all;
  }

  ${ResizeableTaskBarWrapper}:hover + &,
  ${ResizeableTaskBarWrapper}.dragging + & {
    & > .task-bar-title-text {
      transform: translateX(10px);
    }
    & > .task-bar-info {
      transform: translateX(-10px);
    }
    ${Tooltip} {
      display: block !important;
    }
  }

  /** 조건문으로는 위 hover css가 사라지지 않아서 important 추가 */
  ${({ wrapperWidth }) => {
    if (wrapperWidth) {
      return css`
        & {
          gap: 10px;
        }
        & > .task-bar-title-text {
          color: ${COLOR.NEUTRAL_600};
        }
        & > div > .task-bar-progress-text {
          color: ${COLOR.NEUTRAL_500};
        }
        transform: translateX(${wrapperWidth}px) !important;
        & > *:first-child {
          transform: translateX(0px) !important;
        }
        & > *:last-child {
          transform: translateX(0px) !important;
        }
      `
    }
  }}

  &:hover {
    ${Tooltip} {
      display: block !important;
    }
  }
`

export const TaskBarWrapper = styled.div`
  position: relative;
  height: 100%;

  &:hover ${Tooltip} {
    display: block !important;
  }
`

export const TaskBarInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const ProgressBar = styled.div<{ progress: number }>`
  position: absolute;
  left: 0;
  top: 0;

  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background-color: ${COLOR.GREEN_500};
  transition: background-color 0.3s ease-out;
  z-index: 0;
  pointer-events: none;

  ${ResizeableTaskBarWrapper}:hover &,
  ${ResizeableTaskBarWrapper}.dragging & {
    background-color: ${COLOR.GREEN_600};
  }
`

export const UserProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${COLOR.NEUTRAL_100};
`

/** resizeable */

export const ResizableWrapper = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: row;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  position: relative;
  overflow: hidden;
  user-select: none;
  cursor: pointer;

  transition: all 0.3s ease-out;
`

export const ResizableContent = styled.div`
  width: 100%;
  transition: margin 0.3s ease-out;

  ${ResizableWrapper}:hover &, ${ResizableWrapper}.dragging & {
    margin: 0 10px;
  }
`

export const ResizeHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 100%;

  background: rgba(0, 0, 0, 0.1);
  position: absolute;

  transition: transform 0.3s ease-out;
  cursor: col-resize;
  z-index: 1;

  &.left {
    left: 0;
    transform: translateX(-10px);
  }
  &.right {
    right: 0;
    transform: translateX(10px);
  }
  ${ResizableWrapper}:hover &, ${ResizableWrapper}.dragging & {
    &.left {
      transform: translateX(0);
    }
    &.right {
      transform: translateX(0);
    }
  }
`
