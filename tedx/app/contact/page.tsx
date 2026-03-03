'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function ContactPage() {
  const [cursorHidden, setCursorHidden] = useState(false)

  const contacts = [
    { name: 'Shreyansh Mishra', phone: '+91 83198 70227' },
    { name: 'Yash Parasai', phone: '+91 62637 59534' },
    { name: 'Pria Jha', phone: '+91 96103 73967' },
    { name: 'Email', phone: 'tedx@juetguna.in', isEmail: true }
  ]

  const handleSocialMouseEnter = () => {
    setCursorHidden(true)
  }

  const handleSocialMouseLeave = () => {
    setCursorHidden(false)
  }

  return (
    <main>
      <Navbar />
      <section className={`${styles.section} ${cursorHidden ? styles.cursorHidden : ''}`}>
        <div className={styles.container}>
          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.getInTouchRed}>Get In Touch</span>
          </motion.h1>

          <motion.div
            className={styles.descriptionTile}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className={styles.descriptionText}>
              Ready to be part of <span className={styles.highlightText}>"Untethered"</span>? Whether you're interested in sponsorship opportunities, speaking at our event, media partnerships, or have general inquiries, we're here to help you join our journey of transformative ideas and inspiring conversations.
            </p>
          </motion.div>

          <div className={styles.mainContent}>
            {/* Contact and Social Section */}
            <motion.div
              className={styles.eventDetailsSection}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.contactSection}>
                <h3 className={styles.contactHeading}>Contact Us</h3>
                <div className={styles.contactsList}>
                  {contacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      className={styles.contactItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    >
                      <div className={styles.contactName}>{contact.name}</div>
                      {contact.isEmail ? (
                        <a href={`mailto:${contact.phone}`} className={styles.contactPhone}>
                          {contact.phone}
                        </a>
                      ) : (
                        <a href={`tel:${contact.phone}`} className={styles.contactPhone}>
                          {contact.phone}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={styles.followUsSection}>
                <h3 className={styles.followUsHeading}>Follow Us</h3>
                <div className={styles.socialLinksContainer}>
                  <motion.a
                    href="https://www.instagram.com/tedxjuet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    onMouseEnter={handleSocialMouseEnter}
                    onMouseLeave={handleSocialMouseLeave}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                    Instagram
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/company/tedxjuet/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    onMouseEnter={handleSocialMouseEnter}
                    onMouseLeave={handleSocialMouseLeave}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.348c.429-.646 1.196-1.587 2.905-1.587 2.121 0 3.71 1.328 3.71 4.182v5.703zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.921-1.715 1.157 0 1.92.759 1.92 1.715 0 .953-.763 1.715-1.926 1.715zm1.581 11.597H3.715V9.505h3.203v10.947zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Find Us Here Section */}
            <motion.div
              className={styles.findUsSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className={styles.sectionHeading}>Find Us Here</h2>
              
              <motion.div
                className={styles.locationTile}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className={styles.mapContainer}>
  <iframe
    src="https://www.google.com/maps?q=Jaypee%20University%20of%20Engineering%20and%20Technology%20Guna&output=embed"
    width="100%"
    height="250"
    style={{ border: 0, borderRadius: "12px" }}
    loading="lazy"
    title="JUET Location"
  />
</div>

                <div className={styles.locationItem}>
                  <h4 className={styles.locationLabel}>Exact Coordinate</h4>
                  <p className={styles.locationText}>24.4369° N, 77.1583° E</p>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.locationItem}>
                  <h4 className={styles.locationLabel}>Address</h4>
                  <p className={styles.locationText}>
                    Jaypee University of Engineering and Technology<br />
                    Guna, Madhya Pradesh 473226<br />
                    India
                  </p>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.locationItem}>
                  <h4 className={styles.locationLabel}>Getting Here</h4>
                  <p className={styles.locationText}>
                    From Guna Railway Station: ~30 km (Approx 30 mins)<br />
                    
                    Well connected by road via NH-44. Easily accessible by public transport and private vehicles. Ample parking available on campus.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
