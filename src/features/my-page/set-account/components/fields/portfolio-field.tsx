import { Button } from "@components/button.styled"
import { FormControl } from "@components/form/form-control"
import { TextField } from "@components/form/text-field"
import { Center } from "@components/shared-components/center"
import { useGetPortfolioPreSignedUrlMutation } from "@features/my-page/set-account/queries/useGetPortfolioPreSignedUrlMutation"
import axios from "axios"
import { noop } from "es-toolkit"
import { get } from "es-toolkit/compat"
import { FieldArray, getIn, useFormikContext } from "formik"
import toast from "react-hot-toast"
import Add from "~icons/local/ic_add"
import Trash from "~icons/local/ic_trash"
import * as Styled from "./portfolio-field.styled"
import type { PortfolioFileListDto } from "@apis/model"
import type { UpdateUserInfoValidationSchema } from "@features/my-page/set-account/schemas/update-user-info-validation-schema"
import type { ChangeEventHandler } from "react"

export function PortfolioField() {
  const formik = useFormikContext<UpdateUserInfoValidationSchema>()
  const { mutateAsync: getPreSignedUrl } = useGetPortfolioPreSignedUrlMutation()

  return (
    <FormControl.Container>
      <FormControl.Label>포트폴리오</FormControl.Label>
      <FormControl.Description>
        <Styled.Limit>(링크 3개 / 파일 5개)</Styled.Limit>
        관리중인 블로그나 깃허브도 좋아요!
      </FormControl.Description>
      <FormControl.Content>
        <Styled.Container>
          <FieldArray name="portfolioLinkList" validateOnChange>
            {({ handlePush, remove, form, name }) => (
              <Styled.LinkField>
                {!!form.values[name].length && (
                  <Styled.List>
                    {(form.values[name] as string[]).map((_, index) => (
                      <PortfolioItem
                        key={index}
                        hasError={!!getIn(formik.errors, `${name}.${index}`)}
                        onRemove={() => remove(index)}
                        {...form.getFieldProps(`${name}.${index}`)}
                      />
                    ))}
                  </Styled.List>
                )}

                <FormControl.ErrorText>
                  {getIn(formik.errors, "portfolioLinkList")}
                </FormControl.ErrorText>

                <Styled.Append
                  type="button"
                  disabled={form.values[name].length >= 3}
                  onClick={handlePush("")}>
                  <Center>
                    <Add />
                    링크 추가
                  </Center>
                </Styled.Append>
              </Styled.LinkField>
            )}
          </FieldArray>

          <Styled.Description>
            추가적으로 제출할 파일을 추가해 주세요.
          </Styled.Description>

          <FieldArray name="portfolioFileList" validateOnChange>
            {({ push, remove, form, name }) => (
              <Styled.FileField>
                {!!form.values[name].length && (
                  <Styled.List>
                    {(form.values[name] as PortfolioFileListDto[]).map(
                      (field, index) => (
                        <PortfolioItem
                          key={index}
                          readonly
                          hasError={!!getIn(formik.errors, `${name}.${index}`)}
                          value={field.fileName}
                          onRemove={() => remove(index)}
                          onClick={() => window.open(field.fileUrl)}
                        />
                      ),
                    )}
                  </Styled.List>
                )}

                {getIn(formik.errors, "portfolioFileList") && (
                  <FormControl.ErrorText>
                    {getIn(formik.errors, "portfolioFileList")}
                  </FormControl.ErrorText>
                )}

                <Styled.Append
                  type="button"
                  disabled={form.values[name].length >= 5}
                  onClick={async () => {
                    const input = document.createElement("input")

                    input.type = "file"
                    input.onchange = async (event) => {
                      try {
                        const { files } = event.target as HTMLInputElement
                        if (!files) {
                          return
                        }

                        const { data } = await getPreSignedUrl({
                          fileName: files[0].name,
                          fileLength: files[0].size,
                        })

                        const presignedUrl = data.result?.presignedUrl
                        if (!presignedUrl) {
                          return
                        }

                        await axios.put(presignedUrl, files[0], {
                          headers: {
                            "Content-Type": files[0].type,
                          },
                        })
                        const refinedPresignedUrl = presignedUrl.split("?")[0]

                        form.setFieldTouched(name, true)
                        push({
                          fileName: files[0].name,
                          fileUrl: refinedPresignedUrl,
                        })
                      } catch (e) {
                        toast.error(
                          get(e, "message", "파일 업로드에 실패하였습니다."),
                        )
                      }
                    }

                    input.click()
                  }}>
                  <Center>
                    <Add />
                    파일 추가
                  </Center>
                </Styled.Append>
              </Styled.FileField>
            )}
          </FieldArray>

          {getIn(formik.errors, "portfolioFileList") && (
            <FormControl.ErrorText>
              {getIn(formik.errors, "portfolioFileList")}
            </FormControl.ErrorText>
          )}

          <Styled.Note>
            * 파일은 복수로 첨부 가능하며, 최대 100MB까지 업로드 됩니다.
          </Styled.Note>
        </Styled.Container>
      </FormControl.Content>
    </FormControl.Container>
  )
}

type PortfolioItemProps = {
  readonly?: boolean
  name?: string
  value?: string
  hasError?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onRemove?: () => void
  onClick?: () => void
}

export function PortfolioItem({
  readonly = false,
  name = "",
  value = "",
  hasError = false,
  onChange = noop,
  onRemove = noop,
  onClick = noop,
}: PortfolioItemProps) {
  return (
    <Styled.Item>
      <TextField.Root>
        <TextField.Control
          data-error={hasError}
          readOnly={readonly}
          name={name}
          value={value}
          onChange={onChange}
          onClick={onClick}
          data-has-onclick={onClick !== noop ? "true" : undefined}
          placeholder="링크를 입력해주세요."
        />
      </TextField.Root>
      <Button variant="dark" onClick={onRemove}>
        <Center>
          <Trash />
        </Center>
      </Button>
    </Styled.Item>
  )
}
