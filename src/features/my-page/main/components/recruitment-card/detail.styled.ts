import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  COLOR,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  width: "100%",
  paddingVertical: "1.875rem",
  paddingHorizontal: "1.625rem",
  justify: "center",
  align: "start",
  spacing: "1.5rem",
  backgroundColor: "WHITE",
  borderRadius: "1rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    min-height: 14.75rem;
    padding: 1.25rem 1.25rem 1.5rem;
    background-color: ${BACKGROUND.DEFAULT};
    gap: 1rem;
  }
`

export const ExpectedDate = styled(Text).attrs({
  typo: "body1",
  color: "SECONDARY",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`

export const Content = styled(VStack).attrs({
  width: "100%",
  spacing: "0.88rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    height: 9.87rem;
    flex-direction: row;
    gap: 1.25rem;
  }
`

export const ProgressBar = styled(VStack).attrs({
  width: "100%",
  height: "0.375rem",
  spacing: "0.88rem",
  borderRadius: "6.25rem",
  backgroundColor: "DEFAULT",
})`
  position: relative;

  ${MEDIA.UNDER_MOBILE} {
    width: 0.375rem;
    height: 100%;
    background-color: ${BACKGROUND.DARK};
  }
`

export const ProgressFill = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.progress}%;
  height: 0.375rem;
  border-radius: 6.25rem;
  background: ${(props) =>
    props.progress === 100 ? COLOR.NEUTRAL_400 : BORDER.PRIMARY};

  ${MEDIA.UNDER_MOBILE} {
    width: 0.375rem;
    height: ${(props) => props.progress}%;
  }
`

export const ProgressIndicator = styled.div<{ progress: number }>`
  position: absolute;
  top: -0.3rem;
  left: calc(${(props) => props.progress}% - 0.3rem);
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background: ${(props) =>
    props.progress === 100 ? COLOR.NEUTRAL_400 : BORDER.PRIMARY};
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.1));

  ${MEDIA.UNDER_MOBILE} {
    top: calc(${(props) => props.progress}% - 0.3rem);
    left: -0.3rem;
  }
`

export const ProgressLabel = styled(VStack).attrs({
  as: "dl",
})`
  ${MEDIA.UNDER_MOBILE} {
    align-items: start;
  }
`

export const Labels = styled(HStack).attrs({
  width: "100%",
  justify: "between",
})`
  ${MEDIA.UNDER_MOBILE} {
    align-items: start;
    height: 100%;
    flex-direction: column;
    gap: 1rem;
  }

  ${ProgressLabel}:nth-child(1) {
    align-items: start;
  }

  ${ProgressLabel}:nth-child(2) {
    align-items: center;
    ${MEDIA.UNDER_MOBILE} {
      align-items: start;
    }
  }

  ${ProgressLabel}:nth-child(3) {
    align-items: end;
    ${MEDIA.UNDER_MOBILE} {
      align-items: start;
    }
  }
`

export const Label = styled(Text).attrs({
  as: "dt",
  typo: "body3",
  weight: "bold",
})`
  ${MEDIA.UNDER_MOBILE} {
    font-weight: 500;
  }
`

export const Date = styled(Text).attrs({
  as: "dd",
  typo: "body3",
  color: "SECONDARY",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption}
  }
`
