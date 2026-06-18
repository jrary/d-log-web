import { COLOR } from "@components/shared-components/tokens/color"
import { token } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 100vw;
  height: calc(100vh - 66px);

  background-color: ${COLOR.NEUTRAL_200};
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const HeaderContainer = styled.div<{ gap?: number }>`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Title = styled.h1`
  font-weight: 700;
  ${token.sub1}
  color: ${COLOR.NEUTRAL_900};
  white-space: nowrap;
`

export const SubText = styled.p`
  ${token.body3}
  color: ${COLOR.NEUTRAL_600};
  white-space: nowrap;
`
