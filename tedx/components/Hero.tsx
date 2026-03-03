'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <>
      <section ref={ref} style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000000',
        paddingTop: '80px'
      }}>
        <motion.div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          y
        }}>
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          >
            <source src="/webm/try.webm" type="video/webm" />
          </video>
          
          {/* Dark Overlay for Text Readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%)',
            zIndex: 1
          }}></div>

          {/* Red Accent Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(235, 0, 40, 0.15) 0%, transparent 50%)',
            zIndex: 1
          }}></div>
        </motion.div>

        <motion.div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          opacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh'
        }}>
          {/* Main Title */}
          <motion.h1
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
              fontWeight: '900',
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            UNTETHERED
          </motion.h1>

          {/* Event Date */}
          <motion.div
            style={{
              color: '#ffffff',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              fontWeight: '500',
              marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)',
              letterSpacing: '0.05em'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            11th April 2026
          </motion.div>

          {/* Event Location */}
          <motion.div
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: '400',
              lineHeight: 1.5,
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Jaypee University of Engineering & Technology, Guna
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            style={{
              display: 'flex',
              gap: 'clamp(1rem, 2.5vw, 1.5rem)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
              flexWrap: 'wrap'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.a
              href="/registration"
              style={{
                backgroundColor: '#EB0028',
                color: '#ffffff',
                padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2rem, 4vw, 3rem)',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                textDecoration: 'none',
                display: 'inline-block',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(235, 0, 40, 0.4)',
                letterSpacing: '0.02em'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 30px rgba(235, 0, 40, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Passes
            </motion.a>
            
            <motion.a
              href="/brochure.pdf"
              download
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2rem, 4vw, 3rem)',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                textDecoration: 'none',
                display: 'inline-block',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em'
              }}
              whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              Download Brochure
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 3
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            style={{
              width: 'clamp(22px, 3vw, 28px)',
              height: 'clamp(38px, 5vw, 48px)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '18px',
              display: 'flex',
              justifyContent: 'center',
              padding: '7px 0'
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div style={{
              width: '3px',
              height: '7px',
              background: '#EB0028',
              borderRadius: '2px'
            }} />
          </motion.div>
        </motion.div>

        {/* Gradient Transition */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '300px',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.7) 60%, #000000 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>
      </section>
    </>
  )
}
