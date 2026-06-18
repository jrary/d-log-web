import { HStack, Stack } from "@components/shared-components/stack"
import { COLOR } from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"
import type { StackProps } from "@components/shared-components/stack"

export const Field = styled(Stack).attrs(
  ({ direction = "vertical" }: StackProps) => ({
    direction,
    justify: "between",
    spacing: "1rem",
  }),
)``

export const Label = styled(HStack).attrs({
  as: "label",
  align: "center",
  spacing: "0.62rem",
})`
  ${typography.body1}
  color: ${COLOR.GRAY_70};

  svg {
    width: 1.5rem;
    height: auto;
  }
`
