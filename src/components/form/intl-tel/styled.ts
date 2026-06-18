import * as TextField from "@components/form/text-field/styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { BACKGROUND, BORDER } from "@components/shared-components/tokens/color"
import * as Popover from "@radix-ui/react-popover"
import styled from "styled-components"

export const Button = styled.button`
  appearance: none;
  border: none;
  background: none;

  display: flex;
  align-items: center;
  gap: 10px;

  height: 1.5rem;

  cursor: pointer;
`

export const CountryFlag = styled.span`
  font-size: 20px;
`

export const PopoverContent = styled(Popover.Content)`
  border-radius: 0.25rem;

  border: 1px solid ${BORDER.DARK};
  background-color: ${BACKGROUND.WHITE};

  width: 20rem;
  overflow: hidden;

  box-shadow: -4px 0px 20px 0px rgba(0, 0, 0, 0.03);
`

export const SearchForm = styled(HStack).attrs({
  paddingVertical: "0.62rem",
  paddingHorizontal: "1rem",
})`
  ${TextField.Container} {
    padding: 0.75rem;
  }
`

export const CountryList = styled(VStack)`
  max-height: 14rem;
  overflow-y: auto;
`
