import UserProfile from "@assets/icons/user_profile.svg"
import { VStack } from "@components/shared-components/stack"
import { LOCAL_STORAGE_KEY } from "@constants/localStorageKey"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { ErrorBoundary, Suspense } from "@suspensive/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Outlet, useLocation } from "react-router"
import * as Styled from "./layout.styled"
import MobileBar from "./mobile-bar"

export default function MyPageLayout() {
  const location = useLocation()
  const queryClient = useQueryClient()
  const { data: user } = useQuery(useGetUserInfoQueryObject())

  const logoutAction = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEY.AUTO_LOGIN)

    queryClient.clear()

    window.location.href = "/"
  }

  return (
    <Styled.Container>
      {/* 모바일 상단바 */}
      <MobileBar />

      {/* 데스크톱 사이드바 */}
      <Styled.Sidebar data-active={location.pathname === "/my-page"}>
        <Styled.Profile>
          <Styled.ProfileImg
            src={user?.profileImgUrl ?? UserProfile}
            onError={(e) => (e.currentTarget.src = UserProfile)}
          />
          <VStack>
            <Styled.Name>{`${user?.nickname} 워커님`}</Styled.Name>
            <Styled.Email>{user?.email}</Styled.Email>
          </VStack>
          <Styled.Logout onClick={logoutAction}>로그아웃</Styled.Logout>
        </Styled.Profile>

        {/* 데스크톱 화면 메뉴 */}
        <Styled.Menu>
          <MenuItems />
        </Styled.Menu>
      </Styled.Sidebar>

      {/* 메인 콘텐츠 */}
      <Styled.MainContent>
        <ErrorBoundary fallback={<div>오류가 발생했습니다.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Styled.MainContent>

      {/* 모바일 화면 메뉴 */}
      <Styled.MobileMenu>
        <MenuItems />
      </Styled.MobileMenu>
    </Styled.Container>
  )
}

function MenuItems() {
  const location = useLocation()

  const menuItems = [
    {
      title: "외주 프로젝트 관리",
      items: [
        {
          name: "진행중 프로젝트",
          test: new RegExp("/my-page/?$"),
          link: "/my-page",
        },
        {
          name: "관심 프로젝트",
          test: new RegExp("/my-page/interest-project"),
          link: "/my-page/interest-project",
        },
      ],
    },
    {
      title: "내 정보관리",
      items: [
        {
          name: "계정 설정",
          test: new RegExp("/my-page/set-account"),
          link: "/my-page/set-account",
        },
      ],
    },
  ]

  return menuItems.map((menu) => (
    <Styled.MenuContainer
      key={menu.title}
      data-active={/\/my-page\/?/.test(location.pathname)}>
      <Styled.MenuTitle>{menu.title}</Styled.MenuTitle>
      <Styled.MenuItemContainer>
        {menu.items.map((item) => (
          <Styled.MenuItem
            key={item.link}
            to={item.link}
            data-active={item.test.test(location.pathname)}>
            {item.name}
          </Styled.MenuItem>
        ))}
      </Styled.MenuItemContainer>
    </Styled.MenuContainer>
  ))
}
