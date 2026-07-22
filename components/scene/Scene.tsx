"use client";

import { Canvas } from "@react-three/fiber";
import { SceneProgressProvider } from "./sceneProgress";
import ShapeField from "./ShapeField";
import CameraRig from "./CameraRig";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
        <SceneProgressProvider>
          <color attach="background" args={["#0d1117"]} />
          <fog attach="fog" args={["#0d1117", 8, 30]} />
          <ambientLight intensity={0.4} color="#feb47b" />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#cb2e07" />
          <pointLight position={[-5, -3, -5]} intensity={0.6} color="#feb47b" />
          <ShapeField />
          <CameraRig />
        </SceneProgressProvider>
      </Canvas>
    </div>
  );
}
