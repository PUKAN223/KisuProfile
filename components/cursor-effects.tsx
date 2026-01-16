"use client"

import { useEffect, useState } from "react"
import styles from "./cursor-effects.module.css"

interface Ripple {
  x: number
  y: number
  id: number
}

export function CursorEffects() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    const handleClick = (e: MouseEvent) => {
      setIsClicking(true)
      setTimeout(() => setIsClicking(false), 150)

      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() }
      setRipples((prev) => [...prev, newRipple])
      
      // Cleanup ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <>
      <div 
        className={`${styles.cursor} ${isClicking ? styles.clicking : ''}`}
        style={{ left: cursorPos.x, top: cursorPos.y }} 
      />
      <div 
        className={styles.cursorDot}
        style={{ left: cursorPos.x, top: cursorPos.y }} 
      />
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={styles.ripple}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </>
  )
}
