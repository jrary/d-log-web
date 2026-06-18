import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  maxWidth: "64.5rem",
  marginHorizontal: "auto",
  paddingVertical: "4rem",

  width: "100%",
})`
  ${MEDIA.UNDER_MOBILE} {
    padding: 1rem 1.25rem 1.5rem;
    gap: 0.62rem;
  }
`

export const Profile = styled(VStack).attrs({
  spacing: "1rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    flex-direction: row;
  }
`

export const ProfilePicture = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 3.75rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 2.75rem;
    height: 2.75rem;
  }
`

export const Title = styled(Text).attrs({
  as: "h1",
  typo: "sub2",
  weight: "bold",
  color: "BLACK",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const BadgeContainer = styled(HStack).attrs({
  marginTop: "1.06rem",
  spacing: "0.75rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    margin: 0 0 0 3.5rem;
  }
`

export const Badge = styled(VStack).attrs({
  paddingVertical: "0.25rem",
  paddingHorizontal: "1rem",
})`
  ${typography.caption}
  border-radius: 0.25rem;
  background: ${COLOR.YELLOW_100};
  color: ${COLOR.YELLOW_400};

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.25rem 0.62rem;
  }
`
