import { TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 61.25rem;
  width: 100%;
  object-fit: cover;

  ${MEDIA.UNDER_MOBILE} {
    height: 47.62rem;
  }
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  padding: 6.52rem 0 9rem;

  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    align-items: center;
    padding: 3.12rem 1.25rem 6.25rem;
  }
`

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 62.5rem;
`

export const Title = styled.h1`
  ${typography.t2};
  font-weight: 700;
  color: ${TEXT.WHITE};
  text-align: center;
  white-space: pre-wrap;
  margin: 1.25rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3};
    font-weight: 700;
    margin: 1.75rem 0 0 0;
  }
`

export const SubTitle = styled.p`
  ${typography.sub2};
  color: ${TEXT.LIGHT_GREEN};
  text-align: center;
  margin: 1rem 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const Description = styled.p`
  ${typography.sub3};
  color: ${TEXT.WHITE};
  text-align: center;
  white-space: pre-wrap;
  margin: 1.25rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const Icon = styled.img`
  width: 3.02988rem;
  height: 3.02988rem;
`

export const Review = styled.div`
  display: flex;
  gap: 1.19rem;
  margin: 3.75rem 0 0 0;
  max-width: 68rem;

  ${MEDIA.UNDER_MOBILE} {
    align-items: flex-start;
    width: 100vw;
    padding: 0rem 2rem;
    overflow-x: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`
