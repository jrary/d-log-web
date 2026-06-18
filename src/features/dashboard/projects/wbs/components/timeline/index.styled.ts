import { COLOR } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const MonthList = styled.div`
  display: flex;
  flex-direction: row;
  height: 54px;

  border-bottom: 1px solid ${COLOR.NEUTRAL_300};
`

export const MonthWrapper = styled.div<{ width: number }>`
  display: flex;
  align-items: center;

  width: ${({ width }) => width}px;
  height: 54px;

  border-right: 1px solid ${COLOR.NEUTRAL_300};
  padding-left: 10px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    & button:first-child {
      transform: rotate(180deg);
    }

    & button > svg {
      width: 12px;
      height: 12px;
      color: ${COLOR.NEUTRAL_600};
    }
  }
`

export const TimelineWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.NEUTRAL_100};

  overflow: scroll;

  /* Webkit browsers like Chrome, Safari */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${COLOR.NEUTRAL_400};
    border-radius: 4px;
  }
`

export const TimelineInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  flex: 1;
`

export const TimelineHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 90px;

  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${COLOR.NEUTRAL_100};
`

export const TimelineContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${COLOR.NEUTRAL_300};
    z-index: 1;
  }
`
/** 오늘 날짜 선 */
export const TodayLineWrapper = styled.div<{ left: number }>`
  position: absolute;
  top: 0;
  left: ${({ left }) => left}px;
  height: 100%;
  width: 1px;
  z-index: 1;
  pointer-events: none;

  background-image: linear-gradient(
    to bottom,
    ${COLOR.GREEN_500} 50%,
    transparent 50%
  );
  background-size: 2px 8px;
  background-repeat: repeat-y;
`

export const TodayLineStartCircle = styled.div`
  position: absolute;
  top: -2px;
  left: -1.5px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${COLOR.GREEN_500};
`
