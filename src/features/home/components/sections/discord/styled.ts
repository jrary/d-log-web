import { BUTTON, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7.5rem 0;
  background: #f4f8f5;

  ${MEDIA.UNDER_MOBILE} {
    padding: 2.5rem 1.25rem 5.75rem;
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

export const Button = styled(Link)`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin: 3.12rem 0 0 0;
  border-radius: 0.25rem;
  border: none;
  text-decoration: none;
  background: none;
  background: ${BUTTON.PRIMARY_ENABLED};
  color: ${TEXT.WHITE};
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem;
  letter-spacing: -0.05rem;
  word-break: keep-all;
`

export const Icon = styled.img`
  width: 3.875rem;
  height: 5rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 2.375rem;
    height: 3rem;
  }
`

export const BannerImage = styled.img`
  display: block;
  max-width: 72.5rem;
  height: auto;
  margin: 4.69rem;

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
