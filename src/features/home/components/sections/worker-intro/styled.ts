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
  justify-content: center;
  padding: 8.75rem 0;
  background: ${BACKGROUND.WHITE};

  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    align-items: center;
    padding: 2.5rem 1.25rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    align-items: center;
    text-align: center;
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
  white-space: pre-wrap;
  margin: 1.25rem 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const BoldDescription = styled.p`
  ${typography.sub3};
  color: ${TEXT.BLACK};
  margin: 0 0 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`

export const Icon = styled.img`
  width: 8rem;
  height: 9.3rem;
  object-fit: contain;

  ${MEDIA.UNDER_MOBILE} {
    width: 3.5rem;
    height: 4.0625rem;
  }
`

export const WorkerBtn = styled(Link)`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin: 3.12rem 0 0 0;
  border-radius: 0.25rem;
  border: none;
  word-break: keep-all;

  text-decoration: none;

  background: none;
  background: ${BUTTON.PRIMARY_ENABLED};
  color: ${TEXT.WHITE};
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem;
  letter-spacing: -0.05rem;
`

export const BannerImage = styled.img`
  width: 43.75rem;
  height: 49rem;
  object-fit: contain;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
    height: auto;
    max-width: 43.75rem;
    margin: 2.5rem 0 4rem 0;
  }
`
