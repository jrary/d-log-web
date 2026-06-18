import { COLOR } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const WBSWrapper = styled.div`
  flex: 1;

  position: relative;
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;

  background-color: ${COLOR.NEUTRAL_100};
  border-radius: 4px;

  overflow: scroll;
  z-index: 0;
`

export const FloatingButtonWrapper = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 56px;
  height: 42px;

  background: ${COLOR.NEUTRAL_100};
  border: 1px solid ${COLOR.NEUTRAL_400};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 100px;

  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background: ${COLOR.NEUTRAL_200};
  }
`

export const TodayButtonPosition = styled.div`
  position: absolute;
  bottom: 90px;
  right: 40px;
  z-index: 1;
`

export const TooltipWrapper = styled.div`
  position: relative;

  width: fit-content;
  min-height: 60px;

  & > svg {
    width: 18px;
    height: 14px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    fill: ${COLOR.NEUTRAL_700};
  }
`

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 12px 20px;

  min-height: 46px;

  background: ${COLOR.NEUTRAL_700};
  border-radius: 12px;
`
