import UserIcon from "@assets/icons/user_profile.svg"
import { Button } from "@components/button.styled"
import { Text } from "@components/shared-components/text"
import { useGetDashboardProjectsQueryObject } from "@features/dashboard/queries/useGetDashboardProjectsQueryObject"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useAuthStateQueryObject } from "@queries/useAuthStateQueryObject"
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { Link, useLocation } from "react-router"
import * as Styled from "./header.styled"

type Props = {
  full?: boolean
}

export function Header({ full }: Props) {
  const { pathname } = useLocation()
  const { data: isLogin } = useSuspenseQuery(useAuthStateQueryObject())
  const { data } = useQuery(
    queryOptions({
      ...useGetUserInfoQueryObject(),
      enabled: isLogin,
    }),
  )

  const { data: projects = [] } = useQuery(
    queryOptions({
      ...useGetDashboardProjectsQueryObject(),
      enabled: isLogin,
    }),
  )

  const hasProjects = projects.length > 0

  return (
    <Styled.Header>
      <Styled.Container data-full={full}>
        <Styled.Left>
          <Link to="/">
            <Styled.Logo />
          </Link>
          <Styled.Links>
            <Styled.Link to="/recruitment">외주공고</Styled.Link>
            <Styled.Link to="/programs">프로그램</Styled.Link>
            <Styled.Link
              to="https://discord.com/invite/G3wXNBndNp"
              target="_blank">
              커뮤니티
            </Styled.Link>
          </Styled.Links>
        </Styled.Left>
        <Styled.Right>
          {!data && (
            <Link to="/auth/sign-in">
              <Button variant="primary-ghost" size="m">
                <Text weight="medium">그릿지 하러가기</Text>
              </Button>
            </Link>
          )}
          {data && (
            <>
              {hasProjects && (
                <Link hidden={pathname.includes("/dashboard")} to="/dashboard">
                  <Button variant="primary" size="m">
                    <Text weight="medium">대시보드</Text>
                  </Button>
                </Link>
              )}
              <Link to="/my-page">
                <Styled.Profile
                  src={data.profileImgUrl ?? UserIcon}
                  onError={(e) => (e.currentTarget.src = UserIcon)}
                  alt="profile"
                />
              </Link>
            </>
          )}
        </Styled.Right>
      </Styled.Container>
    </Styled.Header>
  )
}
