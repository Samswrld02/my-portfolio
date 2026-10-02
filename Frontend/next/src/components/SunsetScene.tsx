"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 180;

const skyVertex = `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFragment = `
  varying vec3 vPos;
  uniform float uTime;
  void main() {
    float y = normalize(vPos).y;
    float pulse = 0.5 + 0.5 * sin(uTime * 0.35);

    vec3 zenith = vec3(0.02, 0.031, 0.08);
    vec3 mid = mix(vec3(0.06, 0.09, 0.20), vec3(0.32, 0.14, 0.24), pulse * 0.28);
    vec3 horizon = mix(vec3(0.88, 0.38, 0.28), vec3(0.94, 0.58, 0.18), 0.5 + 0.25 * pulse);
    vec3 peach = vec3(0.98, 0.78, 0.58);

    vec3 col = zenith;
    col = mix(col, mid, smoothstep(0.55, -0.1, y));
    col = mix(col, horizon, smoothstep(-0.12, -0.36, y));
    col = mix(col, peach, smoothstep(-0.28, -0.5, y) * 0.7);

    float band = exp(-pow((y + 0.28) * 6.5, 2.0)) * (0.32 + 0.14 * pulse);
    col += vec3(0.95, 0.48, 0.2) * band;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Sky({ active }: { active: React.RefObject<boolean> }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: { uTime: { value: 0 } },
        vertexShader: skyVertex,
        fragmentShader: skyFragment,
      }),
    [],
  );

  useEffect(() => () => mat.dispose(), [mat]);

  useFrame(({ clock }) => {
    if (!active.current) return;
    mat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh>
      <sphereGeometry args={[20, 48, 24]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function Haze({ active }: { active: React.RefObject<boolean> }) {
  const points = useRef<THREE.Points>(null);
  const speeds = useMemo(
    () =>
      Float32Array.from(
        { length: PARTICLE_COUNT },
        () => 0.02 + Math.random() * 0.07,
      ),
    [],
  );
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = Math.random() * 2.6 - 0.9;
      arr[i * 3 + 2] = -1 - Math.random() * 4.5;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!active.current) return;
    const attr = points.current?.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] += speeds[i] * 0.018;
      if (arr[i * 3] > 4.5) arr[i * 3] = -4.5;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffc9a3"
        size={0.032}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Pause/resume the R3F render loop without React setState
 * (setState during scroll was causing the choppiness).
 */
function FrameloopController({
  active,
  host,
}: {
  active: React.MutableRefObject<boolean>;
  host: React.RefObject<HTMLElement | null>;
}) {
  const set = useThree((s) => s.set);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let heroVisible = true;
    let scrolling = false;

    const apply = () => {
      const run = !reduce.matches && heroVisible && !scrolling;
      active.current = run;
      set({ frameloop: run ? "always" : "never" });
    };

    const onScrollStart = () => {
      scrolling = true;
      apply();
    };
    const onScrollEnd = () => {
      scrolling = false;
      apply();
    };

    // Native scroll (wheel/trackpad): pause only while actively scrolling
    let timer = 0;
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        apply();
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        scrolling = false;
        apply();
      }, 80);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting && entry.intersectionRatio > 0.2;
        apply();
      },
      { threshold: [0, 0.2, 0.5, 1] },
    );
    if (host.current) io.observe(host.current);

    apply();
    reduce.addEventListener("change", apply);
    window.addEventListener("portfolio:scroll-start", onScrollStart);
    window.addEventListener("portfolio:scroll-end", onScrollEnd);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      reduce.removeEventListener("change", apply);
      window.removeEventListener("portfolio:scroll-start", onScrollStart);
      window.removeEventListener("portfolio:scroll-end", onScrollEnd);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [active, host, set]);

  return null;
}

export function SunsetScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const active = useRef(true);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 h-full w-full [contain:strict] [transform:translateZ(0)]"
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0.15, 3.1], fov: 55, near: 0.1, far: 100 }}
        dpr={1}
        frameloop="always"
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <FrameloopController active={active} host={hostRef} />
        <Sky active={active} />
        <Haze active={active} />
      </Canvas>
    </div>
  );
}
