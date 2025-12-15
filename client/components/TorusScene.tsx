import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float hoverState;
  uniform float time;

  void main() {
    // Use UV coordinates for smooth flowing gradient
    float u = vUv.x + time * 0.15;
    float v = vUv.y + time * 0.1;

    // Vibrant colors
    vec3 blue = vec3(0.3, 0.7, 1.0);
    vec3 pink = vec3(1.0, 0.4, 0.8);
    vec3 purple = vec3(0.9, 0.3, 1.0);

    // Create smooth flowing gradient
    float t1 = sin(u * 6.28) * 0.5 + 0.5;
    float t2 = cos(v * 6.28) * 0.5 + 0.5;
    float t3 = sin((u + v) * 3.14159) * 0.5 + 0.5;

    // Mix colors with smooth transitions
    vec3 color = mix(blue, pink, t1 * t2);
    color = mix(color, purple, t3);

    // Brighten the gradient when hovering, always visible
    vec3 finalColor = color * (1.0 + hoverState * 0.3);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function TorusSceneContent() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, gl } = useThree();

  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const rotationTargetRef = useRef({ x: 0, y: 0 });
  const hoverStateRef = useRef(0);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const timeRef = useRef(0);

  // Handle mouse move for both hover detection and dragging
  const handleMouseMove = (e: MouseEvent) => {
    const rect = gl.domElement.getBoundingClientRect();

    // Update normalized mouse coordinates for raycasting
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Check if hovering over torus with raycaster
    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    if (meshRef.current) {
      const intersects = raycasterRef.current.intersectObject(meshRef.current);

      if (intersects.length > 0) {
        if (!isHoveringRef.current) {
          isHoveringRef.current = true;
          document.body.style.cursor = "grab";
        }
      } else {
        if (isHoveringRef.current && !isDraggingRef.current) {
          isHoveringRef.current = false;
          document.body.style.cursor = "default";
        }
      }
    }

    // Handle dragging rotation
    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMouseRef.current.x;
      const deltaY = e.clientY - previousMouseRef.current.y;

      rotationTargetRef.current.y += deltaX * 0.005;
      rotationTargetRef.current.x += deltaY * 0.005;

      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    // Check if mouse is over torus
    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    if (meshRef.current) {
      const intersects = raycasterRef.current.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        isDraggingRef.current = true;
        previousMouseRef.current = { x: e.clientX, y: e.clientY };
        document.body.style.cursor = "grabbing";
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (isHoveringRef.current) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "default";
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // Smooth rotation animation
      meshRef.current.rotation.x += (rotationTargetRef.current.x - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (rotationTargetRef.current.y - meshRef.current.rotation.y) * 0.05;

      // Auto-rotate when not dragging
      if (!isDraggingRef.current) {
        rotationTargetRef.current.y += 0.002;
      }

      // Smooth hover state transition
      hoverStateRef.current += (isHoveringRef.current ? 1 : -1) * 0.06;
      hoverStateRef.current = Math.max(0, Math.min(1, hoverStateRef.current));

      // Update shader uniforms and control wireframe
      if (materialRef.current) {
        materialRef.current.uniforms.hoverState.value = hoverStateRef.current;
        materialRef.current.uniforms.time.value = timeRef.current;
        // Suppress wireframe when dragging, show wireframe otherwise
        materialRef.current.wireframe = !isDraggingRef.current;
      }

      // Increment time for animation
      timeRef.current += 0.01;
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.75, 0.45, 32, 100, Math.PI * 2]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            hoverState: { value: 0 },
            time: { value: 0 },
          }}
          wireframe={true}
        />
      </mesh>

      {/* Lighting for the scene */}
      <ambientLight intensity={1.2} color={0xffffff} />
    </>
  );
}

export default function TorusScene() {
  return <TorusSceneContent />;
}