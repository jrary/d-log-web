"use client"

import { Check, Trash2 } from "lucide-react"
import { CATEGORIES } from "@/lib/categories"
import type { Habit } from "@/lib/types"
import { usePlannerStore } from "@/lib/store"
import { currentStreak, weekDays, DAY_LABELS_MON } from "@/lib/date"
import { dateKey } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HabitStreakBadge } from "@/components/habit-streak-badge"

export function HabitCard({ habit }: { habit: Habit }) {
  const toggleHabit = usePlannerStore((s) => s.toggleHabit)
  const removeHabit = usePlannerStore((s) => s.removeHabit)

  const today = new Date()
  const color = CATEGORIES[habit.color].color
  const streak = currentStreak(habit.history, today)
  const week = weekDays(today)
  const historySet = new Set(habit.history)

  // monthly completion rate over elapsed days this month
  const elapsed = today.getDate()
  const monthPrefix = dateKey(today).slice(0, 7)
  const monthDone = habit.history.filter((d) => d.startsWith(monthPrefix)).length
  const monthRate = elapsed > 0 ? Math.round((monthDone / elapsed) * 100) : 0

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
              style={{ backgroundColor: `${color}1a` }}
            >
              {habit.emoji}
            </div>
            <div>
              <p className="font-semibold">{habit.name}</p>
              <HabitStreakBadge streak={streak} className="mt-1" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => removeHabit(habit.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">삭제</span>
          </Button>
        </div>

        <div className="flex justify-between">
          {week.map((day, i) => {
            const key = dateKey(day)
            const done = historySet.has(key)
            const isFuture = day > today && key !== dateKey(today)
            return (
              <div key={key} className="flex flex-col items-center gap-1.5">
                <span className="text-xs text-muted-foreground">{DAY_LABELS_MON[i]}</span>
                <button
                  type="button"
                  disabled={isFuture}
                  onClick={() => toggleHabit(habit.id, key)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border transition-all",
                    done ? "text-white" : "border-border text-transparent hover:border-primary",
                    isFuture && "opacity-30",
                  )}
                  style={done ? { backgroundColor: color, borderColor: color } : undefined}
                  aria-label={`${DAY_LABELS_MON[i]} ${done ? "달성" : "미달성"}`}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
          <span>이번 달 달성률</span>
          <span className="font-semibold text-foreground">{monthRate}%</span>
        </div>
      </CardContent>
    </Card>
  )
}
