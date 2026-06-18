import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { token } from "@components/shared-components/tokens/typography"
import { Link } from "react-router"
import styled from "styled-components"

/** Nav */
export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 294px;
  height: 100%;
  gap: 20px;

  padding: 24px 20px;
  background-color: ${COLOR.NEUTRAL_100};
  border-right: 1px solid ${COLOR.NEUTRAL_300};
`

export const ProjectItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ProjectItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 12px 20px;

  & > button > svg {
    color: ${COLOR.NEUTRAL_600};
  }
`

export const ProjectItemTitle = styled(Text).attrs({
  typo: "body3",
  weight: "medium",
})<{ isActive: boolean }>`
  color: ${({ isActive }) =>
    isActive ? COLOR.NEUTRAL_900 : COLOR.NEUTRAL_600};
  transition: color 0.3s ease-in-out;
`

export const ProjectMenuWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: ${({ isOpen }) => (isOpen ? "8px 0px 20px" : "0px")};

  border-top: 1px solid ${COLOR.NEUTRAL_300};
  border-bottom: 1px solid ${COLOR.NEUTRAL_300};
  overflow: hidden;

  max-height: ${({ isOpen }) => (isOpen ? "206px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};

  transform-origin: top;
  transition:
    padding 0.3s ease-in-out,
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
`

export const ProjectMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;

  border-radius: 8px;
  border: none;
  background: transparent;

  color: ${COLOR.NEUTRAL_600};
  ${token.body2}
  font-weight: 500;
  text-align: left;
  text-decoration: none;

  transition: all 0.2s ease-out;
  cursor: pointer;

  &:hover,
  &.active {
    background-color: ${COLOR.GREEN_100};
    color: ${COLOR.GREEN_400};
  }
`
