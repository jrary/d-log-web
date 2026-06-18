import { Button } from "@components/button.styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  COLOR,
  TEXT,
} from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  as: "section",
  paddingVertical: "1rem",
  paddingHorizontal: "1.5rem",
  spacing: "0.62rem",
  borderColor: "LIGHT",
  borderWidth: "0.06rem",
  backgroundColor: "WHITE",
})<{ isActive: boolean }>`
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? "#0F770B" : BACKGROUND.WHITE};
`

export const Item = styled(VStack).attrs({
  justify: "center",
  spacing: "0.31rem",
})<{ flexRatio: number; isSideMenuOpen: boolean }>`
  flex: ${(props) => props.flexRatio};
  display: ${(props) => (!props.isSideMenuOpen ? "flex" : "none")};

  .svg {
    width: 100rem;
  }
`

export const Title = styled(Text).attrs({
  as: "h3",
  typo: "sub2",
  color: "DEFAULT",
})<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? TEXT.WHITE : TEXT.DEFAULT)};
  word-break: keep-all;
`

export const Content = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "SECONDARY",
})<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? TEXT.WHITE : TEXT.SECONDARY)};
  word-break: keep-all;
`

export const ProgressBar = styled(VStack).attrs({
  width: "100%",
  height: "0.75rem",
  spacing: "0.88rem",
  borderRadius: "62rem",
  backgroundColor: "SECONDARY",
})`
  position: relative;
`

export const ProgressFill = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.progress}%;
  height: 0.75rem;
  border-radius: 62rem;
  background: ${BORDER.PRIMARY};
`

export const ShowButton = styled(Button).attrs({
  variant: "ghost",
  size: "s",
  square: true,
})<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? TEXT.WHITE : TEXT.SECONDARY)};
  word-break: keep-all;

  ${(props) =>
    props.isActive && `&:hover{ background-color:${COLOR.GREEN_700}; }`}
`
