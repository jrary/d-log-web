import { Checkbox } from "@components/form/checkbox"
import { HighlightText } from "@components/highlight-text"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { every } from "es-toolkit/compat"
import { ErrorMessage, useFormikContext } from "formik"
import * as Styled from "./../styled"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"
import type { ChangeEvent } from "react"

const TEXT = {
  all: "모두 동의",
  privacy: "만 14세 이상이며, 개인정보보호정책과 이용약관에 동의합니다.",
  highlightRegex: /(개인정보보호정책|이용약관)/g,
  marketing:
    "마케팅 정보 수신에 동의합니다. 그릿지의 최신 업데이트 소식을 빠르게 받아 보실 수 있습니다.",
}

export function AgreementField() {
  const { values, setValues, getFieldProps } = useFormikContext<SignUpSchema>()

  return (
    <VStack spacing="1rem" align="start">
      <Checkbox
        checked={every([values.isPrivacyAccepted, values.isMarketingAccepted])}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValues({
            ...values,
            isPrivacyAccepted: e.target.checked,
            isMarketingAccepted: e.target.checked,
          })
        }}>
        <Styled.SelectText>{TEXT.all}</Styled.SelectText>
      </Checkbox>
      <Checkbox {...getFieldProps("isPrivacyAccepted")}>
        <VStack spacing="0.25rem">
          <Styled.SelectText>
            <HighlightText highlightRegex={TEXT.highlightRegex}>
              {TEXT.privacy}
            </HighlightText>
          </Styled.SelectText>
          <ErrorMessage
            name="isPrivacyAccepted"
            render={(message) => <Text color="DANGER">{message}</Text>}
          />
        </VStack>
      </Checkbox>

      <Checkbox {...getFieldProps("isMarketingAccepted")}>
        <Styled.SelectText color="SECONDARY">
          {TEXT.marketing}
        </Styled.SelectText>
      </Checkbox>
    </VStack>
  )
}
