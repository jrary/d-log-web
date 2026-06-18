"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useMounted } from "@/hooks/use-mounted"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

function SettingRow({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium">{title}</p>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const mounted = useMounted()
  const [dark, setDark] = useState(false)
  const [reminders, setReminders] = useState(true)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggleDark(value: boolean) {
    setDark(value)
    document.documentElement.classList.toggle("dark", value)
  }

  function resetData() {
    if (typeof window === "undefined") return
    window.localStorage.removeItem("d-log-store")
    toast.success("데이터를 초기화했어요. 새로고침합니다.")
    setTimeout(() => window.location.reload(), 600)
  }

  return (
    <div>
      <PageHeader title="설정" en="Settings" description="프로필과 앱 환경을 관리하세요" />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>프로필</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg">나</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                사진 변경
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" defaultValue="나의 플래너" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" defaultValue="shine@softsquared.com" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => toast.success("프로필을 저장했어요")}>저장</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>환경 설정</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <SettingRow title="다크 모드" description="어두운 테마를 사용합니다">
              <Switch checked={mounted ? dark : false} onCheckedChange={toggleDark} />
            </SettingRow>
            <SettingRow title="리마인더 알림" description="매일 기록 알림을 받습니다">
              <Switch checked={reminders} onCheckedChange={setReminders} />
            </SettingRow>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>데이터</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingRow
              title="데이터 초기화"
              description="모든 할 일·습관·기록을 삭제합니다"
            >
              <Button variant="outline" className="text-destructive" onClick={resetData}>
                초기화
              </Button>
            </SettingRow>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
