import { Text } from "@components/shared-components/text"
import ArrowLeft from "~icons/local/ic_arrow_left"
import * as Styled from "./navigation.styled"

type NavigationProps = {
  isSubmitDisabled: boolean
}

export function Navigation({ isSubmitDisabled }: NavigationProps) {
  return (
    <Styled.Container>
      <Styled.BackLink to="..">
        <ArrowLeft />
        <Text color="SECONDARY" align="center">
          닫기
        </Text>
      </Styled.BackLink>
      <Styled.Submit disabled={isSubmitDisabled}>등록하기</Styled.Submit>
    </Styled.Container>
  )
}
