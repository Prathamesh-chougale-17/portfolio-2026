import {
  architectureLayers,
  projects,
  researchLogs,
  skills,
} from "@/data/event-horizon"
import type { langtype } from "@/types/lang"

export function workspaceTree() {
  return [
    "total 8",
    "drwxr-xr-x  5 prath studio   160 now .",
    "drwxr-xr-x  3 prath studio    96 now ..",
    "drwxr-xr-x  2 prath studio    64 now about",
    "drwxr-xr-x  2 prath studio    64 now projects",
    "drwxr-xr-x  2 prath studio    64 now blog",
    "drwxr-xr-x  2 prath studio    64 now contact",
    "-rw-r--r--  1 prath studio  1.2k now profile.json",
    "-rw-r--r--  1 prath studio  5.4k now projects.json",
    "-rw-r--r--  1 prath studio  2.1k now notes.json",
    "-rw-r--r--  1 prath studio  928B now architecture.map",
  ]
}

export function workspaceTreeGraph() {
  return [
    ".",
    "|-- about/",
    "|-- projects/",
    "|   |-- <project-slug>/",
    "|-- blog/",
    "|   |-- <note-slug>/",
    "|-- contact/",
    "|-- profile.json",
    "|-- projects.json",
    "|-- notes.json",
    "`-- architecture.map",
  ]
}

export function profileJson(languageData: langtype) {
  return JSON.stringify(
    {
      name: languageData.hero.name,
      role: languageData.hero.title,
      focus: languageData.hero.description,
      workspace: "PWSH Studio",
      skills: skills.slice(0, 10),
    },
    null,
    2
  )
}

export function projectsJson() {
  return JSON.stringify(
    projects.slice(0, 10).map((project) => ({
      id: project.projectId,
      title: project.title,
      route: `/projects/${project.slug}`,
      category: project.category,
      stack: project.stack.slice(0, 5),
    })),
    null,
    2
  )
}

export function notesJson() {
  return JSON.stringify(
    researchLogs.map((log) => ({
      id: log.number,
      title: log.title,
      route: `/blog/${log.slug}`,
      read: log.readingTime,
    })),
    null,
    2
  )
}

export function architectureMap() {
  return architectureLayers
    .map(
      (layer) =>
        `${layer.id.padEnd(10)} ${layer.category.padEnd(10)} ${layer.flow.join(" -> ")}`
    )
    .join("\n")
}

export function commandIndexLines() {
  return [
    "Navigation",
    "  cd /, cd /about, cd /projects, cd /blog, cd /contact, cd ..",
    "  project <name>, note <name>",
    "Workspace",
    "  ls, ls -la, tree, pwd, date, uptime, env",
    "  cat profile.json|projects.json|notes.json|architecture.map",
    "Discovery",
    "  whoami, uname -a, status, skills, architecture, projects, blog",
    "  grep <query>, find projects -name <query>",
    "Actions",
    "  contact, curl /api/contact, ping pwsh-core",
    "Preferences",
    "  theme cyan|amber|violet, lang en|hi|mr",
    "Extras",
    "  ./matrix, pkill matrix, make coffee, base64 -d state.txt, sudo ./ship-it, xdg-open workbench",
  ]
}

export function processLines(latency: number, routePath: string) {
  return [
    "USER       PID  %CPU %MEM COMMAND",
    `prath      101  0.${latency}  2.1  next-router --route=${routePath}`,
    "prath      118  0.2  1.4  contact-api --listen=/api/contact",
    "prath      124  0.1  1.2  project-index --watch",
    "prath      137  0.1  0.9  notes-reader --mdx",
    "prath      149  0.0  0.6  theme-service --persist",
  ]
}

export function searchWorkspace(query: string) {
  const needle = query.trim().toLowerCase()

  if (!needle) {
    return ["grep requires a query.", "Try: grep backend"]
  }

  const projectMatches = projects
    .filter((project) =>
      [
        project.title,
        project.description,
        project.category,
        project.type,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    )
    .slice(0, 6)
    .map((project) => `project  ${project.projectId}  ${project.title}`)

  const noteMatches = researchLogs
    .filter((log) =>
      [log.title, log.excerpt, log.category, ...log.tags]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    )
    .slice(0, 6)
    .map((log) => `note     ${log.number}  ${log.title}`)

  const skillMatches = skills
    .filter((skill) => skill.toLowerCase().includes(needle))
    .slice(0, 8)
    .map((skill) => `skill    ${skill}`)

  const matches = [...projectMatches, ...noteMatches, ...skillMatches]

  return matches.length
    ? [`Matches for "${query}":`, ...matches]
    : [`No workspace matches for "${query}".`]
}
