import { HStack, VStack } from "@components/shared-components/stack"
import {
  BACKGROUND,
  COLOR,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import { Link as BaseLink } from "react-router"
import styled from "styled-components"
import type { LinkProps } from "react-router"

export const Trigger = styled(HStack).attrs({
  as: BaseLink,
  width: "100%",
  align: "center",
  justify: "between",
})<LinkProps>`
  text-decoration: none;
  background: none;

  ${typography.body3}
  font-family: inherit;
  white-space: pre-wrap;
  word-break: keep-all;

  color: ${TEXT.SECONDARY};
  font-weight: 500;

  user-select: none;
  cursor: pointer;

  padding: 0.625rem 0.75rem;

  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  // hover일 때 green 스타일
  &:not([data-root="true"]):hover {
    background-color: ${BACKGROUND.LIGHT_PRIMARY};
    color: ${TEXT.HIGH_EMPHASIS};
  }

  // 선택된 메뉴일 때 green 스타일
  &[data-active="true"] {
    background-color: ${BACKGROUND.LIGHT_PRIMARY};
    color: ${TEXT.HIGH_EMPHASIS};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`

export const Content = styled(VStack)`
  overflow: hidden;
  padding: 0.5rem 0;

  transform: translateY(-5px);
  height: 0;
  opacity: 0;

  transition:
    height 0.15s linear,
    transform 0.3s linear,
    opacity 0.075s linear;

  &[data-open="true"] {
    transform: translateY(0);
    height: 100%;
    opacity: 1;

    border-width: 0;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${COLOR.GRAY_300};

    &[data-last-item="true"] {
      border-bottom-width: 0px;
    }
  }

  &[data-open="false"] {
    padding: 0;
  }
`

export const Link = styled(Trigger).attrs({
  as: BaseLink,
})<LinkProps>`
  gap: 0.5rem;
  justify-content: flex-start;
  text-decoration: none;

  // 선택된 메뉴일 때 green 스타일
  &[data-active="true"] {
    background-color: ${BACKGROUND.LIGHT_PRIMARY};
    color: ${TEXT.HIGH_EMPHASIS};
  }

  // 프로젝트 관리 - 마일스톤 생성 스타일
  &[data-add="true"] {
    background-color: initial;
    color: ${TEXT.TERTIARY};
  }

  // 프로젝트 관리 - 마일스톤 생성 hover 스타일
  &[data-add="true"]:hover {
    background-color: initial;
    color: ${TEXT.DEFAULT};
  }
`

export const Container = styled(VStack).attrs({})`
  height: fit-content;
  transition: height 0.3s ease;

  // Container Depth 1
  &[data-depth="1"] {
    // Content Depth 1
    ${Content} {
      gap: 0.5rem;

      // Trigger Depth 2
      ${Trigger} {
        border-bottom-width: 0;
        border-radius: 0.5rem;

        padding: 0.66rem 1.38rem 0.66rem 1.25rem;

        // hover 시 bold
        &[data-active="false"]:hover {
          background-color: ${BACKGROUND.LIGHT_PRIMARY};
          color: ${TEXT.HIGH_EMPHASIS};
        }
      }
    }
  }

  // Container Depth 2
  &[data-depth="2"] {
    gap: 0;

    // Content Depth 2
    ${Content} {
      gap: 0;
      margin: 0 0.625rem;

      border-width: 0;
      border-bottom-width: 1px;
      border-color: ${COLOR.GRAY_300};

      // Trigger Depth 3
      // ${Trigger}:hover {
      //   background-color: unset;
      //   color: ${TEXT.DEFAULT};
      // }
    }
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`

export const TriggerItem = styled(HStack).attrs({
  align: "center",
  spacing: "0.5rem",
})`
  flex: 1;
`
