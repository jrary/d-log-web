import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  paddingHorizontal: "1.25rem",
  paddingVertical: "1.5rem",
  overflowY: "auto",
  spacing: "1.25rem",
})`
  flex: 0 0 18.375rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ItemText = styled(Text).attrs({})`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const NavigationSkeletonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const NavigationSkeletonOpenedBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const NavigationSkeletonHr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLOR.NEUTRAL_300};
`
