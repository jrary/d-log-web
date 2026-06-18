import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR, ICON, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Role as BaseRole } from "@features/recruitment/components/role"
import styled from "styled-components"

export const Container = styled(HStack).attrs({
  maxWidth: "67.5rem",
  marginHorizontal: "auto",
  paddingVertical: "5.25rem",
  spacing: "1rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    padding: 1.5rem 1.25rem;
    flex-direction: column;
    gap: 2rem;
  }
`

export const Left = styled(VStack).attrs({
  spacing: "3rem",
})`
  flex: 1;

  ${MEDIA.UNDER_MOBILE} {
    gap: 0.75rem;
  }
`

export const Information = styled(VStack).attrs({
  spacing: "1.5rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.75rem;
  }
`

export const Role = styled(BaseRole)`
  width: fit-content;
  padding: 0.75rem 4rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
    padding: 0.5rem;
  }
`

export const Title = styled(Text).attrs({
  as: "h1",
  typo: "t2",
  weight: "bold",
  truncated: 2,
})`
  max-width: 50rem;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3}
  }
`

export const Right = styled(VStack).attrs({
  align: "end",
  justify: "between",
})`
  ${MEDIA.UNDER_MOBILE} {
    align-items: center;
    flex-direction: row-reverse;
    gap: 0.75rem;
  }
`

export const Pinned = styled(HStack).attrs({
  as: "button",
  width: "fit-content",
  align: "center",
  spacing: "0.25rem",
  paddingVertical: "0.38rem",
  paddingHorizontal: "0.62rem",
  borderWidth: "1px",
  borderRadius: "6.25rem",
  borderColor: "LIGHT",
  backgroundColor: "WHITE",
})`
  ${typography.body3}

  cursor: pointer;
  color: ${TEXT.SECONDARY};

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${ICON.TERTIARY};
  }

  &[data-liked="true"] {
    color: ${TEXT.HIGH_EMPHASIS};
    background-color: ${COLOR.GREEN_200};
    border-color: ${COLOR.GREEN_300};

    svg {
      color: ${ICON.PRIMARY};
    }
  }
`

export const Summary = styled(VStack).attrs({
  spacing: "1rem",
})`
  dt {
    ${typography.sub1}
    color: ${TEXT.SECONDARY}
  }

  dd {
    ${typography.t2}
    font-weight: 700;
  }

  ${MEDIA.UNDER_MOBILE} {
    gap: 0.25rem;

    dl {
      gap: 0.62rem;

      dt,
      dd {
        ${typography.body2}
      }
    }
  }
`
