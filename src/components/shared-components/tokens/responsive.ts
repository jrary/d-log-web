export const BREAKPOINT = {
  MOBILE: 1080,
}

export const MEDIA = {
  UNDER_MOBILE: `@media screen and (max-width: ${BREAKPOINT.MOBILE - 1}px)`,
  OVER_MOBILE: `@media screen and (min-width: ${BREAKPOINT.MOBILE}px)`,
}
