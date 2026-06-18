import { Box } from "@components/shared-components/box"
import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BACKGROUND } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { ZIndex } from "@components/shared-components/tokens/z-index"
import styled, { createGlobalStyle } from "styled-components"
import { Header } from "@/layouts/global/header.styled"

export const Container = styled(HStack).attrs({
  as: "section",
  width: "100%",
  marginVertical: "3.25rem",
  marginHorizontal: "auto",
  spacing: "1.25rem",
})`
  display: none;

  ${MEDIA.UNDER_MOBILE} {
    display: flex;
    position: sticky;
    z-index: ${ZIndex.floating};
    top: 0;
    left: 0;
    right: 0;
    height: 3.25rem;
    margin: 0rem;
    background-color: ${BACKGROUND.WHITE};
    align-items: center;
  }
`

export const Button = styled(Box).attrs({})`
  position: absolute;
  top: 0.87rem;
  bottom: 0.87rem;
  left: 1.25rem;
`

export const Title = styled(Text).attrs({
  typo: "body1",
  color: "DEFAULT",
  weight: "bold",
  align: "center",
})`
  flex: 1;
`

export const GlobalStyle = createGlobalStyle`
  ${MEDIA.UNDER_MOBILE} {
    ${Header} {
      display: none;
    }
  }
`
