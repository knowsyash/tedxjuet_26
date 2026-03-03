'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

interface FormData {
  name: string
  email: string
  enrollmentNumber: string
  year: string
  motivation: string
}

export default function RegistrationPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    enrollmentNumber: '',
    year: '',
    motivation: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic validation
    if (!formData.name || !formData.email || !formData.enrollmentNumber || !formData.year || !formData.motivation) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        enrollmentNumber: '',
        year: '',
        motivation: ''
      })

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError('Failed to submit registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Navbar />
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Header Section */}
          <motion.div
            className={styles.headerSection}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.logoSection}>
              <motion.div 
                className={styles.logo}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className={styles.logoRed}>TEDx</span>
                <span className={styles.logoWhite}>JUET</span>
              </motion.div>
            </div>

            <motion.div
              className={styles.themeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className={styles.theme}>Untethered</h1>
              <p className={styles.tagline}>Without Limits</p>
            </motion.div>

            <motion.div
              className={styles.eventDetails}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={styles.detailItem}>
                <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>April 11, 2026</span>
              </div>
              <div className={styles.divider}>|</div>
              <div className={styles.detailItem}>
                <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>JUET's MultiPurpose Hall</span>
              </div>
            </motion.div>
          </motion.div>

          {/* About Section */}
          <motion.div
            className={styles.aboutSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className={styles.aboutTitle}>About TEDxJUET</h2>
            <p className={styles.aboutText}>
              TEDxJUET brings the spirit of TED to our campus community. We believe in the power of ideas to change the world. 
              Our event brings together brilliant minds from diverse fields to share transformative ideas and inspire meaningful 
              conversations about the future. Join us for an evening of inspiring talks, networking, and groundbreaking conversations.
            </p>
          </motion.div>

          {/* Registration Form Section */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className={styles.formTitle}>Register for the Event</h2>
            
            {submitted ? (
              <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.successIcon}>✓</div>
                <h3>Registration Successful!</h3>
                <p>Thank you for registering for TEDxJUET. We're excited to see you at the event!</p>
                <p className={styles.confirmationText}>A confirmation email has been sent to {formData.email}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {error && (
                  <motion.div
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="enrollmentNumber" className={styles.label}>Enrollment Number *</label>
                  <input
                    type="text"
                    id="enrollmentNumber"
                    name="enrollmentNumber"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
                    placeholder="Enter your enrollment number"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="year" className={styles.label}>Year *</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={styles.select}
                    required
                  >
                    <option value="">Select your year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    {/* <option value="other">Other</option> */}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="motivation" className={styles.label}>Why do you want to attend? (Brief) *</label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Tell us what excites you about this event..."
                    className={styles.textarea}
                    rows={4}
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Registering...' : 'Register Now'}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Footer Notice */}
          <motion.div
            className={styles.footerNotice}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p>
              This independent TEDx event is operated under license from TED.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
