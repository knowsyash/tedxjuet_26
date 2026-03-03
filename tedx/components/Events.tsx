'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './Events.module.css'

// SEO-optimized event data with structured information
const eventsData = [
  {
    id: 1,
    year: '2026',
    theme: 'Untethered',
    organization: 'Ted x JUET Events',
    description: 'Breaking free from constraints and exploring limitless possibilities in innovation, technology, and human potential.',
    date: 'April 2026',
    status: 'upcoming',
    slug: '2026-untethered',
    link: null
  },
  {
    id: 2,
    year: '2025',
    theme: 'Resonance',
    organization: 'Ted x JUET Events',
    description: 'Exploring the ripple effects of ideas that create harmony and lasting impact across communities.',
    date: 'March 2025',
    status: 'past',
    slug: '2025-resonance',
    link: 'https://www.ted.com/tedx/events/62368'
  },
  {
    id: 3,
    year: '2023',
    theme: 'Equilibrium',
    organization: 'Ted x JUET Events',
    description: 'Finding balance in a world of rapid change, innovation, and transformation.',
    date: 'November 2023',
    status: 'past',
    slug: '2023-equilibrium',
    link: 'https://www.ted.com/tedx/events/52449'
  },
  {
    id: 4,
    year: '2019',
    theme: 'Beyond The Horizon',
    organization: 'Ted x JUET Events',
    description: 'Venturing into uncharted territories of knowledge, creativity, and human achievement.',
    date: 'October 2019',
    status: 'past',
    slug: '2019-beyond-the-horizon',
    link: 'https://www.ted.com/tedx/events/31363'
  },
  {
    id: 5,
    year: '2018',
    theme: 'Multifariousness',
    organization: 'Ted x JUET Events',
    description: 'Celebrating diversity, variety, and the multitude of perspectives that shape our world.',
    date: 'September 2018',
    status: 'past',
    slug: '2018-multifariousness',
    link: 'https://www.ted.com/tedx/events/26452'
  }
]

export default function Events() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section 
      ref={ref} 
      id="events" 
      className={styles.eventsSection}
      aria-label="TEDx JUET Events Timeline"
    >
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventSeries",
            "name": "TEDx JUET Events",
            "organizer": {
              "@type": "Organization",
              "name": "TEDx JUET",
              "url": "https://tedxjuet.com"
            },
            "events": eventsData.map(event => ({
              "@type": "Event",
              "name": `TEDx JUET ${event.year}: ${event.theme}`,
              "description": event.description,
              "startDate": event.date,
              "eventStatus": event.status === 'upcoming' ? "https://schema.org/EventScheduled" : "https://schema.org/EventCompleted",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "JUET Campus"
              }
            }))
          })
        }}
      />

      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={styles.title}
          >
            Events
          </motion.h2>
          {/* <motion.a
            href="#events"
            className={styles.viewDetails}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            aria-label="View all event details"
          >
            View Event Details
          </motion.a> */}
        </header>

        {/* Events Grid */}
        <div className={styles.eventsGrid}>
          {eventsData.map((event, index) => {
            const CardWrapper = event.link ? motion.a : motion.article
            const cardProps = event.link 
              ? { href: event.link, target: "_blank", rel: "noopener noreferrer" }
              : {}

            return (
              <CardWrapper
                key={event.id}
                className={`${styles.eventCard} ${event.status === 'upcoming' ? styles.upcomingEvent : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                itemScope
                itemType="https://schema.org/Event"
                style={{ textDecoration: 'none', color: 'inherit' }}
                {...cardProps}
              >
                {/* Event Content */}
                <div className={styles.eventContent}>
                  <h3 className={styles.eventYear} itemProp="name">
                    {event.year} (Theme - {event.theme})
                  </h3>
                  <p className={styles.eventOrg} itemProp="organizer">
                    {event.organization}
                  </p>
                  <meta itemProp="description" content={event.description} />
                  <meta itemProp="startDate" content={event.date} />
                  {event.link && <meta itemProp="url" content={event.link} />}
                </div>
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
