import { VStack } from "@components/shared-components/stack"
import {
  BACKGROUND,
  BORDER,
  BUTTON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  max-width: 72.5rem;
  justify-content: flex-start;
  align-items: center;
  gap: 6.69rem;
  padding: 3.75rem 0;
  border-style: solid;
  border-color: ${BORDER.LIGHT};
  border-bottom-width: 0.06rem;

  ${MEDIA.UNDER_MOBILE} {
    flex-direction: column;
    gap: 2rem;
    padding: 2.5rem 0;
    border-bottom-width: 0rem;
  }
`

export const Content = styled.div`
  width: 27rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
  }
`

export const ProgramBox = styled.div`
  height: auto;
  min-width: 33.12rem;
  display: grid;
  grid-template-columns: 14.375rem 1fr;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.05);

  ${MEDIA.UNDER_MOBILE} {
    min-width: 15rem;
    max-width: 36rem;
    height: 100%;
    grid-template: none;
  }
`

export const Title = styled.h1`
  color: ${TEXT.BLACK};
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: -0.075rem;
  white-space: pre-wrap;
  margin: 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.sub3};
    font-weight: 700;
  }
`

export const Highlight = styled.span`
  box-shadow: inset 0px -0.625rem 0px 0px #b4f2d1;
`

export const SubTitle = styled.p`
  color: ${TEXT.NEUTRAL};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: -0.05rem;
  white-space: pre-wrap;
  margin: 1.19rem 0 0;
  word-break: keep-all;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.caption};
  }
`

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 2.25rem 0 0;

  ${MEDIA.UNDER_MOBILE} {
    margin: 1rem 0 0 0;
  }
`

export const Category = styled.div`
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  background: ${BACKGROUND.DARK};
  color: ${TEXT.SECONDARY};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
  letter-spacing: -0.04375rem;
`

export const DescriptionWrapper = styled.div`
  width: 18.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.88rem;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
  }
`

export const DescriptionTitleWrapper = styled(VStack).attrs({
  spacing: "0.5rem",
})`
  ${MEDIA.UNDER_MOBILE} {
    gap: 0.38rem;
  }
`

export const LogoWrapper = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  width: 14.375rem;
  padding: 1.25rem;
  display: flex;

  ${MEDIA.UNDER_MOBILE} {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
  }
`

export const LogoImage = styled.img`
  width: 11.625rem;
  height: 5.625rem;
  object-fit: contain;

  ${MEDIA.UNDER_MOBILE} {
    height: 3rem;
    width: auto;
  }
`

export const LogoText = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
  letter-spacing: -0.05625rem;
  margin: 0.5rem 0 0;

  ${MEDIA.UNDER_MOBILE} {
    ${typography.body3}
    margin: 0;
  }
`

export const DescriptionTitle = styled.p`
  color: ${TEXT.TERTIARY};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem;
  letter-spacing: -0.04375rem;
  margin: 0;
  word-break: keep-all;
`

export const Description = styled.p`
  align-self: stretch;
  color: ${TEXT.BLACK};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: -0.04375rem;
  margin: 0;
  word-break: keep-all;
  word-break: keep-all;
`

export const ProgramBtn = styled(Link)`
  text-decoration: none;
  padding: 0.625rem 0.75rem;
  margin: 0.88rem 0 0;
  border-radius: 0.25rem;
  border: none;
  background: ${BUTTON.LIGHT};
  color: ${TEXT.HIGH_EMPHASIS};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.04375rem;
  word-break: keep-all;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
