import { Button } from "@components/button.styled"
import { HStack, Stack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  COLOR,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import * as Popover from "@radix-ui/react-popover"
import { Link } from "react-router"
import styled from "styled-components"
import type { StackProps } from "@components/shared-components/stack"
import type { LinkProps } from "react-router"

export const Container = styled(VStack).attrs({
  paddingVertical: "2.25rem",
  paddingHorizontal: "2rem",
  borderRadius: "0.5rem",
  backgroundColor: "white",
  spacing: "1.5rem",
})`
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 135, 0.04);
`

export const Header = styled(HStack).attrs({
  align: "center",
  justify: "between",
})`
  cursor: pointer;
`

export const Title = styled(Text).attrs({
  typo: "sub1",
  weight: "bold",
})`
  word-break: keep-all;
`

export const Status = styled(HStack).attrs({
  align: "center",
  paddingHorizontal: "1rem",
  paddingVertical: "0.25rem",
  borderRadius: "999rem",
  backgroundColor: "WHITE",
})`
  ${typography.body3}
  font-weight: 500;

  &[data-status="NOT_STARTED"] {
    background-color: ${BACKGROUND.LIGHT_PRIMARY};
    color: ${TEXT.SECONDARY};
  }

  &[data-status="IN_PROGRESS"] {
    background-color: ${BACKGROUND.PRIMARY};
    color: ${TEXT.WHITE};
  }

  &[data-status="COMPLETE"] {
    background-color: ${BACKGROUND.LIGHT_PRIMARY};
    color: ${TEXT.SECONDARY};
  }

  &[data-status="OVERDUE"] {
    background-color: ${COLOR.RED_200};
    color: ${TEXT.WHITE};
  }
`

export const Content = styled(VStack).attrs({
  spacing: "1rem",
})``

export const ContentItem = styled(Stack).attrs(
  ({ direction = "horizontal" }: StackProps) => ({
    direction,
    as: "dl",
    justify: "between",
    spacing: "1rem",
  }),
)``

export const ContentTitle = styled(HStack).attrs({
  as: "dt",
  align: "center",
  spacing: "0.5rem",
})``

export const ContentValue = styled(HStack).attrs({
  as: "dd",
  spacing: "0.5rem",
})`
  ${typography.body1}
  color: ${TEXT.HIGH_EMPHASIS};
`

export const Features = styled(HStack).attrs({
  as: "dd",
  justify: "between",
  align: "center",
  spacing: "1rem",
  paddingLeft: "2.25rem",
})``

export const FeatureItem = styled(HStack).attrs({
  padding: "0.62rem",
  justify: "center",
  borderRadius: "0.25rem",
  borderWidth: "0.06rem",
  borderColor: "DARK",
  backgroundColor: "WHITE",
})`
  ${typography.body1}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  cursor: pointer;

  &:hover {
    background-color: ${BACKGROUND.DARK};
  }
`

export const Task = styled(Text).attrs({
  typo: "body1",
})`
  padding: 0.62rem;

  border-radius: 0.25rem;
  border: 1px solid ${BORDER.DARK};
  background: ${BACKGROUND.LIGHT_PRIMARY};
`

export const PopoverContent = styled(Popover.Content).attrs({
  side: "bottom",
  align: "end",
})`
  display: flex;
  flex-direction: column;

  width: 7rem;

  background-color: ${BACKGROUND.WHITE};
  border-radius: 0.5rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 135, 0.04);
`

export const Action = styled(Button).attrs({
  variant: "ghost",
  size: "m",
})`
  ${typography.body1}

  border: solid 1px ${BORDER.PRIMARY};
  border-radius: 0;

  &:not(:last-child) {
    border-bottom: none;
  }
`

export const Detail = styled(Action).attrs({
  as: Link,
})<LinkProps>`
  text-decoration: none;
`
