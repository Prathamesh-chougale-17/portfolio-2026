import {
  Award,
  BadgeCheck,
  Boxes,
  Braces,
  Container,
  Cpu,
  Database,
  Globe2,
  Server,
  Terminal,
  Trophy,
} from "lucide-react"
import type { ComponentType } from "react"

type IconProps = {
  className?: string
}

function asIcon(Icon: ComponentType<IconProps>) {
  return function WrappedIcon({ className }: IconProps) {
    return <Icon className={className} aria-hidden="true" />
  }
}

export const Icons = {
  trophy: asIcon(Trophy),
  award: asIcon(Award),
  gitHub: asIcon(GitHubIcon),
  instagram: asIcon(InstagramIcon),
  x: asIcon(XIcon),
  linkedin: asIcon(LinkedInIcon),
  react: asIcon(AtomIcon),
  typescript: asIcon(Braces),
  nextjs: asIcon(Globe2),
  nodejs: asIcon(Server),
  tailwindcss: asIcon(BadgeCheck),
  python: asIcon(Terminal),
  docker: asIcon(Container),
  database: asIcon(Database),
  arch: asIcon(Cpu),
  boxes: asIcon(Boxes),
}

function AtomIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <path
        d="M12 21c3.4 0 6.2-4 6.2-9S15.4 3 12 3 5.8 7 5.8 12 8.6 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.2 7.5c-1.7 2.9 1.4 7.2 5.8 9.8 4.3 2.5 9.6 2.2 11.3-.7 1.7-2.9-1.4-7.2-5.8-9.8-4.3-2.5-9.6-2.2-11.3.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19.8 7.5c1.7 2.9-1.4 7.2-5.8 9.8-4.3 2.5-9.6 2.2-11.3-.7C1 13.7 4.1 9.4 8.5 6.8c4.3-2.5 9.6-2.2 11.3.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.47 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.49v-1.86c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.77c0 .27.18.58.69.48A10.19 10.19 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M5.02 8.43h3.46V19H5.02V8.43Zm1.73-5.24a2 2 0 1 1 0 4.01 2 2 0 0 1 0-4.01ZM10.6 8.43h3.31v1.45h.05c.46-.87 1.58-1.78 3.26-1.78 3.49 0 4.13 2.3 4.13 5.29V19h-3.45v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V19H10.6V8.43Z" />
    </svg>
  )
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        width="16"
        height="16"
        x="4"
        y="4"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}

function XIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="m5.1 4 6.08 7.88L4.72 20h2.06l5.37-6.75L17.36 20h4.02l-6.43-8.33L21 4h-2.06l-4.96 6.24L9.12 4H5.1Zm3.04 1.52 10.18 12.96h-1.78L6.35 5.52h1.79Z" />
    </svg>
  )
}
