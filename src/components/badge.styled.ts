import { Text } from "@components/shared-components/text"
import { BUTTON, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled, { css } from "styled-components"

const colorMap = {
  primary: {
    textColor: TEXT.WHITE,
    badgeColor: BUTTON.PRIMARY_ENABLED,
    outlineTextColor: TEXT.HIGH_EMPHASIS,
  },
  disabled: {
    textColor: TEXT.SECONDARY,
    badgeColor: BUTTON.DISABLED,
    outlineTextColor: TEXT.SECONDARY,
  },
} as const

type BadgeProps = {
  styleVariant?: "solid" | "outline"
  colorVariant?: "primary" | "disabled"
}

export const Badge = styled(Text).attrs({
  as: "span",
  typo: "body1",
})<BadgeProps>(({ styleVariant = "solid", colorVariant = "primary" }) => {
  const baseStyle = css`
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid transparent;

    ${MEDIA.UNDER_MOBILE} {
      ${typography.caption}
      padding: 0.125rem 0.62rem;
    }
  `

  const colorStyle = css`
    --badge-color: ${colorMap[colorVariant].badgeColor};
    --badge-text-color: ${colorMap[colorVariant].textColor};
    --badge-outline-text-color: ${colorMap[colorVariant].outlineTextColor};
  `

  const variantStyle = css({
    backgroundColor:
      styleVariant === "solid" ? "var(--badge-color)" : "transparent",
    borderColor:
      styleVariant === "outline" ? "var(--badge-color)" : "transparent",
    color:
      styleVariant === "solid"
        ? "var(--badge-text-color)"
        : "var(--badge-outline-text-color)",
  })

  return css`
    ${baseStyle}
    ${colorStyle}
    ${variantStyle}
  `
})
