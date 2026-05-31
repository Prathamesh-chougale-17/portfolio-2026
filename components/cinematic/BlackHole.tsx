"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group, Mesh, Points } from "three"

const dustPositions = createDustPositions()

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function createDustPositions() {
  const positions = new Float32Array(420 * 3)

  for (let index = 0; index < 420; index++) {
    const radius = 1.8 + pseudoRandom(index + 1) * 2.1
    const angle = pseudoRandom(index + 101) * Math.PI * 2
    const height = (pseudoRandom(index + 201) - 0.5) * 0.22
    positions[index * 3] = Math.cos(angle) * radius
    positions[index * 3 + 1] = height
    positions[index * 3 + 2] = Math.sin(angle) * radius
  }

  return positions
}

export function BlackHole() {
  const groupRef = useRef<Group>(null)
  const coreRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)
  const outerRingRef = useRef<Mesh>(null)
  const dustRef = useRef<Points>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.035
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.22
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.32
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.16
    }
    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.08
      dustRef.current.rotation.z += delta * 0.035
    }
  })

  return (
    <group
      ref={groupRef}
      position={[0.9, 0.12, 0]}
      rotation={[0.02, -0.25, -0.12]}
      scale={1.16}
    >
      <points ref={dustRef} rotation={[1.35, 0, 0.08]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#22d3ee"
          size={0.018}
          transparent
          opacity={0.72}
          depthWrite={false}
        />
      </points>
      <mesh rotation={[1.34, 0.05, 0.15]}>
        <torusGeometry args={[2.18, 0.19, 28, 240]} />
        <meshStandardMaterial
          color="#facc15"
          emissive="#facc15"
          emissiveIntensity={0.8}
          roughness={0.18}
          metalness={0.25}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshStandardMaterial
          color="#02030a"
          emissive="#111827"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.28, 64, 64]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[1.15, 0.25, 0.4]}>
        <torusGeometry args={[1.8, 0.035, 18, 180]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.25}
          roughness={0.12}
          metalness={0.5}
        />
      </mesh>
      <mesh ref={outerRingRef} rotation={[1.25, -0.35, -0.2]}>
        <torusGeometry args={[2.28, 0.018, 14, 180]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.75}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      <mesh rotation={[1.48, 0.35, 0.6]}>
        <torusGeometry args={[2.82, 0.012, 12, 240]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#34d399"
          emissiveIntensity={0.42}
          roughness={0.2}
          transparent
          opacity={0.62}
        />
      </mesh>
    </group>
  )
}
