import { HStack, VStack } from "@components/shared-components/stack"
import {
  BACKGROUND,
  BORDER,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  minWidth: "20rem",
  padding: "1.25rem",
  paddingBottom: "1.5rem",
  backgroundColor: "WHITE",
  borderRadius: "0.5rem",
  borderWidth: "0.06rem",
  borderColor: "LIGHT",
  spacing: "1rem",
})<{ category: "filter" | "folder" | null }>`
  position: absolute;
  top: 100%;
  left: ${(props) => (props.category === "folder" ? "3.65rem" : "0%")};
  z-index: 1;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
`

export const TabContainer = styled(HStack).attrs({
  spacing: "0.62rem",
})``

export const Tab = styled(HStack).attrs({
  align: "center",
  paddingVertical: "0.44rem",
  paddingHorizontal: "0.38rem",
  spacing: "0.38rem",
})<{ isClicked: boolean }>`
  cursor: pointer;

  ${typography.body3}
  color: ${(props) => (props.isClicked ? TEXT.DEFAULT : TEXT.SECONDARY)};
  background-color: ${(props) =>
    props.isClicked ? BACKGROUND.DEFAULT : BACKGROUND.WHITE};

  &:hover {
    background-color: ${BACKGROUND.DEFAULT};
  }
`

export const SelectContainer = styled(VStack).attrs({})``

export const Item = styled(HStack).attrs({
  justify: "between",
  paddingVertical: "0.44rem",
  paddingHorizontal: "0.38rem",
})`
  cursor: pointer;
  ${typography.body3}

  &:hover {
    background-color: ${BACKGROUND.DEFAULT};
  }
`

export const Line = styled.div`
  height: 0.06rem;
  background: ${BORDER.LIGHT};
`
