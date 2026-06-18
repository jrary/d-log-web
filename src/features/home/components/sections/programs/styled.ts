import { BACKGROUND, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7.5rem 0;
  background: ${BACKGROUND.WHITE};

  ${MEDIA.UNDER_MOBILE} {
    padding: 2.5rem 1.25rem 10rem;
  }
`

export const Title = styled.h1`
  ${typography.t2};
  font-weight: 700;
  text-align: center;
  white-space: pre-wrap;
  margin: 1.75rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3};
    font-weight: 700;
    margin: 1.25rem 0 0 0;
  }
`

export const SubTitle = styled.p`
  ${typography.sub2};
  color: ${TEXT.HIGH_EMPHASIS};
  margin: 1rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const Description = styled.p`
  ${typography.sub3};
  color: ${TEXT.SECONDARY};
  text-align: center;
  white-space: pre-wrap;
  margin: 1.25rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const Icon = styled.img`
  width: 3.875rem;
  height: 5rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 2.375rem;
    height: 2.625rem;
  }
`
