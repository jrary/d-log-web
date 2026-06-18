import { css } from "styled-components"
import type { Typography } from "@components/shared-components/text"
import type { CSSObject } from "styled-components"

export const token: Record<Typography, CSSObject> = {
  h1: {
    fontSize: "3rem",
    lineHeight: "4.375rem",
    letterSpacing: "-0.15rem",
  },
  h2: {
    fontSize: "2.5rem",
    lineHeight: "3.625em",
    letterSpacing: "-0.125rem",
  },
  h3: {
    fontSize: "2.25rem",
    lineHeight: "3.25rem",
    letterSpacing: "-0.1125rem",
  },
  t1: {
    fontSize: "2rem",
    lineHeight: "2.875rem",
    letterSpacing: "-0.1rem",
  },
  t2: {
    fontSize: "1.75rem",
    lineHeight: "2.563rem",
    letterSpacing: "-0.0875rem",
  },
  sub1: {
    fontSize: "1.5rem",
    lineHeight: "2.125rem",
    letterSpacing: "-0.075rem",
  },
  sub2: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    letterSpacing: "-1px",
  },
  sub3: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    letterSpacing: "-0.9px",
  },
  body: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "-0.05rem",
  },
  body1: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "-1px",
  },
  body2: {
    fontSize: "0.9375rem",
    lineHeight: "1.25rem",
    letterSpacing: "-0.075rem",
  },
  body3: {
    fontSize: "0.875rem",
    lineHeight: "1.375rem",
    letterSpacing: "-0.04rem",
  },
  caption: {
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    letterSpacing: "-0.0375rem",
  },
} as const

export const typography = {
  h1: css(token.h1),
  h2: css(token.h2),
  h3: css(token.h3),
  t1: css(token.t1),
  t2: css(token.t2),
  sub1: css(token.sub1),
  sub2: css(token.sub2),
  sub3: css(token.sub3),
  body: css(token.body),
  body1: css(token.body1),
  body2: css(token.body2),
  body3: css(token.body3),
  caption: css(token.caption),
}
