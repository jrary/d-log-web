import { Button } from "@components/button.styled"
import * as Callout from "@components/callout.styled"
import { FormControl, renderErrorText } from "@components/form/form-control"
import { IntlTel } from "@components/form/intl-tel"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { useFieldError } from "@hooks/formik"
import { defaultTo, get, some } from "es-toolkit/compat"
import { ErrorMessage, useFormikContext } from "formik"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { useRequestCodeMutation } from "./queries/useRequestCodeMutation"
import { useVerifyCodeMutation } from "./queries/useVerifyCodeMutation"
import { Verify } from "./verify"
import type { VerifyRef, VerifyState } from "./verify"

const TEXT = {
  phone: {
    title: "휴대폰번호",
    description: "‘-’를 제외한 전체 번호를 입력",
    placeholder: "휴대폰번호를 입력해주세요.",
  },
  verification: {
    title: "인증번호",
    placeholder: "인증번호를 입력해 주세요.",
    status: {
      verifying: "입력하신 휴대폰 번호로 인증번호가 전송되었습니다.",
      success: "인증이 완료되었습니다.",
      timeout: "인증 시간이 만료되었습니다.",
      error: "인증번호가 올바르지 않습니다.",
    },
  },
}

type FormValues = {
  phone: string
  regionCode: string
  verificationCode: string
  verificationDone: boolean
}

export function PhoneVerifyField() {
  const {
    values,
    errors,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    getFieldProps,
  } = useFormikContext<FormValues>()
  const hasError = useFieldError("phone")
  const verifyRef = useRef<VerifyRef>(null)

  const { mutateAsync: requestCode, status } = useRequestCodeMutation()
  const { mutateAsync: verifyCode } = useVerifyCodeMutation()

  const [verificationState, setVerificationState] =
    useState<VerifyState>("idle")
  const hasVerificationError = some([
    verificationState === "timeout" || verificationState === "error",
  ])

  return (
    <>
      <FormControl.Container>
        <FormControl.Label>{TEXT.phone.title}</FormControl.Label>
        <FormControl.Description>
          {TEXT.phone.description}
        </FormControl.Description>
        <FormControl.Content>
          <IntlTel
            disabled={verificationState === "success"}
            data-error={hasError}
            placeholder={TEXT.phone.placeholder}
            regionCode={values.regionCode}
            onChangeRegionCode={(code) => {
              setFieldValue("regionCode", code)
            }}
            number={values.phone}
            onChangeNumber={(number) => {
              setFieldTouched("phone", true)
              setFieldValue("phone", number)
            }}
          />
          {verificationState !== "success" && (
            <Button
              variant="primary"
              type="button"
              disabled={!values.phone || hasError}
              onClick={async () => {
                try {
                  const response = await requestCode({
                    regionCode: values.regionCode,
                    phoneNumber: values.phone,
                  })

                  if (response.data.result?.isSuccess) {
                    verifyRef.current?.startTimer()
                  } else {
                    toast.error("이미 등록된 휴대폰 번호입니다.")
                  }
                } catch (error) {
                  setFieldError("phone", get(error, "message"))
                }
              }}>
              <Text whiteSpace="nowrap" weight="bold">
                {status === "idle" ? "인증요청" : "재요청"}
              </Text>
            </Button>
          )}
          {verificationState === "success" && (
            <Button variant="primary-ghost" type="button" disabled>
              <Text whiteSpace="nowrap" weight="bold">
                인증완료
              </Text>
            </Button>
          )}
        </FormControl.Content>
        <ErrorMessage name="phone" render={renderErrorText} />
      </FormControl.Container>

      <FormControl.Container hidden={verificationState === "idle"}>
        <FormControl.Label>{TEXT.verification.title}</FormControl.Label>
        <FormControl.Content>
          <VStack spacing="0.75rem" width="100%">
            <HStack spacing="0.75rem">
              <Verify
                ref={verifyRef}
                state={verificationState}
                placeholder={TEXT.verification.placeholder}
                onStateChange={setVerificationState}
                data-error={hasVerificationError}
                {...getFieldProps("verificationCode")}
              />
              <Button
                variant="primary-ghost"
                type="button"
                disabled={verificationState !== "verifying"}
                onClick={async () => {
                  try {
                    const { data } = await verifyCode({
                      phoneNumber: values.phone,
                      verificationCode: values.verificationCode,
                    })

                    if (data.result?.isVerify === true) {
                      setFieldValue("verificationDone", true)
                      verifyRef.current?.verifySuccess()
                      return
                    }

                    setVerificationState("error")
                    setFieldError(
                      "verificationCode",
                      "인증번호가 올바르지 않습니다.",
                    )
                  } catch (e) {
                    toast.error(
                      get(e, "message", "알 수 없는 오류가 발생했습니다."),
                    )
                    setFieldError(
                      "verificationCode",
                      "인증번호가 올바르지 않습니다.",
                    )
                  }
                }}>
                <Text whiteSpace="nowrap" weight="bold">
                  인증확인
                </Text>
              </Button>
            </HStack>

            {verificationState !== "idle" && (
              <Callout.Container
                variant={hasVerificationError ? "error" : "success"}>
                <Callout.Icon>
                  {hasVerificationError ? "⛔" : "✅"}
                </Callout.Icon>
                <Callout.Content>
                  {defaultTo(
                    TEXT.verification.status[verificationState],
                    errors.verificationCode,
                  )}
                </Callout.Content>
              </Callout.Container>
            )}
          </VStack>
        </FormControl.Content>
      </FormControl.Container>
    </>
  )
}
