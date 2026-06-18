import { Text } from "@components/shared-components/text"
import { BACKGROUND, BORDER } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(Text).attrs({
  as: "p",
  typo: "body1",
  align: "center",
  whiteSpace: "nowrap",
  keepAll: true,
})`
  order: 1;
  width: 100%;

  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid ${BORDER.SUCCESS};
  background: ${BACKGROUND.TERTIARY};

  &[data-complete="true"] {
    border-color: ${BORDER.DARK};
    background: ${BACKGROUND.DARK};
  }

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}

    order: 0;
    padding: 0.5rem;
    white-space: pre-wrap;
  }
`
