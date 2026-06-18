import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Role } from "@features/recruitment/components/role"
import { Detail } from "@features/recruitment/list/components/project-item/sections/detail"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "article",
  padding: "2rem",
  borderRadius: "1rem",
  borderWidth: "1px",
  borderColor: "DARK",
  backgroundColor: "WHITE",
})`
  box-shadow: 0px 4px 16px 0px rgba(36, 36, 36, 0.08);

  ${MEDIA.UNDER_MOBILE} {
    padding: 1.5rem;
  }
`

export const BadgesAndLiked = styled(HStack).attrs({
  align: "center",
  justify: "space-between",
  marginBottom: "0.5rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    margin-bottom: 1.25rem;
  }
`

export const Information = styled(HStack).attrs({
  spacing: "2rem",
  align: "center",
  justify: "between",
  wrap: true.toString(),
})`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-areas:
    "title detail"
    "role role";
  column-gap: 0.5rem;

  ${MEDIA.UNDER_MOBILE} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "role"
      "detail";
    row-gap: 0.5rem;

    margin-bottom: 1rem;
    flex-direction: column;
    gap: 0;
  }
`

export const TitleAndDate = styled(VStack).attrs({
  spacing: "0.25rem",
})`
  order: 0;

  ${MEDIA.UNDER_MOBILE} {
    margin-bottom: 1.5rem;
  }
`

export const Title = styled(Text).attrs({
  as: "h1",
  typo: "sub1",
  weight: "bold",
  color: "BLACK",
  whiteSpace: "pre-wrap",
  truncated: 2,
})`
  grid-area: title;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1}
  }
`

export const GridRole = styled(Role)`
  grid-area: role;
`

export const GridDetail = styled(Detail)`
  grid-area: detail;
`
