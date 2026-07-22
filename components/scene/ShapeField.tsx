"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneProgress } from "./sceneProgress";

const SHAPE_COUNT = 48;

// Deterministic pseudo-random layout so server/client render match (no Math.random at module scope).
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

type Placement = {
  position: [number, number, number];
  rotationSpeed: number;
  scale: number;
};

export default function ShapeField() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const progressRef = useSceneProgress();

  const placements = useMemo<Placement[]>(() => {
    return Array.from({ length: SHAPE_COUNT }, (_, i) => {
      const a = seededRandom(i * 1.7);
      const b = seededRandom(i * 3.1 + 1);
      const c = seededRandom(i * 5.3 + 2);
      return {
        position: [(a - 0.5) * 20, (b - 0.5) * 14, (c - 0.5) * 20 - 5],
        rotationSpeed: 0.05 + seededRandom(i * 7.9) * 0.15,
        scale: 0.3 + seededRandom(i * 11.3) * 0.7,
      };
    });
  }, []);

  useFrame((_, delta) => {
    const progress = progressRef.current;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const speed = placements[i].rotationSpeed;
      mesh.rotation.x += delta * speed;
      mesh.rotation.y += delta * speed * 0.7;

      const material = mesh.material as THREE.MeshStandardMaterial;
      const intensity = 0.4 + progress * 1.2;
      material.emissiveIntensity = intensity;
    });
  });

  return (
    <group ref={groupRef}>
      {placements.map((p, i) => (
        <mesh
          key={i}
          position={p.position}
          scale={p.scale}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#2a0f08"
            emissive="#cb2e07"
            emissiveIntensity={0.4}
            roughness={0.35}
            metalness={0.2}
            wireframe={i % 5 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}
