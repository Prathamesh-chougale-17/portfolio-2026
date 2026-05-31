import { en } from "@/data/en"

export const navItems = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
]

export const profile = {
  name: en.hero.name,
  role: "Backend-first full-stack and blockchain developer",
  company: en.hero.company,
  companyLink: en.hero.companyLink,
  tagline: "Backend systems. Blockchain protocols. Frontend galaxies.",
  alternativeHeroLine:
    "I build invisible systems that power visible experiences.",
  heroCopy:
    "I build backend systems that behave like spacecraft: stable under pressure, observable in motion, and designed for unknown worlds.",
  secondaryCopy:
    "I am a full-stack and blockchain developer with a backend-first mindset. This portfolio is my mission control - a cinematic archive of systems, experiments, protocols, and ideas built at the edge of imagination.",
  leetcodeUsername: en.leetcode_username,
  stats: [
    { label: "Hackathon wins", value: "5+" },
    { label: "LeetCode rating", value: en.about.stats.leetcodeRating },
    { label: "Problems solved", value: "250+" },
    { label: "Open-source orbit", value: "12k+ repo" },
  ],
  socials: en.contact.socials.links.map((link) => ({
    label: link.label,
    url: link.url,
  })),
}

export const initSequence = [
  "INITIALIZING EVENT HORIZON OS...",
  "BACKEND CORE: ONLINE",
  "BLOCKCHAIN NODE: SYNCHRONIZED",
  "FRONTEND INTERFACE: RENDERED",
  "MISSION STATUS: READY",
]

export const skills = [
  "Node.js",
  "NestJS",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "Prisma",
  "GraphQL",
  "REST APIs",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Solidity",
  "Ethereum",
  "viem",
  "wagmi",
  "Web3",
  "CI/CD",
  "System Design",
]

export const achievements = en.achievements

export const backendFlow = [
  "Client Request",
  "API Gateway",
  "Authentication",
  "Rate Limiter",
  "Controller",
  "Service Layer",
  "Queue",
  "Database",
  "Blockchain Indexer",
  "Response",
]

export const projectFilters = [
  "All",
  "Backend",
  "Blockchain",
  "Frontend",
  "Full-stack",
  "Experimental",
] as const

export type ProjectFilter = (typeof projectFilters)[number]

