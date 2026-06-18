import { Outlet } from "react-router"

export default function ReportsPage() {
  return (
    <>
      보고서 목록 페이지
      <br />
      보고서 PDF: <Outlet />
    </>
  )
}
