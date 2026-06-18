import { Box } from "@components/shared-components/box"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BUTTON } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  as: "article",
  align: "center",
  justify: "between",
  borderColor: "LIGHT",
  paddingBottom: "3.75rem",
  borderBottomWidth: "1px",
})`
  &:last-child {
    padding-bottom: 0;
    border-bottom-width: 0;
  }

  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    gap: 2rem;
  }
`

export const Content = styled(VStack).attrs({
  spacing: "36px",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 1rem;
  }
`

export const TextContent = styled(VStack).attrs({
  spacing: "19px",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.38rem;
  }
`

export const Title = styled(Text).attrs({
  as: "h2",
  typo: "sub1",
  weight: "bold",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3}
    white-space: normal;
    word-break: keep-all;
  }
`

export const Highlight = styled.span`
  box-shadow: inset 0px -0.625rem 0px 0px #b4f2d1;
`

export const Description = styled(Text).attrs({
  as: "p",
  typo: "body1",
  color: "NEUTRAL",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const Tags = styled(HStack).attrs({
  align: "center",
  spacing: "8px",
  flexWrap: true,
})``

export const Tag = styled(Box).attrs({
  backgroundColor: "DARK",
  color: "SECONDARY",
  paddingVertical: "4px",
  paddingHorizontal: "10px",
  borderRadius: "4px",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${Text} {
      ${typography.caption}
    }
  }
`

export const Card = styled(Box).attrs({
  borderRadius: "20px",
  overflow: "hidden",
  maxWidth: "530px",
})`
  display: grid;
  grid-template-columns: 240px 1fr;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.05);

  ${MEDIA.UNDER_MOBILE} {
    grid-template-columns: 1fr;
  }
`

export const CardThumbnail = styled(VStack).attrs({
  justify: "center",
  paddingVertical: "4px",
  paddingLeft: "20px",
  borderRadius: "4px",
  spacing: "12px",
})<{ bgColor: string; textColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};

  ${MEDIA.UNDER_MOBILE} {
    gap: 0.88rem;
    flex-direction: row;
    padding: 1.44rem 1.25rem;
  }
`

export const CardTitle = styled(Text).attrs({
  as: "h3",
  typo: "sub3",
  weight: "medium",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const CardContent = styled(VStack).attrs({
  spacing: "14px",
  padding: "24px",
  paddingBottom: "28px",
})``

export const CardTextContainer = styled(VStack).attrs({
  spacing: "8px",
})``

export const CardHeader = styled(Text).attrs({
  as: "h4",
  typo: "body3",
  weight: "bold",
  color: "TERTIARY",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const CardDescription = styled(Text).attrs({
  as: "p",
  typo: "body3",
  whiteSpace: "pre-wrap",
})`
  word-break: keep-all;
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const CardLink = styled(Link)`
  margin-left: auto;
  display: inline-block;
  padding: 10px 12px;
  background-color: ${BUTTON.LIGHT};
  border-radius: 4px;
  width: fit-content;

  text-decoration: none;
`

export const CardLinkText = styled(Text).attrs({
  as: "span",
  typo: "body3",
  weight: "medium",
  color: "HIGH_EMPHASIS",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`
