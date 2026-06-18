import { FindEmailForm } from "@features/auth/find-account/components/sections/find-email"
import { FindPasswordForm } from "@features/auth/find-account/components/sections/find-password"
import * as SignInLink from "@features/auth/find-account/components/sign-in-link.styled"
import * as Styled from "@features/auth/find-account/components/styled"
import * as Tab from "@features/auth/find-account/components/tab.styled"
import { useCallback, useState } from "react"

export default function FindAccountPage() {
  const [tab, setTab] = useState<"email" | "password">("email")

  const isCurrentTab = useCallback(
    (target: "email" | "password") => target === tab,
    [tab],
  )

  const handleTabClick = useCallback(
    (target: "email" | "password") => () => {
      setTab(target)
    },
    [],
  )

  return (
    <Styled.Container>
      <Tab.Container>
        <Tab.Item
          data-active={isCurrentTab("email")}
          onClick={handleTabClick("email")}>
          아이디 찾기
        </Tab.Item>
        <Tab.Item
          data-active={isCurrentTab("password")}
          onClick={handleTabClick("password")}>
          비밀번호 찾기
        </Tab.Item>
      </Tab.Container>

      <FindEmailForm active={isCurrentTab("email")} />
      <FindPasswordForm active={isCurrentTab("password")} />

      <SignInLink.Container>
        <SignInLink.Content>아이디와 비밀번호를 찾으셨나요?</SignInLink.Content>
        <SignInLink.Link to="/auth/sign-in">로그인 하러가기</SignInLink.Link>
      </SignInLink.Container>
    </Styled.Container>
  )
}
