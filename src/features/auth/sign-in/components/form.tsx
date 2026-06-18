import * as Callout from "@components/callout.styled"
import { Checkbox } from "@components/form/checkbox"
import { FormControl, renderErrorText } from "@components/form/form-control"
import { Password } from "@components/form/password"
import { TextField } from "@components/form/text-field"
import { HStack } from "@components/shared-components/stack"
import { LOCAL_STORAGE_KEY } from "@constants/localStorageKey"
import { show } from "@ebay/nice-modal-react"
import { SignInSuccessModal } from "@features/auth/sign-in/components/modals/sign-in-success"
import { useSignInMutation } from "@features/auth/sign-in/queries/useSignInMutation"
import { signInValidationSchema } from "@features/auth/sign-in/schemas/sign-in-validation-schema"
import { gridgeQueryKey } from "@queries/gridgeQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { ErrorMessage, Form, FormikProvider, getIn, useFormik } from "formik"
import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { toFormikValidate } from "zod-formik-adapter"
import Logo from "~icons/local/logo_gridge_green.svg"
import * as Styled from "./form.styled"

const TEXT = {
  title: "긱워킹을 시작하기 전 로그인을 해주세요",
  description:
    "그릿지 회원이라면 가지고 있는 하나의 계정으로\n긱워킹, G워커를 위한 프로그램을 모두 이용하실 수 있습니다.",
  mobileDescription:
    "그릿지 회원이라면 가지고 있는 하나의 계정으로\n긱워킹, G워커를 위한 프로그램을\n모두 이용하실 수 있습니다.",
  form: {
    email: {
      title: "이메일",
      placeholder: "example@gridge.com",
    },
    password: {
      title: "비밀번호",
      placeholder: "비밀번호를 입력해 주세요.",
    },
  },
  actions: {
    autoLogin: "자동 로그인",
    findAccount: "아이디 / 비밀번호 찾기",
    submit: "로그인",
    signUp: {
      prefix: "아직 그릿지 회원이 아니신가요?",
      link: "회원가입하기",
    },
  },
}

export function SignInForm() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const { mutateAsync: signIn, error } = useSignInMutation()
  const isError = (name: string) =>
    getIn(formik.errors, name) && getIn(formik.touched, name)

  useEffect(
    function clearSessionExpired() {
      if (searchParams.get("session_expired")) {
        history.replaceState(null, "", "/auth/sign-in")
      }
    },
    [searchParams],
  )

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: false,
    validate: toFormikValidate(signInValidationSchema),
    initialValues: {
      email: "",
      password: "",
      autoLogin: false,
    },
    onSubmit: async (values) => {
      try {
        const { data } = await signIn(values)
        if (!data.result?.accessToken) {
          return
        }

        localStorage.setItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
          data.result?.accessToken,
        )

        localStorage.setItem(
          LOCAL_STORAGE_KEY.AUTO_LOGIN,
          String(values.autoLogin),
        )

        queryClient.invalidateQueries({
          queryKey: gridgeQueryKey.user(),
        })

        show(SignInSuccessModal)
      } catch {
        // noop
      }
    },
  })

  return (
    <FormikProvider value={formik}>
      <Form>
        <Styled.Container>
          <Styled.Logo>
            <Logo />
          </Styled.Logo>

          <Styled.Header>
            <Styled.Title>{TEXT.title}</Styled.Title>
            <Styled.Description>{TEXT.description}</Styled.Description>
            <Styled.MobileDescription>
              {TEXT.mobileDescription}
            </Styled.MobileDescription>
          </Styled.Header>

          <Styled.Fields>
            <FormControl.Container>
              <FormControl.Label>{TEXT.form.email.title}</FormControl.Label>
              <FormControl.Content>
                <TextField.Root>
                  <TextField.Control
                    {...formik.getFieldProps("email")}
                    autoComplete="username"
                    data-error={isError("email")}
                    placeholder={TEXT.form.email.placeholder}
                  />
                </TextField.Root>
              </FormControl.Content>
              <ErrorMessage name="email" render={renderErrorText} />
            </FormControl.Container>

            <FormControl.Container>
              <FormControl.Label>{TEXT.form.password.title}</FormControl.Label>
              <FormControl.Content>
                <Password
                  {...formik.getFieldProps("password")}
                  autoComplete="current-password"
                  data-error={isError("password")}
                  placeholder={TEXT.form.password.placeholder}
                />
              </FormControl.Content>
              <ErrorMessage name="password" render={renderErrorText} />
            </FormControl.Container>
          </Styled.Fields>

          <Styled.Actions>
            <HStack justify="between" align="center">
              <Checkbox {...formik.getFieldProps("autoLogin")}>
                <Styled.AutoLogin>{TEXT.actions.autoLogin}</Styled.AutoLogin>
              </Checkbox>

              <Styled.FindAccount to="/auth/find-account">
                {TEXT.actions.findAccount}
              </Styled.FindAccount>
            </HStack>

            {searchParams.get("session_expired") && (
              <Callout.Container variant="error">
                <Callout.Icon>⛔</Callout.Icon>
                <Callout.Content>
                  로그인 정보가 만료되었습니다. 다시 로그인해주세요.
                </Callout.Content>
              </Callout.Container>
            )}

            {error && (
              <Callout.Container variant="error">
                <Callout.Icon>⛔</Callout.Icon>
                <Callout.Content>{error?.message}</Callout.Content>
              </Callout.Container>
            )}

            <Styled.Submit
              type="submit"
              disabled={!formik.isValid || !formik.dirty}>
              {TEXT.actions.submit}
            </Styled.Submit>

            <HStack justify="center" align="center" spacing="0.62rem">
              <Styled.SignUpPrefix>
                {TEXT.actions.signUp.prefix}
              </Styled.SignUpPrefix>
              <Styled.SignUpLink to="/auth/sign-up">
                {TEXT.actions.signUp.link}
              </Styled.SignUpLink>
            </HStack>
          </Styled.Actions>
        </Styled.Container>
      </Form>
    </FormikProvider>
  )
}
