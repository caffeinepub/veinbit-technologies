import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NetworkSphere() {
  const groupRef = useRef<THREE.Group>(null);

  const { lineGeometry, pointGeometry } = useMemo(() => {
    const nodeCount = 180;
    const positions: [number, number, number][] = [];

    // Fibonacci lattice on sphere surface
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      positions.push([
        Math.cos(theta) * radius * 2.5,
        y * 2.5,
        Math.sin(theta) * radius * 2.5,
      ]);
    }

    // Connect nearby nodes
    const lineVerts: number[] = [];
    const maxDist = 1.4;
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i];
        const b = positions[j];
        const d = Math.sqrt(
          (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
        );
        if (d < maxDist) {
          lineVerts.push(...a, ...b);
        }
      }
    }

    const linePosArray = new Float32Array(lineVerts);
    const pointPosArray = new Float32Array(positions.flat());

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(linePosArray, 3));

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pointPosArray, 3));

    return { lineGeometry: lGeo, pointGeometry: pGeo };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00c8ff" transparent opacity={0.15} />
      </lineSegments>

      <points geometry={pointGeometry}>
        <pointsMaterial
          color="#00c8ff"
          size={0.06}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Inner atmospheric glow sphere */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#0040a0"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 300;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.015;
      ref.current.rotation.x = t * 0.008;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#8b5cf6"
        size={0.025}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#00c8ff" intensity={0.8} />
      <pointLight position={[-5, -3, -5]} color="#8b5cf6" intensity={0.5} />
      <NetworkSphere />
      <AmbientParticles />
    </Canvas>
  );
}
