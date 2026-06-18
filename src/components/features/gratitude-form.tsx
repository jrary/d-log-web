"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { usePlannerStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function GratitudeForm({ dateKey: key }: { dateKey: string }) {
  const gratitude = usePlannerStore((s) => s.gratitude)
  const setGratitude = usePlannerStore((s) => s.setGratitude)
  const existing = gratitude.find((g) => g.date === key)

  const [items, setItems] = useState<[string, string, string]>(["", "", ""])

  useEffect(() => {
    setItems(existing ? existing.items : ["", "", ""])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, existing?.items.join("|")])

  function update(index: number, value: string) {
    setItems((prev) => {
      const next = [...prev] as [string, string, string]
      next[index] = value
      return next
    })
  }

  function save() {
    setGratitude(key, items)
    toast.success("감사 일기를 저장했어요")
  }

  return (
    <div className="space-y-3">
      {items.map((value, i) => (
        <div key={i} className="flex gap-3">
          <span className="mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
            {i + 1}
          </span>
          <Textarea
            value={value}
            onChange={(e) => update(i, e.target.value)}
            placeholder="오늘 감사한 일을 적어보세요"
            className="min-h-[44px] flex-1"
            rows={1}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <Button onClick={save}>저장</Button>
      </div>
    </div>
  )
}
