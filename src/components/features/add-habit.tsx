"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { CATEGORY_LIST } from "@/lib/categories"
import type { CategoryKey } from "@/lib/types"
import { usePlannerStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const EMOJI_CHOICES = ["🏃", "📚", "💧", "🧘", "🥗", "😴", "✍️", "🎯", "🌱", "🎸", "🧹", "💪"]

export function AddHabit() {
  const addHabit = usePlannerStore((s) => s.addHabit)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [emoji, setEmoji] = useState("🎯")
  const [color, setColor] = useState<CategoryKey>("exercise")

  function submit() {
    const trimmed = name.trim()
    if (!trimmed) return
    addHabit({ name: trimmed, emoji, color })
    setName("")
    setEmoji("🎯")
    setColor("exercise")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 습관</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="habit-name">이름</Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 운동하기"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>아이콘</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_CHOICES.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmoji(em)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border text-lg transition-colors",
                    emoji === em ? "border-primary bg-accent" : "hover:bg-accent",
                  )}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>색상</Label>
            <div className="flex gap-2">
              {CATEGORY_LIST.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setColor(c.key)}
                  className={cn(
                    "h-8 w-8 rounded-full ring-offset-2 transition-all",
                    color === c.key && "ring-2 ring-offset-background",
                  )}
                  style={{ backgroundColor: c.color }}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit} className="w-full">
            추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
