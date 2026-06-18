import { COLOR } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const RowWrapper = styled.div<{ height?: number | null }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: ${({ height }) => height ?? 56}px;
  position: relative;

  transition: height 0.2s ease-in-out;
  z-index: 1;

  &.hidden {
    height: 0;
  }
`

export const MilestoneRowWrapper = styled(RowWrapper)`
  height: 120px;
`

export const BackgroundRowWrapper = styled(RowWrapper)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`

export const BackgroundDateWrapper = styled.div<{ isWeekend?: boolean }>`
  position: relative;
  width: 48px;
  height: 100%;

  background-color: ${({ isWeekend }) =>
    isWeekend ? COLOR.NEUTRAL_200 : COLOR.NEUTRAL_100};
  border-right: 1px solid ${COLOR.NEUTRAL_300};
`

export const DateWrapper = styled.button<{
  isWeekend?: boolean
  disabled?: boolean
}>`
  position: relative;
  width: 48px;
  height: 100%;

  background-color: transparent;

  border: 0;
  outline: 0;
  border-right: 1px solid ${COLOR.NEUTRAL_300};

  cursor: ${({ disabled }) => (disabled ? "inherit" : "pointer")};
  &:not([disabled]):hover {
    background-color: ${COLOR.NEUTRAL_300};
  }

  &:not([disabled]):hover > .highlight-bar {
    display: block;
  }
`

export const StyledHighlightBar = styled.div.attrs({
  className: "highlight-bar",
})<{ left: number; isVisible: boolean; count: number }>`
  position: absolute;

  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  left: ${({ left }) => left}px;
  top: 50%;
  transform: translateY(-50%);

  width: ${({ count }) => count * 48}px; /* 48px * width */
  height: 40px;

  background-color: ${COLOR.NEUTRAL_400};
  box-shadow: -4px 0px 20px 0px #00000008;
  border-radius: var(--Radius-RadiusS, 0.25rem);
  pointer-events: none;
`

export const BarPosition = styled.div<{
  left: number
  width: number
}>`
  position: absolute;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  .hidden & {
    opacity: 0;
  }
`
