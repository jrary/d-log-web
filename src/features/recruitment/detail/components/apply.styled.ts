import { FormControl } from "@components/form/form-control"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  width: "20rem",
  spacing: "1.25rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
  }
`

export const Title = styled(Text).attrs({
  as: "h2",
  typo: "sub2",
  weight: "bold",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1}
  }
`

export const Field = styled(FormControl.Container)`
  gap: 0.25rem;

  ${FormControl.Label} {
    ${typography.body1};
    font-weight: normal;
    color: ${TEXT.SECONDARY};

    ${MEDIA.UNDER_MOBILE} {
      ${typography.body3};
    }
  }
`
