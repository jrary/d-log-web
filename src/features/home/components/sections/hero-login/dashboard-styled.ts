import {
  BACKGROUND,
  BUTTON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Section = styled.div`
  border-radius: 1.875rem;
  background: ${BACKGROUND.WHITE};
  width: 33.125rem;
  height: auto;
  padding: 3.125rem 2.5rem;

  ${MEDIA.UNDER_MOBILE} {
    flex-shrink: 0;
    max-width: max(80%, 17.5rem);
    padding: 1.875rem 1.5rem 3.75rem 1.5rem;
  }
`

export const Icon = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  width: 3.875rem;
  height: 3.875rem;
  padding: 0.875rem;
  justify-content: center;
  align-self: stretch;
  border-radius: 0.875rem;
`

export const Title = styled.h3`
  ${typography.sub2}
  color: ${TEXT.BLACK};
  font-weight: 700;
  align-self: stretch;
  margin: 0.88rem 0;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const EmptyMessage = styled.p`
  ${typography.body}
  color: ${TEXT.SECONDARY};
  text-align: center;
  padding: 3.6rem 0;
  text-align: center;
  white-space: pre-wrap;

  ${MEDIA.UNDER_MOBILE} {
    font-size: 0.75rem;
  }
`

export const DetailLink = styled(Link)`
  ${typography.body1}
  color: ${TEXT.WHITE};
  text-decoration-line: none;
  font-weight: 700;
  width: 12.375rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6.25rem;
  background: #65da7b;
  box-shadow: 0px 4px 20px 0px rgba(101, 218, 123, 0.25);
  margin: 0.75rem auto 0;
`

export const DetailLinkDisabled = styled(Link)`
  ${typography.body1}
  color: ${TEXT.DISABLED};
  text-decoration-line: none;
  font-weight: 700;
  width: 12.375rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6.25rem;
  background: ${BUTTON.DISABLED};
  box-shadow: 0px 4px 20px 0px rgba(101, 218, 123, 0.25);
  margin: 0.75rem auto 0;
`

export const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #29d97b;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.25rem;
  letter-spacing: -0.1rem;
  width: 6.25rem;
  height: 6.25rem;
  flex-shrink: 0;
  background-color: #e7fbf0;
  border-radius: 6.25rem;
  margin: 1.25rem auto;
  position: relative;
`

export const DocIcon = styled.div`
  position: absolute;
  top: -15%;
  left: 0;
  width: 1.75rem;
  height: 1.75rem;
`

export const Today = styled.p`
  color: ${TEXT.TERTIARY};
  ${typography.body1};
  margin: 0 auto;
`
