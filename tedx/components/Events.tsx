'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model({ mousePosition, scale = 2.5 }: { mousePosition: { x: number; y: number }, scale?: number }) {
  const { scene } = useGLTF('/3d logo/tedx+logo+3d+model.glb')
  const modelRef = useRef<THREE.Group>(null)
  
  // Apply red color to all meshes in the model
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.color.set('#EB0028')
      child.material.emissive.set('#EB0028')
      child.material.emissiveIntensity = 0.2
    }
  })
  
  // Smoothly rotate model based on mouse position
  useFrame(() => {
    if (modelRef.current) {
      // Limit rotation to about 70 degrees on each side (140 degrees total)
      const maxRotation = Math.PI * 0.39 // ~70 degrees in radians
      const targetRotationY = (Math.PI * 1.5) + mousePosition.x * maxRotation // Start at 270 degrees (90 + 180)
      const targetRotationX = mousePosition.y * maxRotation * 0.5
      
      modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.1
      modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.1
    }
  })
  
  return (
    <group ref={modelRef} rotation={[0, Math.PI * 1.5, 0]} position={[0, 0, 0]}>
      <primitive object={scene} scale={scale} />
    </group>
  )
}

export default function Events() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [modelScale, setModelScale] = useState(2.5)
  const [shouldLoadModel, setShouldLoadModel] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Only load 3D model when section is near viewport AND not on mobile
  useEffect(() => {
    if (isInView && !isMobile) {
      setShouldLoadModel(true)
    }
  }, [isInView, isMobile])
  
  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth <= 640) {
        setModelScale(1.5)
      } else if (window.innerWidth <= 968) {
        setModelScale(2)
      } else {
        setModelScale(2.5)
      }
    }
    
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    setMousePosition({ x, y })
  }
  
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <section ref={ref} id="events" style={{
      position: 'relative',
      background: '#000000',
      padding: '100px 0'
    }}>
      <div className="container">
        <div className="header">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Events
          </motion.h2>
          <motion.a
            href="#events"
            className="seeAll"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ x: 5 }}
          >
            SEE ALL EVENTS <span>→</span>
          </motion.a>
        </div>

        <motion.div
          className="eventCard"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="eventContent">
            <div className="eventText">
              <motion.div 
                className="date"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                APRIL 11, 2026
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Beyond Boundaries: Ideas That Inspire
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Join us for an unforgettable evening of innovation, inspiration, and ideas worth spreading. 
                Experience groundbreaking talks from visionary speakers who are shaping the future.
              </motion.p>
              <motion.div 
                className="eventMeta"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="metaItem">
                  <svg className="metaIcon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>JUET Campus Auditorium</span>
                </div>
                <div className="metaItem">
                  <svg className="metaIcon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>6:00 PM - 10:00 PM</span>
                </div>
              </motion.div>
              <motion.a
                href="/registration"
                className="btn"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Tickets →
              </motion.a>
            </div>
            <motion.div 
              className="eventImage"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: 'pointer' }}
            >
              <div className="imagePlaceholder" style={{ position: 'relative' }}>
                {!isMobile && shouldLoadModel ? (
                  <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
                    <ambientLight intensity={0.7} />
                    <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} />
                    <pointLight position={[-5, 0, 5]} intensity={0.5} />
                    <Suspense fallback={
                      <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="#EB0028" />
                      </mesh>
                    }>
                      <Model mousePosition={mousePosition} scale={modelScale} />
                    </Suspense>
                  </Canvas>
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #EB0028 0%, #8B0000 100%)',
                    color: '#fff'
                  }}>
                    <div className="circleDecor circle1"></div>
                    <div className="circleDecor circle2"></div>
                    <div className="circleDecor circle3"></div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
