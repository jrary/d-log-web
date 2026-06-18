import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BACKGROUND, BORDER } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  width: "100%",
  marginHorizontal: "auto",
  paddingHorizontal: "2rem",
  paddingVertical: "2.25rem",
  justify: "center",
  align: "center",
  spacing: "1.5rem",
})`
  border-radius: 0.5rem;
  background: ${BACKGROUND.DEFAULT};

  ${MEDIA.UNDER_MOBILE} {
    padding: 1.5rem 1.25rem;
    gap: 1rem;
    background: ${BACKGROUND.WHITE};
    border: 1px solid ${BORDER.LIGHT};
  }
`

export const Content = styled(VStack).attrs({
  as: "section",
  width: "100%",
  justify: "center",
  spacing: "1rem",
})``

export const Title = styled(Text).attrs({
  as: "p",
  typo: "sub2",
  color: "DEFAULT",
  weight: "bold",
})`
  white-space: pre-wrap;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1}
  }
`

export const Status = styled(Text).attrs({
  as: "span",
  typo: "body1",
})`
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid ${BORDER.SUCCESS};
  background: ${BACKGROUND.TERTIARY};
  text-align: center;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
    padding: 0.5rem;
    margin: 0rem;
    width: 100%;
    white-space: pre-wrap;
  }
`

export const DashboardText = styled(Text).attrs({
  as: "p",
  typo: "caption",
  color: "SECONDARY",
})``

export const LinkContainer = styled(Link)<{ isActive: boolean }>`
  width: 100%;
  align-items: center;
  justify-content: end;
  gap: 0.12rem;
  display: ${(props) => (props.isActive ? "flex" : "none")};
  text-decoration: none;
`
