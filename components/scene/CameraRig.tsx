"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";
import { useSceneProgress } from "./sceneProgress";
import { SECTION_IDS } from "@/lib/scrollCheckpoints";

// One waypoint per section: camera position + look-at target.
const WAYPOINTS: { position: [number, number, number]; lookAt: [number, number, number] }[] =
  SECTION_IDS.map((_, i) => {
    const angle = (i / SECTION_IDS.length) * Math.PI * 0.6;
    return {
      position: [Math.sin(angle) * 6, i % 2 === 0 ? 1 : -1, 10 - i * 1.5],
      lookAt: [0, 0, -5],
    };
  });

export default function CameraRig() {
  const { camera } = useThree();
  const progressRef = useSceneProgress();
  const targetPos = useRef(new THREE.Vector3(...WAYPOINTS[0].position));
  const targetLookAt = useRef(new THREE.Vector3(...WAYPOINTS[0].lookAt));
  const currentLookAt = useRef(new THREE.Vector3(...WAYPOINTS[0].lookAt));

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;

        const segment = self.progress * (WAYPOINTS.length - 1);
        const index = Math.min(Math.floor(segment), WAYPOINTS.length - 2);
        const t = segment - index;
        const a = WAYPOINTS[index];
        const b = WAYPOINTS[index + 1];

        targetPos.current.set(
          THREE.MathUtils.lerp(a.position[0], b.position[0], t),
          THREE.MathUtils.lerp(a.position[1], b.position[1], t),
          THREE.MathUtils.lerp(a.position[2], b.position[2], t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(a.lookAt[0], b.lookAt[0], t),
          THREE.MathUtils.lerp(a.lookAt[1], b.lookAt[1], t),
          THREE.MathUtils.lerp(a.lookAt[2], b.lookAt[2], t)
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, [progressRef]);

  useFrame((_, delta) => {
    const lerpFactor = 1 - Math.pow(0.001, delta);
    camera.position.lerp(targetPos.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
