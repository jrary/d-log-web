import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

/** Task Card */

export const TaskCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 50px;

  padding: 14px 10px;

  border-bottom: 1px solid ${COLOR.NEUTRAL_300};
`

export const SubIconBox = styled.div`
  margin-left: 20px;
`

export const TitleButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  text-align: left;
`

export const Title = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
`

/** Task Card Input */
export const TaskCardInputWrapper = styled(TaskCardWrapper)`
  flex: 1;
  width: 100%;
  padding: 0 10px;
  margin: 0;

  background-color: ${COLOR.NEUTRAL_200};
  border-width: 0 0 1px 0;
  border-color: ${COLOR.NEUTRAL_300};
  border-style: solid;
`

export const TaskCardInputContent = styled.input`
  flex: 1;
  width: 100%;
  height: 50px;
  padding: 0;
  margin: 0;

  background-color: transparent;
  color: ${COLOR.NEUTRAL_900};

  font-weight: 400;
  border: none;
  outline: none;

  ${typography.body3}

  &::placeholder {
    color: ${COLOR.NEUTRAL_400};
  }

  &[data-error="true"] {
    border-color: ${COLOR.RED_300};
    color: ${COLOR.RED_500};
  }
`

export const TaskCardEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    height: 100%;
  }
`
