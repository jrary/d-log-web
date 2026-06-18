import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { token } from "@components/shared-components/tokens/typography"
import { IconButton } from "@features/dashboard/projects/wbs/components/shared/index.styled"
import styled from "styled-components"

/** Milestone List */
export const MilestoneListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 364px;
  height: 100%;

  overflow-y: auto;

  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const MilestoneListHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 90px;
  flex-shrink: 0;

  padding: 0px 10px 8px;

  border-right: 1px solid ${COLOR.NEUTRAL_300};
  border-bottom: 1px solid ${COLOR.NEUTRAL_300};

  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${COLOR.NEUTRAL_100};

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  }
`

export const MilestoneListContent = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  border-right: 1px solid ${COLOR.NEUTRAL_300};
  padding-bottom: 8px;
`

export const MilestoneListHeaderAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  padding: 8px 10px 8px 12px;
  border: 0;
  outline: 0;

  border-radius: 6px;
  background-color: transparent;

  transition: background-color 0.1s ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.NEUTRAL_300};
  }
`

/** Milestone Card Input */
export const MilestoneCardInputWrapper = styled.div`
  display: flex;
  padding: 20px 10px;
  flex-direction: row;
  gap: 8px;
  align-items: center;

  background-color: ${COLOR.NEUTRAL_200};
  border-width: 0px 0px 1px 0px;
  border-color: ${COLOR.NEUTRAL_300};
  border-style: solid;
`

export const Divider = styled.div`
  width: 1px;
  height: 10px;
  background-color: ${COLOR.NEUTRAL_300};
`

export const MilestoneCardInputContent = styled.input`
  flex: 1;
  width: 100%;
  height: 100%;

  font-weight: 400;
  ${token.body3}

  background-color: transparent;
  color: ${COLOR.NEUTRAL_900};
  border: none;
  outline: none;

  &::placeholder {
    color: ${COLOR.NEUTRAL_400};
  }
`

export const MilestoneEditInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div {
    height: 100%;
  }
`

/** Milestone Card */
export const MilestoneCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;

  padding: 20px 10px 19px;

  background: ${COLOR.NEUTRAL_100};
  border-bottom: 1px solid ${COLOR.NEUTRAL_300};

  box-sizing: border-box;
`
export const MilestoneCardContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const DateTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const MilestoneCardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Header = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  min-width: 0;
  flex: 1;
`

export const StyledActionBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
`

export const RotatedIconButton = styled(IconButton)`
  svg {
    transition: transform 0.2s ease-in-out;
  }

  &.open svg {
    transform: rotate(90deg);
  }
`

export const AnimatedContainer = styled.div`
  overflow: visible;
  transition:
    max-height 0.2s ease-in-out,
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  opacity: 1;
  transform: translateY(0);
  will-change: max-height, opacity, transform;

  &.hidden {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`

export const Title = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
`

export const MilestoneCardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  padding: 24px 10px;
  border-bottom: 1px solid ${COLOR.NEUTRAL_300};
`

export const TaskCardSkeleton = styled.div`
  padding: 14px 30px;
  width: 100%;
  border-bottom: 1px solid ${COLOR.NEUTRAL_300};
`
