"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CATEGORIES, CATEGORY_LIST } from "@/lib/categories"
import { usePlannerStore } from "@/lib/store"
import { addDays, weekDays } from "@/lib/date"
import { dateKey } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { PageHeader } from "@/components/page-header"
import { CircularProgress } from "@/components/circular-progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Period = "day" | "week" | "month"

function rangeFor(period: Period): Date[] {
  const today = new Date()
  if (period === "day") return [today]
  if (period === "week") return weekDays(today).filter((d) => d <= today)
  // month: 1st .. today
  const days: Date[] = []
  for (let d = 1; d <= today.getDate(); d++) {
    days.push(new Date(today.getFullYear(), today.getMonth(), d))
  }
  return days
}

export default function StatsPage() {
  const mounted = useMounted()
  const [period, setPeriod] = useState<Period>("week")
  const todos = usePlannerStore((s) => s.todos)
  const blocks = usePlannerStore((s) => s.blocks)
  const habits = usePlannerStore((s) => s.habits)
  const moods = usePlannerStore((s) => s.moods)

  const stats = useMemo(() => {
    const days = rangeFor(period)
    const keys = new Set(days.map(dateKey))

    const rangeTodos = todos.filter((t) => keys.has(t.date))
    const planTotal = rangeTodos.length
    const planDone = rangeTodos.filter((t) => t.done).length
    const planRate = planTotal ? Math.round((planDone / planTotal) * 100) : 0

    let habitHit = 0
    const habitDenom = habits.length * days.length
    for (const h of habits) {
      const hs = new Set(h.history)
      for (const k of keys) if (hs.has(k)) habitHit++
    }
    const habitRate = habitDenom ? Math.round((habitHit / habitDenom) * 100) : 0

    const categoryMinutes: Record<string, number> = {}
    for (const b of blocks) {
      if (!keys.has(b.date)) continue
      categoryMinutes[b.category] = (categoryMinutes[b.category] ?? 0) + (b.end - b.start)
    }
    const categoryData = CATEGORY_LIST.map((c) => ({
      label: c.label,
      hours: Math.round(((categoryMinutes[c.key] ?? 0) / 60) * 10) / 10,
      color: c.color,
    })).filter((d) => d.hours > 0)

    const moodData = days
      .map((d) => {
        const entry = moods.find((m) => m.date === dateKey(d))
        return entry ? { label: format(d, "M/d"), score: entry.score } : null
      })
      .filter(Boolean) as { label: string; score: number }[]

    return { planRate, planDone, planTotal, habitRate, categoryData, moodData }
  }, [period, todos, blocks, habits, moods])

  return (
    <div>
      <PageHeader title="통계" en="Statistics" description="나의 기록을 한눈에 확인하세요">
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <TabsList>
            <TabsTrigger value="day">일간</TabsTrigger>
            <TabsTrigger value="week">주간</TabsTrigger>
            <TabsTrigger value="month">월간</TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>

      {!mounted ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>계획 달성률</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <CircularProgress value={stats.planRate} />
              <p className="text-sm text-muted-foreground">
                {stats.planDone} / {stats.planTotal} 완료
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>습관 달성률</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <CircularProgress
                value={stats.habitRate}
                color="var(--category-exercise)"
              />
              <p className="text-sm text-muted-foreground">{habitsLabel(period)}</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>카테고리별 시간 사용</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.categoryData.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  기록된 타임블록이 없습니다.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={stats.categoryData} layout="vertical" margin={{ left: 8 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <XAxis type="number" unit="h" fontSize={12} />
                    <YAxis type="category" dataKey="label" width={48} fontSize={12} />
                    <Tooltip formatter={(v) => [`${v}시간`, "시간"]} />
                    <Bar dataKey="hours" radius={[0, 6, 6, 0]}>
                      {stats.categoryData.map((d) => (
                        <Cell key={d.label} fill={d.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>무드 변화 추이</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.moodData.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  기록된 무드가 없습니다.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={stats.moodData} margin={{ left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" fontSize={12} />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} fontSize={12} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function habitsLabel(period: Period) {
  return period === "day" ? "오늘 기준" : period === "week" ? "이번 주 기준" : "이번 달 기준"
}
