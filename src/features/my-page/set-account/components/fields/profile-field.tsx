import UserProfile from "@assets/icons/user_profile.svg"
import { FormControl } from "@components/form/form-control"
import { Text } from "@components/shared-components/text"
import { useGetProfileImgPreSignedUrlMutation } from "@features/my-page/set-account/queries/useGetProfileImgPreSignedUrlMutation"
import axios from "axios"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import * as Styled from "./profile-field.styled"
import type { UpdateUserInfoValidationSchema } from "@features/my-page/set-account/schemas/update-user-info-validation-schema"

export function ProfileField() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { setFieldValue, values } =
    useFormikContext<UpdateUserInfoValidationSchema>()

  const { mutateAsync: getPreSignedUrl } =
    useGetProfileImgPreSignedUrlMutation()

  const handleFileUpload = async (file: File) => {
    try {
      const { data } = await getPreSignedUrl({ fileName: file.name })

      const presignedUrl = data.result?.presignedUrl
      if (!presignedUrl) {
        throw new Error("Presigned URL could not be retrieved.")
      }

      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      })

      setFieldValue("profileImgUrl", presignedUrl)
    } catch (e) {
      console.error(e)
      toast.error("사진 업로드에 실패했습니다.")
    }
  }

  const handleFileInputClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (event) => {
      const { files } = event.target as HTMLInputElement
      if (files && files.length > 0) {
        const file = files[0]

        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)

        await handleFileUpload(file)

        URL.revokeObjectURL(objectUrl)
      }
    }
    input.click()
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <FormControl.Container>
      <FormControl.Label />
      <FormControl.Content>
        <Styled.Container>
          <Styled.Title>프로필 사진</Styled.Title>
          <Styled.ProfileImg
            src={previewUrl || values.profileImgUrl || UserProfile}
            onError={(e) => (e.currentTarget.src = UserProfile)}
          />
          <Styled.FileField>
            <Styled.FileButton onClick={handleFileInputClick}>
              프로필 업로드
            </Styled.FileButton>
            <Text color="PLACEHOLDER">|</Text>
            <Styled.FileButton
              onClick={() => {
                setFieldValue("profileImgUrl", null)
                setPreviewUrl(null)
              }}>
              프로필 삭제
            </Styled.FileButton>
          </Styled.FileField>
        </Styled.Container>
      </FormControl.Content>
    </FormControl.Container>
  )
}
