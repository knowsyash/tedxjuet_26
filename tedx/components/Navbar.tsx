'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        if (navRef.current) {
          const navRect = navRef.current.getBoundingClientRect()
          setMouseX(e.clientX - navRect.left)
        }
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleNavigation = (item: string) => {
    const isTeamPage = pathname === '/team'
    const isContactPage = pathname === '/contact'
    const isRegistrationPage = pathname === '/registration'
    const isAboutPage = pathname === '/about'
    const isSpeakersPage = pathname === '/speakers'
    const sectionId = item.toLowerCase()

    setMobileMenuOpen(false)

    if (isTeamPage || isContactPage || isRegistrationPage || isAboutPage || isSpeakersPage) {
      router.push(`/#${sectionId}`)
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = ['Register', 'About', 'Events', 'Speakers', 'Team', 'Contact']

  // Magnification component for each nav item
  const MagnifyNavItem = ({ item, mouseX }: { item: string; mouseX: number }) => {
    const ref = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, width: 0 })

    useEffect(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const parentRect = navRef.current?.getBoundingClientRect()
        if (parentRect) {
          setPosition({
            x: rect.left - parentRect.left + rect.width / 2,
            width: rect.width
          })
        }
      }
    }, [])

    // Calculate distance from mouse to this nav item
    const distance = Math.abs(mouseX - position.x)
    const maxDistance = 120
    const scale = distance < maxDistance 
      ? 1 + (1 - distance / maxDistance) * 0.25
      : 1

    return (
      <motion.button
        ref={ref}
        onClick={() => {
          if (item === 'Register') {
            router.push('/registration')
          } else if (item === 'About' || item === 'Speakers' || item === 'Team' || item === 'Contact') {
            router.push(`/${item.toLowerCase()}`)
          } else if (item === 'Events') {
            router.push('/event')
          } else {
            handleNavigation(item)
          }
        }}
        style={{
          color: 'rgba(255, 255, 255, 0.95)',
          fontSize: '1rem',
          fontWeight: '500',
          letterSpacing: '0.2px',
          textTransform: 'capitalize',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.4rem 0.8rem',
          position: 'relative',
          transition: 'color 0.2s ease',
          transformOrigin: 'center',
          whiteSpace: 'nowrap',
        }}
        animate={{ 
          scale: scale,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30 
        }}
        whileHover={{ 
          color: '#EB0028',
        }}
      >
        {item}
      </motion.button>
    )
  }

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '1.25rem 2rem',
        pointerEvents: 'none',
        boxSizing: 'border-box',
        width: '100%',
        overflowX: 'hidden',
      }} className="navbar-outer-container">
        <motion.nav
          ref={navRef}
          style={{
            background: 'rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '0.8rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '3rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
            pointerEvents: 'auto',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ y: -100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glass reflection on top */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            zIndex: 1,
          }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', zIndex: 1001, flexShrink: 0 }}>
            <motion.div 
              className="navbar-logo"
              style={{ 
                fontSize: '1.4rem', 
                fontWeight: '800', 
                cursor: 'pointer',
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'center',
              }}
              whileHover={{ 
                scale: 1.03,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span style={{ color: '#EB0028' }}>TEDx</span>
              <span style={{ 
                color: '#ffffff',
              }}>JUET</span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            alignItems: 'center'
          }} className="desktop-nav">
            {navItems.map((item) => (
              <MagnifyNavItem key={item} item={item} mouseX={mouseX} />
            ))}
          </div>

          {/* Hamburger Button */}
          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              zIndex: 10002,
              position: 'relative',
              width: '32px',
              height: '24px',
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: '#ffffff',
              borderRadius: '2px',
              position: 'absolute',
              top: mobileMenuOpen ? '50%' : '20%',
              left: 0,
              transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: mobileMenuOpen ? '0 0 10px rgba(235, 0, 40, 0.6)' : 'none',
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: '#ffffff',
              borderRadius: '2px',
              position: 'absolute',
              top: '50%',
              left: 0,
              opacity: mobileMenuOpen ? 0 : 1,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: '#ffffff',
              borderRadius: '2px',
              position: 'absolute',
              top: mobileMenuOpen ? '50%' : '80%',
              left: 0,
              transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: mobileMenuOpen ? '0 0 10px rgba(235, 0, 40, 0.6)' : 'none',
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
          </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu - Slide from Right */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                zIndex: 9998,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '85%',
                maxWidth: '400px',
                height: '100vh',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem 1.5rem',
                overflowY: 'auto',
                boxShadow: '-10px 0 50px rgba(235, 0, 40, 0.3)',
                borderLeft: '1px solid rgba(235, 0, 40, 0.2)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 200
              }}
            >
              {/* Header with Close Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '3rem',
              }}>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease',
                  }}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1, color: '#EB0028' }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>

                {/* Logo in Menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '800',
                  }}
                >
                  <span style={{ color: '#EB0028' }}>TEDx</span>
                  <span style={{ color: '#ffffff' }}>JUET</span>
                </motion.div>
              </div>

              {/* Navigation Items */}
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                flex: 1,
              }}>
                {navItems.map((item, i) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      if (item === 'Register') {
                        router.push('/registration')
                        setMobileMenuOpen(false)
                      } else if (item === 'About' || item === 'Speakers' || item === 'Team' || item === 'Contact') {
                        router.push(`/${item.toLowerCase()}`)
                        setMobileMenuOpen(false)
                      } else if (item === 'Events') {
                        router.push('/event')
                        setMobileMenuOpen(false)
                      } else {
                        handleNavigation(item)
                      }
                    }}
                    style={{
                      color: '#ffffff',
                      fontSize: '1.5rem',
                      fontWeight: '400',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '1rem 0',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      textTransform: 'capitalize',
                      letterSpacing: '0.5px',
                    }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.1 + (i * 0.05),
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ 
                      x: 10,
                      color: '#EB0028',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item}
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: '0.5rem',
                        height: '2px',
                        background: '#EB0028',
                        width: '0%',
                      }}
                      whileHover={{ width: '30px' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </nav>

              {/* Decorative Geometric Shapes - Top */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: '10%',
                width: '45%',
                height: '200px',
                overflow: 'hidden',
                opacity: 0.25,
                pointerEvents: 'none',
              }}>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '60%',
                    background: 'linear-gradient(135deg, rgba(235, 0, 40, 0.8) 0%, rgba(139, 0, 0, 0.6) 100%)',
                    borderRadius: '20px 0 0 20px',
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '80%',
                    height: '40%',
                    background: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) 5px, transparent 5px, transparent 10px)',
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '90%',
                    height: '35%',
                    background: 'rgba(235, 0, 40, 0.3)',
                    borderRadius: '20px 0 0 0',
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                />
              </div>

              {/* Decorative Geometric Shapes - Bottom */}
              <div style={{
                position: 'absolute',
                right: 0,
                bottom: '20%',
                width: '45%',
                height: '150px',
                overflow: 'hidden',
                opacity: 0.25,
                pointerEvents: 'none',
              }}>
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    height: '70%',
                    background: 'linear-gradient(225deg, rgba(139, 0, 0, 0.6) 0%, rgba(235, 0, 40, 0.8) 100%)',
                    borderRadius: '20px 0 0 0',
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '20px',
                    width: '60%',
                    height: '30%',
                    background: 'repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) 5px, transparent 5px, transparent 10px)',
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                />
              </div>

              {/* Subtle Grid Background */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(235, 0, 40, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(235, 0, 40, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                opacity: 0.3,
                pointerEvents: 'none',
                zIndex: -1,
              }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(235, 0, 40, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(235, 0, 40, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 500,
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              boxShadow: '0 8px 32px rgba(235, 0, 40, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ 
              scale: 1.15,
              background: 'rgba(235, 0, 40, 0.4)',
              boxShadow: '0 8px 32px rgba(235, 0, 40, 0.6)',
            }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        html, body {
          max-width: 100vw !important;
          overflow-x: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        @media (max-width: 968px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }
        
        @media (max-width: 768px) {
          html, body {
            width: 100% !important;
          }
          
          .navbar-outer-container {
            padding: 0.5rem 0.4rem !important;
            justify-content: center !important;
            overflow: visible !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
          
          nav {
            padding: 0.4rem 0.8rem !important;
            max-width: calc(100% - 0.8rem) !important;
            width: calc(100% - 0.8rem) !important;
            gap: 0 !important;
            border-radius: 16px !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
          }
          
          nav > div {
            overflow: visible !important;
          }
          
          nav > div > div {
            width: 100% !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            gap: 0.4rem !important;
          }
          
          nav > div > div a {
            flex-shrink: 0 !important;
          }
          
          .navbar-logo {
            font-size: 1.4rem !important;
          }
          
          .hamburger {
            flex-shrink: 0 !important;
            width: 28px !important;
            height: 20px !important;
            padding: 0.3rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .navbar-outer-container {
            padding: 0.4rem 0.3rem !important;
          }
          
          nav {
            padding: 0.35rem 0.6rem !important;
            border-radius: 12px !important;
            max-width: calc(100% - 0.6rem) !important;
            width: calc(100% - 0.6rem) !important;
          }
          
          .navbar-logo {
            font-size: 1.25rem !important;
          }
          
          .hamburger {
            width: 26px !important;
            height: 18px !important;
          }
        }
      `}</style>
    </>
  )
}