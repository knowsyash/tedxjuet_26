'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './Talks.module.css'

const talks = [
  { 
    id: 1, 
    title: 'Save Me', 
    speaker: 'KĒVENS', 
    image: '/img/talk1.JPG',
    large: true 
  },
  { 
    id: 2, 
    title: "The cost of ignoring women's health", 
    speaker: 'SHEENA FRANKLIN', 
    image: '/img/talk2.JPG'
  },
  { 
    id: 3, 
    title: 'AI, the Brain, and Our Future', 
    speaker: 'DR. BEREN MILLIDGE', 
    image: '/img/talk3.JPG'
  },
  { 
    id: 4, 
    title: 'How functional precision medicine could be the future of cancer care', 
    speaker: 'DR. DIANA AZZAM', 
    image: '/img/talk4.JPG'
  },
  { 
    id: 5, 
    title: 'Breaking Down Barriers for Children with ADHD', 
    speaker: 'DR. KATIE HART', 
    image: '/img/talk5.JPG'
  },
]

export default function Talks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className={styles.section} id="talks">
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ted x JUET 
          </motion.h2>
        </div>

        <div className={styles.grid}>
          {talks.map((talk, index) => (
            <motion.div
              key={talk.id}
              className={`${styles.card} ${talk.large ? styles.cardLarge : ''}`}
              initial={{ opacity: 0, y: 50 ,}}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={talk.image} 
                  alt={talk.title}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  {/* <h3 className={styles.overlayTitle}>{talk.title}</h3> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
