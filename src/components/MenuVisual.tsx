'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
    const meshRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);
    const texture = useLoader(THREE.TextureLoader, "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80");

    // Particle count and distribution
    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        if (meshRef.current) {
            // Gentle floating/waving motion
            meshRef.current.position.x = -0.8; // Base offset to the left
            meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
            meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
            
            // Mouse reaction (parallax)
            const { x, y } = state.mouse;
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.2, 0.1);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.2, 0.1);
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.y = time * 0.05;
            particlesRef.current.rotation.x = time * 0.02;
        }
    });

    return (
        <>
            <ambientLight intensity={1.2} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            
            {/* Particle Field */}
            <Points ref={particlesRef} positions={positions}>
                <PointMaterial
                    transparent
                    color="#d4af37"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Distorted Image Plane */}
            <Float
                speed={2}
                rotationIntensity={0.5}
                floatIntensity={0.5}
            >
                <mesh ref={meshRef}>
                    <planeGeometry args={[6, 3.8, 64, 64]} />
                    <meshBasicMaterial 
                        map={texture} 
                        side={THREE.DoubleSide}
                        transparent={true}
                    />
                </mesh>
            </Float>

            <Stars 
                radius={100} 
                depth={50} 
                count={5000} 
                factor={4} 
                saturation={0} 
                fade 
                speed={1} 
            />
        </>
    );
}

export default function MenuVisual() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <color attach="background" args={['#000000']} />
                <Scene />
            </Canvas>
        </div>
    );
}
