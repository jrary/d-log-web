import { VStack } from "@components/shared-components/stack"
import { TEXT } from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Section = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
`

export const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`

export const Content = styled(VStack).attrs({
  position: "relative",
  spacing: "1.5rem",
  marginHorizontal: "auto",
  maxWidth: "62.5rem",
  width: "100%",
})`
  padding: 6.25rem 0 6.75rem;

  ${MEDIA.UNDER_MOBILE} {
    padding: 3rem 0 5rem 1.25rem;
  }
`

export const Welcome = styled(VStack).attrs({
  spacing: "1.25rem",
})`
  ${MEDIA.OVER_MOBILE} {
    gap: 1.5rem;
    flex-direction: row;
    align-items: flex-end;
  }
`

export const ProfilePicture = styled.img`
  width: 3.375rem;
  height: 3.375rem;
  border-radius: 3.375rem;
`

export const WelcomeMessage = styled.h1`
  ${typography.t2};
  color: ${TEXT.WHITE};
  font-weight: 700;
  white-space: pre-wrap;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    font-size: 1.375rem;
    line-height: 1.88rem;
  }
`

export const MyPageLink = styled(Link)`
  ${typography.body1};
  color: ${TEXT.WHITE};
  font-weight: 500;
  white-space: pre-wrap;
  text-decoration-line: underline;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption};
  }
`

export const Dashboard = styled(VStack).attrs({
  spacing: "0.75rem",
})``

export const DashboardTitle = styled.h2`
  ${typography.t2};
  color: ${TEXT.WHITE};
  font-weight: 700;
  white-space: pre-wrap;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3};
  }
`

export const DashboardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.25rem;

  ${MEDIA.UNDER_MOBILE} {
    padding-right: 1.25rem;

    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`
