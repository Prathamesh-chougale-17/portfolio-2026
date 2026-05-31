"use client"

import { useFrame } from "@react-three/fiber"
import { MathUtils } from "three"

export function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const targetX = Math.sin(t * 0.12) * 0.22 + state.pointer.x * 0.26
    const targetY = Math.cos(t * 0.1) * 0.16 + state.pointer.y * 0.18
    state.camera.position.x = MathUtils.lerp(
      state.camera.position.x,
      targetX,
      0.035
    )
    state.camera.position.y = MathUtils.lerp(
      state.camera.position.y,
      targetY,
      0.035
    )
    state.camera.lookAt(0, 0, 0)
  })

  return null
}
