import type { ComponentType } from "react"

export type IconComponent = ComponentType<{ className?: string }>

export type NavItem = {
  title: string
  href: string
}

export type LegacyProject = {
  title: string
  description: string
  tags: string[]
  image?: string
  githubLink?: string
  liveLink?: string
  featured: boolean
}

export type SocialLink = {
  name: IconComponent
  url: string
  label: string
}

export type langtype = {
  leetcode_username: string
  navItems: NavItem[]
  hero: {
    name: string
    image: string
    intro?: string
    title: string
    company?: string
    companyLink?: string
    description: string
  }
  homeSection: Record<string, string>
  aboutSection: Record<string, string>
  achievements: Array<{
    title: string
    description: string
    Icon: IconComponent
  }>
  projectsPage: {
    title: string
    subtitle: string
    description: string
    filters: Record<string, string>
  }
  projects: LegacyProject[]
  about: {
    hero: {
      title: string
      image: string
      subtitle: string
      description: string
      skills: string[]
    }
    techSkills: Array<{
      name: string
      level: number
      icon: IconComponent
    }>
    experiences: Array<{
      title: string
      company: string
      period: string
      description: string
    }>
    stats: {
      statItems: Array<{ label: string; value: string }>
      leetcodeRating: string
    }
  }
  contact: {
    thoughtTitle: string
    thoughtText: string
    imageUrl: string
    imageAlt: string
    socials: {
      title: string
      links: SocialLink[]
    }
    form: {
      title: string
      name: { label: string; placeholder: string }
      email: { label: string; placeholder: string }
      subject: { label: string; placeholder: string }
      message: { label: string; placeholder: string }
      submit: string
      success: string
      error: string
    }
  }
  offline: Record<string, string>
  chat: Record<string, string>
}
