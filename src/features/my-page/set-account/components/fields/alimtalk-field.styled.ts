import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  align: "center",
  justify: "between",
  width: "100%",
})``

export const Label = styled(Text).attrs({
  as: "span",
  typo: "body3",
  color: "SECONDARY",
})``
