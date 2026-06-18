import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  width: "100%",
  marginVertical: "3.25rem",
  marginHorizontal: "auto",
  spacing: "1.25rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    margin: 0rem;
    gap: 1.25rem;
  }
`

export const TitleContainer = styled(VStack).attrs({
  spacing: "0.25rem",
})``

export const Title = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "DEFAULT",
  weight: "bold",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
    font-weight: 500;
  }
`

export const Description = styled(Text).attrs({
  as: "p",
  typo: "body3",
  color: "SECONDARY",
})``

export const Progress = styled(VStack).attrs({
  as: "div",
  paddingTop: "1rem",
  paddingHorizontal: "1.875rem",
  paddingBottom: "1.25rem",
  align: "center",
  spacing: "0.88rem",
})`
  border-radius: 0.5rem;
  background: ${BACKGROUND.DEFAULT};

  ${MEDIA.UNDER_MOBILE} {
    align-items: start;
    gap: 1rem;
  }
`

export const Total = styled(HStack).attrs({
  as: "div",
  spacing: "0.25rem",
})``

export const TotalCount = styled(Text).attrs({
  as: "p",
  typo: "body3",
  color: "HIGH_EMPHASIS",
})``

export const Line = styled(HStack).attrs({
  as: "div",
  width: "100%",
  height: "0.06rem",
})`
  background-color: ${BORDER.LIGHT};

  ${MEDIA.UNDER_MOBILE} {
    display: none;
  }
`

export const StateContainer = styled(HStack).attrs({
  as: "div",
  spacing: "6.25rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    gap: 1.25rem;
  }
`

export const State = styled(HStack).attrs({
  as: "div",
  align: "center",
  spacing: "0.62rem",
})``

export const Icon = styled(VStack).attrs({
  as: "div",
  align: "center",
  justify: "center",
  spacing: "1rem",
})`
  width: 2.625rem;
  height: 2.625rem;
  border-radius: 2.625rem;
  background-color: ${BACKGROUND.DARK};

  ${MEDIA.UNDER_MOBILE} {
    width: 2.25rem;
    height: 2.25rem;
  }
`

export const Data = styled(VStack).attrs({})``

export const Label = styled(Text).attrs({
  as: "p",
  typo: "body3",
  color: "DEFAULT",
})``

export const Count = styled(Text).attrs({
  as: "p",
  typo: "body3",
  color: "HIGH_EMPHASIS",
})`
  color: ${TEXT.TERTIARY};
  text-decoration: none;
  cursor: pointer;

  &[data-active="true"] {
    color: ${TEXT.HIGH_EMPHASIS};
    text-decoration: underline;
  }
`
