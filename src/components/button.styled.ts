import {
  BACKGROUND,
  BORDER,
  BUTTON,
  COLOR,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import styled, { css } from "styled-components"

type ButtonProps = {
  size?: "2xl" | "xl" | "l" | "round" | "m" | "s" | "xs"
  variant?:
    | "primary"
    | "primary-ghost"
    | "alert"
    | "dark"
    | "ghost"
    | "darkSolid"
  boldText?: boolean
  fullWidth?: boolean
  square?: boolean
}

const buttonSizes = {
  "2xl": {
    padding: "1rem",
    borderRadius: "0.25rem",
    [MEDIA.UNDER_MOBILE]: {
      padding: "1rem 0.75rem",
    },
  },
  xl: {
    padding: "1rem",
    borderRadius: "0.25rem",
    [MEDIA.UNDER_MOBILE]: {
      padding: "0.62rem 0.75rem",
    },
  },
  l: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
  },
  round: {
    padding: "0.6875rem 2.25rem 0.8125rem 2.25rem",
    borderRadius: "3.125rem",
  },
  m: {
    padding: "0.62rem 1.66rem",
    borderRadius: "0.5rem",
    [MEDIA.UNDER_MOBILE]: {
      padding: "0.12rem 0.62rem",
    },
  },
  s: {
    padding: "0.25rem",
    borderRadius: "0.5rem",
  },
  xs: {
    padding: "0 0.5rem",
    borderRadius: "0.5rem",
  },
}

const buttonVariants = {
  primary: {
    color: TEXT.WHITE,
    backgroundColor: BUTTON.PRIMARY_ENABLED,
    "&:disabled": {
      color: TEXT.DISABLED,
      backgroundColor: BUTTON.DISABLED,
    },
  },
  "primary-outline": {
    color: TEXT.HIGH_EMPHASIS,
    backgroundColor: BUTTON.WHITE,
    border: "solid 1px",
    borderColor: BORDER.SECONDARY,
    "&:disabled": {
      color: TEXT.DISABLED,
      backgroundColor: BUTTON.DISABLED,
    },
  },
  "primary-ghost": {
    color: TEXT.HIGH_EMPHASIS,
    backgroundColor: BACKGROUND.TERTIARY,
    "&:hover": {
      backgroundColor: BUTTON.HOVER,
    },
    "&:disabled": {
      color: TEXT.DISABLED,
      backgroundColor: "transparent",
    },
  },
  secondary: {
    color: TEXT.HIGH_EMPHASIS,
    backgroundColor: BACKGROUND.TERTIARY,
    "&:hover": {
      backgroundColor: COLOR.GREEN_200,
    },
    "&:disabled": {
      color: TEXT.DISABLED,
      backgroundColor: "transparent",
    },
  },
  dark: {
    color: TEXT.DEFAULT,
    backgroundColor: BUTTON.WHITE,
    border: "solid 1px",
    borderColor: BORDER.DARK,
    "&:disabled": {
      color: TEXT.DISABLED,
      backgroundColor: BUTTON.DISABLED,
    },
  },
  alert: {
    color: TEXT.WHITE,
    backgroundColor: BUTTON.ALERT,
    "&:disabled": {
      color: TEXT.DISABLED,
      backgroundColor: BUTTON.DISABLED,
    },
  },
  ghost: {
    color: "inherit",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: BUTTON.HOVER,
    },
  },
  darkSolid: {
    color: COLOR.NEUTRAL_700,
    backgroundColor: "#E5E5F0",
    "&:disabled": {
      color: TEXT.DISABLED,
      backgroundColor: BUTTON.DISABLED,
    },
  },
}

export const Button = styled.button<ButtonProps>(
  ({
    size = "2xl",
    variant = "primary",
    boldText = false,
    fullWidth = false,
    square = false,
  }) => {
    const sizeStyle = css(buttonSizes[size])
    const variantStyle = css(buttonVariants[variant])
    const baseStyle = css`
      appearance: none;
      border: none;
      transition: background-color 0.2s ease-in-out;
      font-family: inherit;
      cursor: pointer;
      &:disabled {
        cursor: default;
      }
    `

    return css`
      ${baseStyle}
      ${sizeStyle}
      ${variantStyle}
      ${boldText && "font-weight: 700;"}
      ${fullWidth && "width: 100%;"}
      ${square && "aspect-ratio: 1/1;"}
    `
  },
)
