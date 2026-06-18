import { COLOR } from "@components/shared-components/tokens/color"
import { token } from "@components/shared-components/tokens/typography"
import { toast } from "react-hot-toast"
import styled from "styled-components"
import IcDanger from "~icons/local/ic_danger"
import IcTickCircle from "~icons/local/ic_tick_circle"

type ToastStatus = "error" | "success"

type ToastOptions = {
  duration?: number
}

const getToastConfig = () => {
  return {
    position: "bottom-center" as const,
    style: {
      height: 50,
      padding: "10px 10px",
      backgroundColor: COLOR.NEUTRAL_700,
      color: COLOR.NEUTRAL_100,
      borderRadius: 8,
      gap: 10,
      maxWidth: "100%",
      width: "auto",

      fontSize: token.body1.fontSize,
      lineHeight: token.body1.lineHeight,
      fontWeight: 400,
      margin: 0,
    },
  }
}

const WbsToastWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  max-width: 100%;
  overflow: hidden;

  & > p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
const showToast = (
  status: ToastStatus,
  message: string,
  options?: ToastOptions,
) => {
  toast(
    () => (
      <WbsToastWrapper>
        {status === "success" ? <IcTickCircle /> : <IcDanger />}
        <p>{message}</p>
      </WbsToastWrapper>
    ),
    {
      ...getToastConfig(),
      duration: options?.duration || 5000,
    },
  )
}

const wbsToast = {
  success: (message: string, options?: ToastOptions) =>
    showToast("success", message, options),
  error: (message: string, options?: ToastOptions) =>
    showToast("error", message, options),
}

export default wbsToast
