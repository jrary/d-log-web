import { HStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  ICON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import { autocompleteClasses } from "@mui/material/Autocomplete"
import styled from "styled-components"

export const Info = styled(Text).attrs({
  typo: "caption",
  color: "TERTIARY",
})``

export const TagBox = styled(HStack).attrs({
  paddingVertical: "0.25rem",
  paddingHorizontal: "0.375rem",
  align: "center",
  justify: "between",
  spacing: "0.25rem",
  borderRadius: "0.25rem",
  backgroundColor: "DARK",
})`
  outline: 0;
  max-width: 15rem;

  & span {
    ${typography.body3};
    padding: 0;
    position: static;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  & svg {
    color: ${ICON.SECONDARY};
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
`

export const InputWrapper = styled(HStack).attrs({})`
  & input {
    ${typography.body3};
    border-radius: 4px;
    padding: 0.25rem 0;
    width: 100%;

    border: none;
    outline: none;

    &:focus {
      padding: 0.25rem 0.375rem;
      background-color: ${BACKGROUND.DARK};
    }

    &:disabled {
      visibility: hidden;
    }

    &::placeholder {
      color: ${TEXT.TERTIARY};
    }
  }
`

export const Listbox = styled.ul`
  position: absolute;
  flex-direction: column;
  width: 20.25rem;
  padding: 0.625rem;
  flex-direction: column;

  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 370px;

  border-radius: 0.5rem;
  border: 1px solid white;
  background: ${BACKGROUND.WHITE};
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  z-index: 1;

  & li {
    ${typography.body3};
    color: ${TEXT.SECONDARY};
    padding: 0.4375rem 0.375rem;
    margin-top: 0.38rem;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    flex-grow: 1;
  }

  & li[aria-selected="true"] {
    color: ${TEXT.HIGH_EMPHASIS};
    background: ${BACKGROUND.TERTIARY};
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${BACKGROUND.DEFAULT};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`

export const Preview = styled(HStack).attrs({
  justify: "between",
  typo: "body3",
  paddingVertical: "0.0625rem",
  paddingHorizontal: "0.375rem",
  backgroundColor: "DEFAULT",
  align: "center",
  spacing: "0.625rem",
  marginTop: "0.5rem",
})`
  & span {
    max-width: 14rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`

export const ConfirmButton = styled(Text).attrs({
  typo: "caption",
  color: "SECONDARY",
  marginVertical: "0.5rem",
  marginHorizontal: "0.75rem",
})`
  cursor: pointer;
`
