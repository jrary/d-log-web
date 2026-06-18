import { BACKGROUND, TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Wrapper = styled.div`
  width: 21.7rem;
  display: flex;
  border-radius: 1.25rem;
  background: ${BACKGROUND.WHITE};
  padding: 2rem 1.875rem 2.375rem 1.875rem;
  flex-direction: column;

  ${MEDIA.UNDER_MOBILE} {
    flex-shrink: 0;
    width: 18.75rem;
    padding: 1.88rem 1.62rem 2.12rem;
  }
`

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 0.88rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 16rem;
  }
`

export const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
`

export const ProfileImg = styled.img`
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 4.25rem;
`

export const Name = styled.p`
  color: ${TEXT.BLACK};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: -0.05rem;
`

export const Position = styled.p`
  ${typography.caption}
  color: ${TEXT.WHITE};
  padding: 0.12rem 0.5rem;
  border-radius: 6.25rem;
  background: #29d97b;
`

export const Title = styled.p`
  ${typography.sub3}
  color: ${TEXT.BLACK};
  font-weight: 700;
  white-space: pre-wrap;
  margin: 1.5rem 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1};
    margin: 1rem 0 0;
  }
`

export const Description = styled.p`
  ${typography.body}
  color: ${TEXT.SECONDARY};
  line-height: 1.75rem;
  margin: 0.88rem 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3};
  }
`
