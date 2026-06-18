import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  width: "100%",
  paddingVertical: "2.75rem",
  align: "center",
  justify: "center",
  spacing: "1.25rem",
  borderRadius: "0.625rem",
  backgroundColor: "DEFAULT",
})`
  ${MEDIA.UNDER_MOBILE} {
    padding: 2.31rem 0;
  }
`

export const Title = styled(Text).attrs({
  typo: "sub2",
  weight: "bold",
  color: "DEFAULT",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1}
  }
`

export const FileButton = styled(Text).attrs({
  typo: "body1",
  color: "SECONDARY",
})`
  cursor: pointer;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const FileField = styled(HStack).attrs({
  justify: "center",
  spacing: "1.19rem",
})``

export const ProfileImg = styled.img`
  height: 6.87rem;
  width: 6.87rem;
  border-radius: 50%;
  object-fit: cover;

  ${MEDIA.UNDER_MOBILE} {
    width: 4.625rem;
    height: 4.625rem;
  }
`
