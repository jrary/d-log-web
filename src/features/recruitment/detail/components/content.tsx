import { Box } from "@components/shared-components/box"
import { ApplyForm } from "@features/recruitment/detail/components/apply"
import { Detail } from "@features/recruitment/detail/components/detail"
import { useGetRecruitmentDetailQueryObject } from "@features/recruitment/detail/queries/useGetRecruitmentDetailQueryObject"
import { PdfViewer } from "@naverpay/react-pdf"
import { useQuery } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { Suspense, useState } from "react"
import { useParams } from "react-router"
import * as Styled from "./content.styled"

const TEXT = {
  header: {
    title: "프로젝트 의뢰서",
    detail: "기획서 자세히 보기",
  },
  apply: "지원하기",
}

export function Content() {
  const [mode, setMode] = useState<"apply" | "detail">("detail")

  const { recruitmentId = "0" } = useParams()
  const { data: information } = useQuery(
    useGetRecruitmentDetailQueryObject(toNumber(recruitmentId)),
  )

  return (
    <Styled.Container>
      <Styled.MobileLeft>
        <Styled.Header>
          <Styled.Title>{TEXT.header.title}</Styled.Title>
          <Styled.Detail href={information?.detailFileUrl} target="_blank">
            {TEXT.header.detail}
          </Styled.Detail>
        </Styled.Header>
        <Styled.Left>
          <PdfViewer pdfUrl={information?.detailFileUrl ?? "#"} />
        </Styled.Left>
      </Styled.MobileLeft>
      <Styled.Right>
        <Suspense fallback={<Box width="100%" height="2.625rem" />}>
          {mode === "detail" ? (
            <Detail
              onApply={() => {
                setMode("apply")
              }}
            />
          ) : (
            <ApplyForm setMode={setMode} />
          )}
        </Suspense>
      </Styled.Right>
    </Styled.Container>
  )
}
