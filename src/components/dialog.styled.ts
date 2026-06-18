import { Center } from "@components/shared-components/center"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BUTTON,
  ICON,
} from "@components/shared-components/tokens/color"
import { MEDIA } from "@components/shared-components/tokens/responsive"
import { typography } from "@components/shared-components/tokens/typography"
import { ZIndex } from "@components/shared-components/tokens/z-index"
import * as Dialog from "@radix-ui/react-dialog"
import styled, { keyframes } from "styled-components"
import type { ComponentProps } from "react"

export const overlayShowKeyframe = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`

export const contentShowKeyframe = keyframes`
	from {
		opacity: 0;
		transform: translate(-50%, -48%) scale(0.96);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
`

export const Root = styled(Dialog.Root)``

export const Portal = styled(Dialog.Portal)``

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: ${ZIndex.overlay};
  background-color: rgba(0, 0, 0, 0.728);
  animation: ${overlayShowKeyframe} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  overflow-y: auto;
`

export const Content = styled(Dialog.Content).attrs({
  as: VStack,
  align: "center",
  borderRadius: "1.875rem",
  backgroundColor: BACKGROUND.WHITE,
  overflow: "auto",
})<ComponentProps<typeof VStack>>`
  position: fixed;
  z-index: ${ZIndex.modal};

  max-width: 95vw;
  max-height: 95vh;

  overflow-y: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: ${({ paddingVertical, paddingHorizontal }) =>
    `${paddingVertical || "2.5rem"} ${paddingHorizontal || "3.75rem"}`};

  animation: ${contentShowKeyframe} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  ${MEDIA.UNDER_MOBILE} {
    min-width: 310px;
    padding: 1.5rem;
  }
`

export const Icon = styled(Center).attrs({
  padding: "1.25rem",
  borderRadius: "50%",
})`
  font-size: 2.3125rem;
  background-color: rgba(53, 188, 80, 0.1);
`

export const Title = styled(Dialog.Title).attrs({ as: Text, typo: "body2" })``

export const Description = styled(Dialog.Description).attrs({
  as: Text,
  typo: "sub2",
  weight: "bold",
  align: "center",
  whiteSpace: "pre-wrap",
})`
  ${MEDIA.UNDER_MOBILE} {
    ${typography.body1}
  }
`

export const Close = styled(Dialog.Close)``

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  padding: 4px;
  background-color: transparent;
  color: ${ICON.SECONDARY};
  border-radius: 0.5rem;
  transition: background-color 0.1s ease-out;

  svg {
    width: 1rem;
    height: 1.2rem;
  }

  &:hover {
    background-color: ${BACKGROUND.DARK};
`

export const Button = styled(Text).attrs({
  as: "button",
  color: "WHITE",
  weight: "bold",
})`
  cursor: pointer;
  border: none;
  padding: 0.6875rem 2.25rem 0.8125rem 2.25rem;
  border-radius: 3.125rem;
  background-color: ${BUTTON.PRIMARY_ENABLED};

  ${MEDIA.UNDER_MOBILE} {
    padding: 0.75rem 2.25rem 0.875rem 2.25rem;
    ${typography.body3}
  }
`
