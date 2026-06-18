import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"
import Profile from "~icons/local/ic_project_profile"

export const Container = styled(VStack).attrs({
  align: "center",
  spacing: "1.25rem",
})``

export const Members = styled(VStack).attrs({
  align: "center",
  spacing: "0.75rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    justify-content: center;
    flex-direction: row;
  }
`

export const ProfileImage = styled(Profile)`
  ${MEDIA.UNDER_MOBILE} {
    width: 1.25rem;
    height: 1.25rem;
  }
`

export const AppliedMember = styled(Text).attrs({
  typo: "sub3",
  weight: "medium",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const Comment = styled(VStack).attrs({
  as: "dl",
  spacing: "0.5rem",
  padding: "1.5rem",
  width: "100%",
  borderWidth: "1px",
  borderColor: "LIGHT",
  backgroundColor: "DEFAULT",
  borderRadius: "1rem",
})`
  dt {
    font-weight: 700;
  }

  dd {
    color: ${TEXT.SECONDARY};
  }

  ${MEDIA.UNDER_MOBILE} {
    gap: 0.5rem;
    padding: 1.25rem 1.25rem 1.5rem;

    dt,
    dd {
      ${typography.body3}
    }
  }
`
