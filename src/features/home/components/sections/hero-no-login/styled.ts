import { TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 45.5rem;
  width: 100%;
  object-fit: cover;
  z-index: -1;

  ${MEDIA.UNDER_MOBILE} {
    height: 60rem;
  }
`

export const Section = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  min-width: 960px;
  padding: 7.75rem 0 8.13rem;

  ${MEDIA.UNDER_MOBILE} {
    min-width: 20rem;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem 1.25rem 3.19rem;
  }
`

export const Content = styled.div`
  max-width: 62.5rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
    max-width: 35.625rem;
    padding: 0 3.44rem 0;
  }
`

export const Title = styled.h1`
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -2px;
  color: ${TEXT.WHITE};
  gap: 0.87rem;
  white-space: pre-wrap;
  margin: 0;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3};
    font-weight: 700;
  }
`

export const Description = styled.p`
  ${typography.sub2};
  color: ${TEXT.WHITE};
  white-space: pre-wrap;
  margin: 4.62rem 0 0 0;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption};
    margin: 1.25rem 0 0 0;
  }
`

export const HeroImage = styled.img`
  width: 35.625rem;
  height: auto;
  object-fit: contain;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
    max-width: 35.625rem;
    margin: 1.25rem 0 0 0;
  }
`
