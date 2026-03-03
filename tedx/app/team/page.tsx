'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'

// Team member data structure
const teamMembers = [
  // Organization
  {
    id: 1,
    name: "Pria Jha",
    role: "Organizer",
    department: "Organization",
    bio: "Leading the TEDxJUET event with passion and dedication",
    image: "/team/member1.jpg"
  },
  {
    id: 2,
    name: "Yash Parsal",
    role: "Co Organizer",
    department: "Organization",
    bio: "Supporting event coordination and execution",
    image: "/team/member2.jpg"
  },
  // Development Team (Priority)
  {
    id: 3,
    name: "Yash Singhal",
    role: "Development Head | Co Head Marketing",
    department: "Development | Marketing",
    bio: "Leading web development and supporting marketing strategies",
    image: "/team/member3.jpg"
  },
  {
    id: 4,
    name: "Shreyansh Tripathi",
    role: "Co Head Development | Co Head Logistics",
    department: "Development | Logistics",
    bio: "Co-leading technical development and logistics operations",
    image: "/team/member4.jpg"
  },
  // Design Team
  {
    id: 5,
    name: "Ajitesh Awasthi",
    role: "Head Designing",
    department: "Design",
    bio: "Creating stunning visual experiences for TEDxJUET",
    image: "/team/member5.jpg"
  },
  {
    id: 6,
    name: "Ashish Chhabra",
    role: "Co Head Designing",
    department: "Design",
    bio: "Crafting creative designs and graphics",
    image: "/team/member6.jpg"
  },
  {
    id: 7,
    name: "Mihika Jain",
    role: "Co Head Designing",
    department: "Design",
    bio: "Bringing visual concepts to life",
    image: "/team/member7.jpg"
  },
  {
    id: 8,
    name: "Kush Sharma",
    role: "Co Head Designing",
    department: "Design",
    bio: "Ensuring design excellence across all touchpoints",
    image: "/team/member8.jpg"
  },
  // Logistics Team
  {
    id: 9,
    name: "Ritesh Mehta",
    role: "Head Logistics",
    department: "Logistics",
    bio: "Managing event operations and logistics seamlessly",
    image: "/team/member9.jpg"
  },
  {
    id: 10,
    name: "Yash Pathak",
    role: "Co Head Logistics",
    department: "Logistics",
    bio: "Coordinating venue and operational requirements",
    image: "/team/member10.jpg"
  },
  {
    id: 11,
    name: "Tanya Rathore",
    role: "Co Head Logistics",
    department: "Logistics",
    bio: "Ensuring smooth event execution",
    image: "/team/member11.jpg"
  },
  // Marketing Team
  {
    id: 12,
    name: "Siddhi Jain",
    role: "Head Marketing",
    department: "Marketing",
    bio: "Driving marketing strategies and campaigns",
    image: "/team/member12.jpg"
  },
  // Sponsorship Team
  {
    id: 13,
    name: "Shreyansh Mishra",
    role: "Head Sponsorship",
    department: "Sponsorship",
    bio: "Building partnerships and securing sponsorships",
    image: "/team/member13.jpg"
  },
  {
    id: 14,
    name: "Shivdev Shukla",
    role: "Co Head Sponsorship",
    department: "Sponsorship",
    bio: "Managing sponsor relationships and collaborations",
    image: "/team/member14.jpg"
  },
  // Hospitality Team
  {
    id: 15,
    name: "Sejal Dubey",
    role: "Head Hospitality",
    department: "Hospitality",
    bio: "Ensuring exceptional guest experiences",
    image: "/team/member15.jpg"
  },
  {
    id: 16,
    name: "Vedika Shivhare",
    role: "Co Head Hospitality",
    department: "Hospitality",
    bio: "Managing attendee comfort and satisfaction",
    image: "/team/member16.jpg"
  },
  {
    id: 17,
    name: "Puru Asthana",
    role: "Co Head Hospitality",
    department: "Hospitality",
    bio: "Coordinating hospitality services",
    image: "/team/member17.jpg"
  },
  // Curation Team
  {
    id: 18,
    name: "Unnati Mishra",
    role: "Head Curation",
    department: "Curation",
    bio: "Curating impactful content and speaker lineup",
    image: "/team/member18.jpg"
  },
  {
    id: 19,
    name: "Naitik Chitransh",
    role: "Co Head Curation",
    department: "Curation",
    bio: "Managing content strategy and speaker selection",
    image: "/team/member19.jpg"
  },
  {
    id: 20,
    name: "Pushkar Dubey",
    role: "Co Head Curation",
    department: "Curation",
    bio: "Ensuring quality content and engaging talks",
    image: "/team/member20.jpg"
  }
]

const departments = [
  "Organization",
  "Design",
  "Logistics",
  "Marketing",
  "Sponsorship",
  "Hospitality",
  "Curation",
  "Development"
]

export default function TeamPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  // Filter and sort members with exception for Marketing tab
  const filteredMembers = selectedDepartment
    ? teamMembers
        .filter(m => m.department.includes(selectedDepartment))
        .sort((a, b) => {
          // Exception: For Marketing and Logistics tabs, prioritize members with single department
          if (selectedDepartment === 'Marketing' || selectedDepartment === 'Logistics') {
            const aIsPrimary = a.department === selectedDepartment
            const bIsPrimary = b.department === selectedDepartment
            
            if (aIsPrimary && !bIsPrimary) return -1
            if (!aIsPrimary && bIsPrimary) return 1
          }
          
          // For all other cases, maintain original order by id
          return a.id - b.id
        })
    : teamMembers

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>Our Team</h1>
            <p className={styles.heroSubtitle}>
              Meet the passionate individuals driving TEDxJUET 2025 forward with dedication and innovation
            </p>
          </motion.div>
        </section>

        {/* Department Filter */}
        <section className={styles.filterSection}>
          <motion.div
            className={styles.departmentFilters}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              className={`${styles.departmentButton} ${!selectedDepartment ? styles.active : ''}`}
              onClick={() => setSelectedDepartment(null)}
            >
              All Members
            </button>
            {departments.map((department, index) => (
              <motion.button
                key={department}
                className={`${styles.departmentButton} ${selectedDepartment === department ? styles.active : ''}`}
                onClick={() => setSelectedDepartment(department)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {department}
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Team Members Grid */}
        <section className={styles.membersSection}>
          <div className={styles.membersGrid}>
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className={styles.memberCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className={styles.imageContainer}>
                  <div className={styles.imagePlaceholder}>
                    <div className={styles.placeholderIcon}>
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredMember === member.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.overlayContent}>
                      <div className={styles.roleTag}>
                        <span className={styles.tag}>{member.role}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className={styles.memberInfo}>
                  <span className={styles.department}>{member.department}</span>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}
