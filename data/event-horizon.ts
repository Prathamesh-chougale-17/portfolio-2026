import { en } from "@/data/en"

export const navItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
]

export const profile = {
  name: en.hero.name,
  role: "Backend-first full-stack and blockchain developer",
  company: en.hero.company,
  companyLink: en.hero.companyLink,
  tagline: "Backend systems, blockchain products, and polished web experiences.",
  alternativeHeroLine:
    "I build invisible systems that power visible experiences.",
  heroCopy:
    "I build backend systems that stay reliable under pressure, observable in production, and simple for teams to operate.",
  secondaryCopy:
    "A PowerShell-inspired developer workspace for exploring the systems, products, protocols, and ideas I have built.",
  leetcodeUsername: en.leetcode_username,
  stats: [
    { label: "Hackathon wins", value: "5+" },
    { label: "LeetCode rating", value: en.about.stats.leetcodeRating },
    { label: "Problems solved", value: "450+" },
    { label: "Open-source work", value: "12k+ repo" },
  ],
  socials: en.contact.socials.links.map((link) => ({
    label: link.label,
    url: link.url,
  })),
}

export const initSequence = [
  "STARTING PWSH STUDIO...",
  "BACKEND CORE: ONLINE",
  "BLOCKCHAIN TOOLING: READY",
  "FRONTEND INTERFACE: LOADED",
  "WORKSPACE STATUS: READY",
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

export const about = en.about

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

export type ArchitectureLayer = {
  id: string
  label: string
  category: "Frontend" | "Backend" | "Data" | "Blockchain" | "Operations"
  role: string
  stacks: string[]
  responsibilities: string[]
  flow: string[]
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "interface",
    label: "Interface Surface",
    category: "Frontend",
    role: "Turns backend and chain state into visible product feedback.",
    stacks: ["Next.js", "React", "TypeScript", "Tailwind CSS", "wagmi"],
    responsibilities: [
      "Render authenticated product flows",
      "Expose loading, empty, error, and success states",
      "Keep wallet and form interactions understandable",
    ],
    flow: ["Route", "Form state", "API call", "Visual feedback"],
  },
  {
    id: "boundary",
    label: "API Boundary",
    category: "Backend",
    role: "Accepts requests, validates intent, and rejects unsafe input early.",
    stacks: ["Node.js", "NestJS", "Express.js", "REST APIs", "GraphQL"],
    responsibilities: [
      "Validate payloads before business logic",
      "Shape response contracts for the frontend",
      "Separate public routes from internal actions",
    ],
    flow: ["Request", "Validation", "Controller", "Response contract"],
  },
  {
    id: "services",
    label: "Service Layer",
    category: "Backend",
    role: "Coordinates product rules, integrations, and long-running work.",
    stacks: ["Node.js", "NestJS", "Prisma", "Redis", "System Design"],
    responsibilities: [
      "Keep business rules away from route handlers",
      "Make repeatable work idempotent",
      "Translate product actions into durable system events",
    ],
    flow: ["Use case", "Service method", "Event", "Result state"],
  },
  {
    id: "storage",
    label: "Data Spine",
    category: "Data",
    role: "Stores product truth with explicit ownership and query paths.",
    stacks: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    responsibilities: [
      "Model stable identifiers and relationships",
      "Cache high-read paths without hiding source of truth",
      "Support audit, analytics, and recovery flows",
    ],
    flow: ["Entity", "Relation", "Cache", "Query"],
  },
  {
    id: "chain",
    label: "Chain Adapter",
    category: "Blockchain",
    role: "Treats blockchain as infrastructure with typed transaction state.",
    stacks: ["Solidity", "Ethereum", "viem", "wagmi", "Web3"],
    responsibilities: [
      "Separate wallet UX from contract boundaries",
      "Track pending, confirmed, and failed transactions",
      "Index chain events into readable application state",
    ],
    flow: ["Wallet", "Signature", "Transaction", "Indexer"],
  },
  {
    id: "ops",
    label: "Runtime Ops",
    category: "Operations",
    role: "Keeps builds, deploys, containers, and observability predictable.",
    stacks: ["Docker", "Kubernetes", "CI/CD", "Redis", "System Design"],
    responsibilities: [
      "Package services consistently",
      "Make release paths repeatable",
      "Expose health indicators before users notice problems",
    ],
    flow: ["Build", "Container", "Deploy", "Telemetry"],
  },
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

export type PortfolioProject = {
  slug: string
  title: string
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
  projectId: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function classify(tags: string[], title: string): PortfolioProject["categories"] {
  const joined = `${title} ${tags.join(" ")}`.toLowerCase()
  const categories = new Set<PortfolioProject["category"]>()

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

function projectType(categories: PortfolioProject["categories"]) {
  if (categories.includes("Blockchain")) return "Blockchain Protocol Case Study"
  if (categories.includes("Backend")) return "Backend Infrastructure Case Study"
  if (categories.includes("Experimental")) return "Experimental Systems Build"
  if (categories.includes("Frontend")) return "Frontend Product Interface"
  return "Full-stack Product System"
}

function projectDisplayTitle(title: string) {
  if (title === "Classic Portfolio Template") {
    return "Classic Developer Site Template"
  }

  if (title === "Modern Portfolio Template") {
    return "Modern Developer Site Template"
  }

  return title
}

function projectDisplayDescription(description: string) {
  return description
    .replace("classic portfolio website template", "classic developer website template")
    .replace("modern portfolio website template", "modern developer website template")
    .replace("showcase your projects and skills", "present projects and skills")
}

export const projects: PortfolioProject[] = en.projects.map((project, index) => {
  const categories = classify(project.tags, project.title)
  const category = categories.includes("Full-stack")
    ? "Full-stack"
    : categories[0]
  const stack = project.tags
  const title = projectDisplayTitle(project.title)
  const description = projectDisplayDescription(project.description)
  const slug = slugify(title)

  return {
    slug,
    title,
    type: projectType(categories),
    category,
    categories,
    stack,
    description,
    problem: `Build ${title} as a reliable product system with clear user flows, durable data boundaries, and a deployable architecture.`,
    role: "Product engineer, system designer, full-stack implementer, and deployment owner.",
    architecture: `${title} is modeled as a layered system: interface surface, API boundary, application services, data persistence, observability hooks, and release pipeline.`,
    backendDecisions: [
      "Keep validation close to the API boundary before data reaches business logic.",
      "Separate user-facing workflows from persistence and integration concerns.",
      "Favor predictable status models so the UI can report system state clearly.",
    ],
    blockchainLogic: categories.includes("Blockchain")
      ? "Wallet, transaction, token, or chain-specific logic is treated as infrastructure, with the interface reflecting confirmation and failure states."
      : "No chain dependency is required for this project, but the architecture leaves room for verifiable events and audit trails.",
    frontendExperience:
      "The interface focuses on fast scanning, confident action, and visual feedback that explains what the system is doing.",
    databaseDesign:
      "The data model favors explicit ownership, stable identifiers, and records that can support analytics, audit, and future integrations.",
    securityNotes:
      "The project emphasizes authenticated access, least-privilege paths, guarded inputs, and clear failure messages.",
    performanceNotes:
      "The first load is kept lean, heavy experiences are isolated, and repeated views are designed for cache-friendly data access.",
    lessonsLearned:
      "A polished product is strongest when backend state, interface feedback, and deployment constraints are designed together.",
    githubLink: project.githubLink,
    liveLink: project.liveLink,
    featured: project.featured,
    projectId: `PWSH-${String(index + 1).padStart(3, "0")}`,
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
    slug: "designing-apis-for-production-reliability",
    number: "NOTE 001",
    title: "Designing APIs for Production Reliability",
    category: "Backend Architecture",
    date: "2026-01-12",
    readingTime: "6 min read",
    tags: ["API Design", "Reliability", "Observability"],
    excerpt:
      "A backend-first note on stable interfaces, telemetry, failure isolation, and why APIs should behave like production-critical systems.",
  },
  {
    slug: "why-backend-developers-should-care-about-cinematic-ux",
    number: "NOTE 002",
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
    number: "NOTE 003",
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
    number: "NOTE 004",
    title: "PostgreSQL, Queues, and Event-Driven Systems",
    category: "System Design",
    date: "2026-02-02",
    readingTime: "7 min read",
    tags: ["PostgreSQL", "Queues", "Events"],
    excerpt:
      "A practical mental model for turning product actions into durable events without making the system harder to reason about.",
  },
  {
    slug: "building-powershell-inspired-developer-workspace",
    title: "Building a PowerShell-Inspired Developer Workspace",
    number: "NOTE 005",
    category: "PowerShell-Inspired Interfaces",
    date: "2026-02-10",
    readingTime: "6 min read",
    tags: ["Workspace", "Next.js", "Motion"],
    excerpt:
      "A build note for PWSH Studio, from data modeling to interactive PowerShell-style navigation.",
  },
  {
    slug: "making-3d-websites-without-destroying-performance",
    number: "NOTE 006",
    title: "Making 3D Websites Without Destroying Performance",
    category: "Frontend Experiments",
    date: "2026-02-16",
    readingTime: "7 min read",
    tags: ["Three.js", "R3F", "Performance"],
    excerpt:
      "The performance discipline behind using WebGL as atmosphere while keeping content, accessibility, and Core Web Vitals intact.",
  },
  {
    slug: "smart-contracts-explained-through-system-boundaries",
    number: "NOTE 007",
    title: "Smart Contracts Explained Through System Boundaries",
    category: "Blockchain Engineering",
    date: "2026-02-22",
    readingTime: "5 min read",
    tags: ["Solidity", "Protocols", "Mental Models"],
    excerpt:
      "A practical explanation of smart contract responsibilities, trust boundaries, and protocol ownership.",
  },
  {
    slug: "backend-architecture-behind-interactive-workspace",
    number: "NOTE 008",
    title: "Backend Architecture Behind an Interactive Workspace",
    category: "Backend Architecture",
    date: "2026-03-01",
    readingTime: "6 min read",
    tags: ["Architecture", "Forms", "SEO"],
    excerpt:
      "Even a personal developer workspace benefits from real backend thinking: validation, routing, metadata, failure states, and data ownership.",
  },
]

export const blogCategories = [
  "Backend Architecture",
  "Blockchain Engineering",
  "Frontend Experiments",
  "System Design",
  "PowerShell-Inspired Interfaces",
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
