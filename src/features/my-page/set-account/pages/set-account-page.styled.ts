import { FormControl } from "@components/form/form-control"
import { TextArea } from "@components/form/text-area"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Form as BaseForm } from "formik"
import { Link as BaseLink } from "react-router"
import styled from "styled-components"
import type { LinkProps } from "react-router"

export const Form = styled(VStack).attrs({
  as: BaseForm,
  spacing: "2.5rem",
})`
  padding: 3.56rem 0;

  ${MEDIA.UNDER_MOBILE} {
    padding: 0;
    gap: 1.87rem;
  }
`

export const Header = styled(VStack).attrs({})``

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

export const Fields = styled(VStack).attrs({
  spacing: "inherit",
})`
  ${FormControl.Field} {
    ${TextArea.Control} {
      min-height: 9rem;
    }
  }

  ${FormControl.Label} {
    ${typography.body1}
  }

  ${FormControl.Description} {
    ${typography.body3}
  }
`

export const Links = styled(HStack).attrs({
  align: "center",
  justify: "end",
  spacing: "1.5rem",
})``

export const Link = styled(Text).attrs({
  as: BaseLink,
  typo: "caption",
  color: "SECONDARY",
})<LinkProps>``
