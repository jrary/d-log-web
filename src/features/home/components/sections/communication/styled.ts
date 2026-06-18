import { BACKGROUND, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7.5rem 0;
  background: ${BACKGROUND.SECONDARY};

  ${MEDIA.UNDER_MOBILE} {
    padding: 2.5rem 1.25rem 6.25rem;
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
    width: 2rem;
    height: 2.625rem;
  }
`

export const BannerImage = styled.img`
  display: block;
  width: 63.56rem;
  margin: 6.19rem 0 0 0;

  ${MEDIA.UNDER_MOBILE} {
    display: none;
  }
`

export const BannerImageMobile = styled.img`
  display: none;
  height: auto;
  width: 100%;
  max-width: 38rem;
  margin: 3.12rem 0 0;

  ${MEDIA.UNDER_MOBILE} {
    display: block;
  }
`
