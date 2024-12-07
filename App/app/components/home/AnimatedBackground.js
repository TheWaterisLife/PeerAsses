'use client';

import { useRef, useState } from 'react'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import { useFrame,Canvas } from '@react-three/fiber'

function AnimatedSphere() {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 8) / 4
      meshRef.current.rotation.y = Math.sin(t / 8) / 4
      meshRef.current.rotation.z = Math.sin(t / 3) / 4
      meshRef.current.position.x = Math.sin(t / 4) / 3
      meshRef.current.position.y = Math.cos(t / 4) / 3
    }
  })

  return (
    <Float speed={15} rotationIntensity={6} floatIntensity={15}>
      <Sphere
        ref={meshRef}
        args={[1, 100, 200]}
        scale={2}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? '#FF6B6B' : '#4834d4'}
          distort={0.5}
          speed={0.5}
          roughness={4}
        />
      </Sphere>
    </Float>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <group position={[10, 10, 10]}>
        <pointLight />
        </group>
        <AnimatedSphere />
        <Stars
          radius={30}
          depth={15}
          count={5000}
          factor={6}
          saturation={0}
          fade
          speed={3}
        />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30" />
    </div>
  )
}
