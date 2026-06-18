import {
  BACKGROUND,
  BUTTON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8.75rem 0 10rem;
  text-align: center;
  background: ${BACKGROUND.WHITE};

  ${MEDIA.UNDER_MOBILE} {
    padding: 2.5rem 1.25rem;
  }
`

export const TextContainer = styled.div`
  text-align: start;
  padding: 0 3rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
    padding: 0;
    min-width: 0rem;
    display: block;
  }
`

export const Content = styled.div`
  text-align: start;
  margin: 4.63rem 0 0 0;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const Title = styled.h1`
  ${typography.t2};
  font-weight: 700;
  white-space: pre-wrap;
  margin: 1.75rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3};
    margin: 1.25rem 0 0 0;
  }
`

export const SubTitle = styled.p`
  ${typography.sub2};
  font-weight: 500;
  color: ${TEXT.HIGH_EMPHASIS};
  margin: 1rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
    font-weight: 700;
  }
`

export const Description = styled.p`
  ${typography.sub3};
  color: ${TEXT.SECONDARY};
  white-space: pre-wrap;
  margin: 1.25rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const SubDescription = styled.p`
  ${typography.sub3};
  color: ${TEXT.SECONDARY};
  white-space: pre-wrap;
  margin: 1.25rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    display: none;
    ${typography.body3};
  }
`

export const SubDescriptionMobile = styled.p`
  display: none;
  ${typography.body3};
  color: ${TEXT.SECONDARY};
  white-space: pre-wrap;
  margin: 1.25rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    display: block;
  }
`

export const DescriptionBold = styled.p`
  ${typography.sub3};
  color: ${TEXT.DEFAULT};
  white-space: pre-wrap;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const Button = styled(Link)`
  display: inline-block;
  text-decoration: none;
  word-break: keep-all;

  padding: 1rem;
  margin: 3rem 0 0 0;
  border-radius: 0.25rem;
  border: none;

  background: none;
  background: ${BUTTON.PRIMARY_ENABLED};
  color: ${TEXT.WHITE};
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem; /* 137.5% */
  letter-spacing: -0.05rem;
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
  height: auto;
  width: 72.5rem;

  ${MEDIA.UNDER_MOBILE} {
    display: none;
  }
`

export const BannerImageMobile = styled.img`
  display: none;
  height: auto;
  width: 90%;
  max-width: 38rem;
  margin-top: 3rem;

  ${MEDIA.UNDER_MOBILE} {
    display: block;
  }
`
