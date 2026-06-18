import { Button } from "@components/button.styled"
import { Text } from "@components/shared-components/text"
import { BORDER } from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const AddButton = styled(Button).attrs({
  size: "xl",
  variant: "primary",
})<{ isSideMenuOpen: boolean }>`
  ${typography.body1}
  display: ${(props) => (!props.isSideMenuOpen ? "inline-block" : "none")};
  width: 12.5rem;
  height: 3.38rem;
`

export const Line = styled.div`
  height: 0.06rem;
  background-color: ${BORDER.DARK};
`

export const ListTitle = styled(Text).attrs({
  weight: "bold",
  color: "DEFAULT",
})`
  font-size: 1.375rem;
  line-height: 2rem;
  letter-spacing: -0.06875rem;
`
