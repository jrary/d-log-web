"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { CATEGORY_LIST } from "@/lib/categories"
import type { CategoryKey } from "@/lib/types"
import { usePlannerStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddTodo({ date }: { date: string }) {
  const addTodo = usePlannerStore((s) => s.addTodo)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<CategoryKey>("study")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    addTodo({ title: trimmed, category, date })
    setTitle("")
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="flex-1"
      />
      <div className="flex gap-2">
        <Select value={category} onValueChange={(v) => setCategory(v as CategoryKey)}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_LIST.map((c) => (
              <SelectItem key={c.key} value={c.key}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">
          <Plus className="h-4 w-4" />
          추가
        </Button>
      </div>
    </form>
  )
}
