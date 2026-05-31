"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, Preload, Sparkles } from "@react-three/drei"
import { ACESFilmicToneMapping, SRGBColorSpace } from "three"

import { BlackHole } from "@/components/cinematic/BlackHole"
import { CameraRig } from "@/components/cinematic/CameraRig"
import { StarField } from "@/components/cinematic/StarField"

export function SpaceCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace
          gl.toneMapping = ACESFilmicToneMapping
          gl.toneMappingExposure = 1.12
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} intensity={2.2} color="#22d3ee" />
          <pointLight position={[-4, -3, 2]} intensity={1.2} color="#7c3aed" />
          <StarField />
          <Sparkles
            count={72}
            scale={[8, 3.4, 2.6]}
            size={1.8}
            speed={0.28}
            opacity={0.55}
            color="#22d3ee"
          />
          <Float
            speed={1.15}
            rotationIntensity={0.18}
            floatIntensity={0.28}
            floatingRange={[-0.08, 0.08]}
          >
            <BlackHole />
          </Float>
          <CameraRig />
          <Preload all />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,3,10,0.18)_42%,#02030a_80%)]" />
    </div>
  )
}
