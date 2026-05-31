"use client"

import { Stars } from "@react-three/drei"

export function StarField() {
  return (
    <Stars
      radius={80}
      depth={42}
      count={2400}
      factor={4}
      saturation={0}
      fade
      speed={0.35}
    />
  )
}
