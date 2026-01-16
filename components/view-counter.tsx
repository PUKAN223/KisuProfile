"use client"

import { useEffect, useState, useRef } from "react"

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null)
  const hasIncremented = useRef(false)

  useEffect(() => {
    if (hasIncremented.current) return
    hasIncremented.current = true

    const updateCounter = async () => {
      try {
        // Try to increment
        const res = await fetch("https://api.counterapi.dev/v2/kisu-x3s-team-2513/first-counter-2513/up")
        const views = await res.json()
        console.log(views.data.up_count)
        setViews(views.data.up_count)
      } catch {
        setViews(0)
      }
    }

    updateCounter()
  }, [])

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/80 font-mono text-xs animate-in fade-in duration-700 hover:bg-black/30 transition-colors cursor-default select-none">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span className="font-bold min-w-[20px] text-center">{views}</span>
      <span className="text-white/40 text-[10px] uppercase tracking-wider ml-0.5">views</span>
    </div>
  )
}
