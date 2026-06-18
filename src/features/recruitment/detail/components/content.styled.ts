import { Box } from "@components/shared-components/box"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(Box).attrs({
  maxWidth: "72.5rem",
  marginHorizontal: "auto",
  paddingHorizontal: "1.25rem",
  paddingTop: "3.12rem",
  paddingBottom: "10rem",
})`
  display: grid;
  grid-template-columns: 1fr 22rem;
  gap: 1rem 1.25rem;

  ${MEDIA.UNDER_MOBILE} {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`

export const MobileLeft = styled.div`
  display: contents;

  ${MEDIA.UNDER_MOBILE} {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.88rem 1.25rem 2.5rem;
  }
`

export const Header = styled(HStack).attrs({
  align: "center",
  justify: "between",
})``

export const Title = styled(Text).attrs({
  as: "h2",
  typo: "sub2",
  weight: "medium",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1}
    font-weight: bold;
  }
`

export const Detail = styled.a`
  ${typography.body3}
  color: ${COLOR.GREEN_400};
`

export const Section = styled(Box).attrs({
  paddingHorizontal: "1.25rem",
  paddingVertical: "2.25rem",
  borderWidth: "1px",
  borderColor: "LIGHT",
  backgroundColor: "WHITE",
  borderRadius: "1rem",
  overflow: "hidden",
  height: "fit-content",
})``

export const Left = styled(Section)`
  grid-column: 1 / 2;
  min-height: 500px;

  ${MEDIA.UNDER_MOBILE} {
    padding: 0;
  }
`

export const Right = styled(Section).attrs({
  as: VStack,
  spacing: "1.25rem",
})`
  grid-column: 2 / 3;

  ${MEDIA.UNDER_MOBILE} {
    border: none;
    border-radius: 0;
    padding: 1.88rem 1.25rem 2.5rem;
  }
`
