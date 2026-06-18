import { Hero } from "@features/programs/components/sections/hero"
import { Program } from "@features/programs/components/sections/program"
import * as Styled from "./programs-page.styled"

export default function ProgramsPage() {
  return (
    <Styled.Container>
      <Hero />
      <Program />
    </Styled.Container>
  )
}