export type MissionProject = {
  slug: string
  missionName: string
  type: string
  category: Exclude<ProjectFilter, "All">
  categories: Exclude<ProjectFilter, "All">[]
  stack: string[]
  description: string
  problem: string
  role: string
  architecture: string
  backendDecisions: string[]
  blockchainLogic: string
  frontendExperience: string
  databaseDesign: string
  securityNotes: string
  performanceNotes: string
  lessonsLearned: string
  githubLink?: string
  liveLink?: string
  featured: boolean
  signal: string
  coordinates: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function classify(tags: string[], title: string): MissionProject["categories"] {
  const joined = `${title} ${tags.join(" ")}`.toLowerCase()
  const categories = new Set<MissionProject["category"]>()

  if (
    /(blockchain|solana|avalanche|algorand|erc|web3|ethereum|smart contract)/.test(
      joined
    )
  ) {
    categories.add("Blockchain")
  }

  if (
    /(go|node|express|mongodb|postgres|auth|clerk|redis|api|backend)/.test(
      joined
    )
  ) {
    categories.add("Backend")
  }

  if (
    /(next|react|tailwind|typescript|sanity|recharts|frontend)/.test(joined)
  ) {
    categories.add("Frontend")
  }

  if (categories.has("Backend") && categories.has("Frontend")) {
    categories.add("Full-stack")
  }

  if (/(ai|iot|game|template|yolo|experimental|multiplayer)/.test(joined)) {
    categories.add("Experimental")
  }

  if (!categories.size) {
    categories.add("Full-stack")
  }

  return [...categories]
}

function projectType(categories: MissionProject["categories"]) {
  if (categories.includes("Blockchain")) return "Blockchain Protocol Mission"
  if (categories.includes("Backend")) return "Backend Infrastructure Mission"
  if (categories.includes("Experimental")) return "Experimental Systems Mission"
  if (categories.includes("Frontend")) return "Frontend Interface Mission"
  return "Full-stack Star System"
}

export const projects: MissionProject[] = en.projects.map((project, index) => {
  const categories = classify(project.tags, project.title)
  const category = categories.includes("Full-stack")
    ? "Full-stack"
    : categories[0]
  const stack = project.tags
  const slug = slugify(project.title)

  return {
    slug,
    missionName: project.title,
    type: projectType(categories),
    category,
    categories,
    stack,
    description: project.description,
    problem: `Design and ship ${project.title} as a reliable product system with clear user flows, durable data boundaries, and a deployable architecture.`,
    role: "Product engineer, system designer, full-stack implementer, and deployment owner.",
    architecture: `${project.title} is modeled as a layered mission: interface orbit, application services, data persistence, observability hooks, and release pipeline.`,
    backendDecisions: [
      "Keep validation close to the API boundary before data reaches business logic.",
      "Separate user-facing workflows from persistence and integration concerns.",
      "Favor predictable status models so the UI can report system state clearly.",
    ],
    blockchainLogic: categories.includes("Blockchain")
      ? "Wallet, transaction, token, or chain-specific logic is treated as infrastructure, with the interface reflecting confirmation and failure states."
      : "No chain dependency is required for this mission, but the architecture leaves room for verifiable events and audit trails.",
    frontendExperience:
      "The interface focuses on fast scanning, confident action, and visual feedback that explains what the system is doing.",
    databaseDesign:
      "The data model favors explicit ownership, stable identifiers, and records that can support analytics, audit, and future integrations.",
    securityNotes:
      "The mission emphasizes authenticated access, least-privilege paths, guarded inputs, and clear failure messages.",
    performanceNotes:
      "The first load is kept lean, heavy experiences are isolated, and repeated views are designed for cache-friendly data access.",
    lessonsLearned:
      "A polished product is strongest when backend state, interface feedback, and deployment constraints are designed together.",
    githubLink: project.githubLink,
    liveLink: project.liveLink,
    featured: project.featured,
    signal: `EH-${String(index + 1).padStart(3, "0")}`,
    coordinates: `${(19 + index * 7) % 89}.${(42 + index * 13) % 97} / ${
      (71 + index * 11) % 99
    }.${(8 + index * 5) % 89}`,
  }
})

export const featuredProjects = projects
  .filter((project) => project.featured)
  .slice(0, 6)

export type ResearchLog = {
  slug: string
  number: string
  title: string
  category: string
  date: string
  readingTime: string
  tags: string[]
  excerpt: string
}

export const researchLogs: ResearchLog[] = [
  {
    slug: "designing-apis-like-spacecraft-systems",
    number: "LOG 001",
    title: "Designing APIs Like Spacecraft Systems",
    category: "Backend Architecture",
    date: "2026-01-12",
    readingTime: "6 min read",
    tags: ["API Design", "Reliability", "Observability"],
    excerpt:
      "A backend-first note on stable interfaces, telemetry, failure isolation, and why APIs should behave like mission-critical systems.",
  },
  {
    slug: "why-backend-developers-should-care-about-cinematic-ux",
    number: "LOG 002",
    title: "Why Backend Developers Should Care About Cinematic UX",
    category: "Developer Philosophy",
    date: "2026-01-18",
    readingTime: "5 min read",
    tags: ["UX", "Systems", "Frontend"],
    excerpt:
      "Cinematic UX is not decoration. It can expose state, pace cognition, and make invisible backend work legible.",
  },
  {
    slug: "building-a-blockchain-indexer-from-scratch",
    number: "LOG 003",
    title: "Building a Blockchain Indexer from Scratch",
    category: "Blockchain Engineering",
    date: "2026-01-24",
    readingTime: "8 min read",
    tags: ["Blockchain", "Indexers", "Queues"],
    excerpt:
      "How to think about chain events, replay safety, idempotency, storage, and realtime status for blockchain systems.",
  },
  {
    slug: "postgresql-queues-and-event-driven-systems",
    number: "LOG 004",
    title: "PostgreSQL, Queues, and Event-Driven Systems",
    category: "System Design",
    date: "2026-02-02",
    readingTime: "7 min read",
    tags: ["PostgreSQL", "Queues", "Events"],
    excerpt:
      "A practical mental model for turning product actions into durable events without making the system harder to reason about.",
  },
  {
    slug: "how-i-built-event-horizon-os",
    number: "LOG 005",
    title: "How I Built Event Horizon OS",
    category: "Space-Inspired Interfaces",
    date: "2026-02-10",
    readingTime: "6 min read",
    tags: ["Portfolio", "Next.js", "Motion"],
    excerpt:
      "A build log for the mission-control portfolio concept, from data modeling to cinematic interaction design.",
  },
  {
    slug: "making-3d-websites-without-destroying-performance",
    number: "LOG 006",
    title: "Making 3D Websites Without Destroying Performance",
    category: "Frontend Experiments",
    date: "2026-02-16",
    readingTime: "7 min read",
    tags: ["Three.js", "R3F", "Performance"],
    excerpt:
      "The performance discipline behind using WebGL as atmosphere while keeping content, accessibility, and Core Web Vitals intact.",
  },
  {
    slug: "smart-contracts-explained-through-orbital-systems",
    number: "LOG 007",
    title: "Smart Contracts Explained Through Orbital Systems",
    category: "Blockchain Engineering",
    date: "2026-02-22",
    readingTime: "5 min read",
    tags: ["Solidity", "Protocols", "Mental Models"],
    excerpt:
      "A space-inspired explanation of smart contract responsibilities, trust boundaries, and protocol gravity.",
  },
  {
    slug: "backend-architecture-behind-a-cinematic-portfolio",
    number: "LOG 008",
    title: "Backend Architecture Behind a Cinematic Portfolio",
    category: "Backend Architecture",
    date: "2026-03-01",
    readingTime: "6 min read",
    tags: ["Architecture", "Forms", "SEO"],
    excerpt:
      "Even a portfolio benefits from real backend thinking: validation, routing, metadata, failure states, and data ownership.",
  },
]

export const blogCategories = [
  "Backend Architecture",
  "Blockchain Engineering",
  "Frontend Experiments",
  "System Design",
  "Space-Inspired Interfaces",
  "Developer Philosophy",
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getResearchLog(slug: string) {
  return researchLogs.find((log) => log.slug === slug)
}

export function getAdjacentResearchLogs(slug: string) {
  const index = researchLogs.findIndex((log) => log.slug === slug)
  return {
    previous: index > 0 ? researchLogs[index - 1] : undefined,
    next:
      index >= 0 && index < researchLogs.length - 1
        ? researchLogs[index + 1]
        : undefined,
  }
}
