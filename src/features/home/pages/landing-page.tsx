import {
  Communication,
  Discord,
  HeroLogin,
  HeroNoLogin,
  Programs,
  WorkerDescription,
  WorkerIntro,
  WorkerReviews,
  WorkerWorks,
} from "@features/home/components/sections"
import { useAuthStateQueryObject } from "@queries/useAuthStateQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function LandingPage() {
  const { data: isLogin } = useSuspenseQuery(useAuthStateQueryObject())

  return (
    <>
      <header />
      {isLogin ? <HeroLogin /> : <HeroNoLogin />}
      <WorkerIntro />
      <WorkerDescription />
      <WorkerReviews />
      <WorkerWorks />
      <Communication />
      <Discord />
      <Programs />
      <footer />
    </>
  )
}
