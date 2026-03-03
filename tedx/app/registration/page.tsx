'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

interface FormData {
  name: string
  email: string
  enrollmentNumber: string
  year: string
}

export default function RegistrationPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    enrollmentNumber: '',
    year: ''
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
    if (!formData.name || !formData.email || !formData.enrollmentNumber || !formData.year) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    // Email domain validation
    if (!formData.email.toLowerCase().endsWith('@juetguna.in')) {
      setError('Only @juetguna.in email addresses are allowed')
      setLoading(false)
      return
    }

    try {
      // Submit to Google Sheets via API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        enrollmentNumber: '',
        year: ''
      })

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit registration. Please try again.')
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
                <Calendar className={styles.icon} size={18} />
                <span>April 11, 2026</span>
              </div>
              <div className={styles.divider}>|</div>
              <div className={styles.detailItem}>
                <MapPin className={styles.icon} size={18} />
                <span>JUET's MultiPurpose Hall</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Registration Form Section */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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
                <h3>Thank You for Submitting!</h3>
                <p>We look forward to seeing you at TEDxJUET.</p>
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
                  <label htmlFor="email" className={styles.label}>Email (JUET GSuite Only) *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="enrollmentnumber@juetguna.in"
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
                    <option value="other">Other</option>
                  </select>
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
        </div>
      </section>
      <Footer />
    </main>
  )
}
