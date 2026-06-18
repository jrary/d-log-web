import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  width: "100%",
  spacing: "0.75rem",
  align: "end",
})`
  ${MEDIA.UNDER_MOBILE} {
    align-items: start;
  }
`

export const Contents = styled(VStack).attrs({
  maxWidth: "12rem",
  spacing: "1rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.25rem;
    margin-top: 1rem;
  }
`

export const Item = styled(HStack).attrs({
  as: "dl",
  align: "center",
  justify: "space-between",
  spacing: "1rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    justify-content: start;
  }
`

export const Label = styled(Text).attrs({
  as: "dt",
  typo: "body1",
  color: "SECONDARY",
  align: "right",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const Wage = styled(Text).attrs({
  as: "dd",
  typo: "sub2",
  color: "BLACK",
  align: "right",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const Apply = styled(Text).attrs({
  as: "dd",
  typo: "sub2",
  color: "WORKER_GREEN",
  align: "right",
})`
  color: ${TEXT.WORKER_GREEN};

  &[data-complete="true"] {
    color: ${TEXT.SECONDARY};
  }

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`
