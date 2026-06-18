import defaultProfile from "@features/home/assets/profile_default.svg"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useAuthStateQueryObject } from "@queries/useAuthStateQueryObject"
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import * as Styled from "./header.styled"

export const TEXT = {
  title: (nickname?: string) =>
    `${nickname ?? "그릿지"} 워커님!\n당신을 위한 프로젝트가 여기 다 있습니다.`,
}

export function Header() {
  const { data: isLogin } = useSuspenseQuery(useAuthStateQueryObject())
  const { data: user } = useQuery(
    queryOptions({
      ...useGetUserInfoQueryObject(),
      enabled: isLogin,
    }),
  )

  return (
    <Styled.Container>
      <Styled.Profile>
        <Styled.ProfilePicture
          src={user?.profileImgUrl ?? defaultProfile}
          onError={(e) => (e.currentTarget.src = defaultProfile)}
        />
        <Styled.Title>{TEXT.title(user?.nickname)}</Styled.Title>
      </Styled.Profile>
      <Styled.BadgeContainer>
        {user?.jobCategory.jobCategoryList?.map((item, idx) => (
          <Styled.Badge key={idx}>{item.name}</Styled.Badge>
        ))}
      </Styled.BadgeContainer>
    </Styled.Container>
  )
}
