import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  spacing: "1.25rem",
})``

export const Title = styled(Text).attrs({
  typo: "body1",
})``

export const ListContainer = styled(VStack).attrs({
  paddingVertical: "1.25rem",
  paddingHorizontal: "1.625rem",
  spacing: "1rem",
  borderWidth: "0.06rem",
  borderColor: "DARK",
  borderRadius: "0.5rem",
  backgroundColor: "WHITE",
})`
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 135, 0.04);
`

export const Item = styled(VStack).attrs({
  paddingVertical: "0.875rem",
  paddingHorizontal: "1.25rem",
  borderWidth: "0.06rem",
  borderColor: "DARK",
  backgroundColor: "DEFAULT",
})``

export const HistoryButton = styled(VStack).attrs({
  paddingVertical: "0.75rem",
  paddingHorizontal: "0.875rem",
  align: "center",
  borderWidth: "0.06rem",
  borderColor: "LIGHT",
  borderRadius: "0.25rem",
  backgroundColor: "WHITE",
})`
  flex: 1;
  cursor: pointer;
`
