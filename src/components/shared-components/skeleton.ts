import { COLOR } from "@components/shared-components/tokens/color"
import {
  layoutStyle,
  marginStyle,
} from "@components/shared-components/types/props-style"
import styled, { css, keyframes } from "styled-components"
import type {
  LayoutProps,
  MarginProps,
} from "@components/shared-components/types/props"

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`

type SkeletonOwnProps = {
  display?: "block" | "inline" | "inline-block" | "flex"
  borderRadius?: string
  animation?: boolean
  animationDuration?: string
}

export type SkeletonProps = SkeletonOwnProps & MarginProps & LayoutProps

export const Skeleton = styled.div<SkeletonProps>((props) => {
  const skeletonStyle = css({
    display: props.display || "block",
    backgroundColor: COLOR.NEUTRAL_300,
    position: "relative",
    overflow: "hidden",
  })

  const animationStyle =
    props.animation !== false &&
    css`
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.2) 20%,
          rgba(255, 255, 255, 0.5) 60%,
          rgba(255, 255, 255, 0)
        );
        animation: ${shimmer} ${props.animationDuration || "2s"} infinite
          ease-in-out;
        content: "";
      }
    `

  return css`
    ${skeletonStyle}
    ${animationStyle}
    ${marginStyle}
    ${layoutStyle}
  `
})
