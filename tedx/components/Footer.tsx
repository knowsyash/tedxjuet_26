'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const socials = [
    { name: 'Instagram', href: 'https://www.instagram.com/tedxjuet/', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )},
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/tedxjuet/posts/?feedView=all', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )},
  ]

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
      borderTop: '1px solid rgba(235, 0, 40, 0.2)',
      padding: '3rem 2rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}>
        {/* Brand and Description */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              letterSpacing: '-0.5px',
            }}
          >
            <span style={{ color: '#EB0028' }}>TEDx</span>
            <span style={{ color: '#ffffff' }}>JUET</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              maxWidth: '600px',
            }}
          >
            In the spirit of 'Ideas Worth Spreading', TED has created TEDx, which is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDxJUET where x = independently organized TED event.
          </motion.p>
        </div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              whileHover={{ scale: 1.1, y: -3 }}
              aria-label={social.name}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1.5rem',
            marginTop: '1rem',
          }}
        >
          <p style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.875rem',
            textAlign: 'center',
          }}>
            © 2026 All rights reserved. • Made by TED<sup>x</sup>JUET
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
