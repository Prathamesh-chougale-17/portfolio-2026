"use client"

import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"

export function PageTransition() {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-16 z-[45] h-px origin-left bg-cyan-300/80 shadow-[0_0_30px_rgba(34,211,238,0.8)]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
      />
    </AnimatePresence>
  )
}
