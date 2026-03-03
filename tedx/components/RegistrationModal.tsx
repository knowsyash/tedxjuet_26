'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './RegistrationModal.module.css'

interface FormData {
  name: string
  email: string
  enrollmentNumber: string
  year: string
  motivation: string
  ticketType: string
}

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    enrollmentNumber: '',
    year: '',
    motivation: '',
    ticketType: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Prevent page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
    if (!formData.name || !formData.email || !formData.enrollmentNumber || !formData.year || !formData.motivation || !formData.ticketType) {
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
        motivation: '',
        ticketType: ''
      })

      // Reset after 3 seconds and close modal
      setTimeout(() => {
        setSubmitted(false)
        onClose()
      }, 3000)
    } catch (err) {
      setError('Failed to submit registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />
          
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.modalHeader}>
              <h2>Register for TEDxJUET</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalContent}>
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
                      <option value="other">Other</option>
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
                      rows={3}
                      required
                    ></textarea>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="ticketType" className={styles.label}>Ticket Type *</label>
                    <select
                      id="ticketType"
                      name="ticketType"
                      value={formData.ticketType}
                      onChange={handleChange}
                      className={styles.select}
                      required
                    >
                      <option value="">Select a ticket type</option>
                      <option value="general">General Admission</option>
                      <option value="student">Student Pass</option>
                      <option value="vip">VIP Pass</option>
                      <option value="group">Group Pass (10+ people)</option>
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
