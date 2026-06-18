import { Box } from "@components/shared-components/box"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import * as Styled from "./footer.styled"

export function Footer() {
  return (
    <Styled.Footer>
      <Styled.Container>
        <Styled.Top>
          <Styled.Logo />
          <Styled.Wrap>
            <Text>그릿지 고객센터</Text>
            <Styled.Link to="mailto:contact@gridge.co.kr">
              contact@gridge.co.kr
            </Styled.Link>
          </Styled.Wrap>
        </Styled.Top>
        <Box borderBottomWidth="1px" borderColor="LIGHT" />
        <Styled.Information>
          <Text typo="body3">(주) 소프트스퀘어드</Text>
          <VStack spacing="0.25rem">
            <Styled.Wrap>
              <Styled.Desc>
                <Text as="dt">대표</Text>
                <Text as="dd">이하늘</Text>
              </Styled.Desc>
              <Styled.Desc>
                <Text as="dt">업종</Text>
                <Text as="dd">컴퓨터 프로그래밍업</Text>
              </Styled.Desc>
              <Styled.Desc>
                <Text as="dt">사업자 등록번호</Text>
                <Text as="dd" weight="medium">
                  723-81-01101
                </Text>
              </Styled.Desc>
            </Styled.Wrap>
            <Styled.Desc>
              <Text as="dt">주소</Text>
              <Text as="dd">서울특별시 서초구 방배천로2안길 75 1, 2층</Text>
            </Styled.Desc>
          </VStack>
        </Styled.Information>
        <Styled.Bottom>
          <Styled.Wrap>
            <Styled.Link to="https://gridge-worker.channel.io/home">
              고객문의 (채널톡)
            </Styled.Link>
            <Styled.Link to="https://softsquared.notion.site/639b7e8b811a454d923d0c6b3fc5e7c6">
              이용약관
            </Styled.Link>
            <Styled.Link to="https://softsquared.notion.site/d2012345b7974681a886e1dbdb96827e">
              개인정보 처리방침
            </Styled.Link>
          </Styled.Wrap>
          <Text color="SECONDARY" typo="caption">
            © 2022 Soft Squared. All rights reserved.
          </Text>
        </Styled.Bottom>
      </Styled.Container>
    </Styled.Footer>
  )
}
