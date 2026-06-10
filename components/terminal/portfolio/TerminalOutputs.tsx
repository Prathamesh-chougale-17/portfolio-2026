import type { ReactNode } from "react"
import {
  Archive,
  BookOpen,
  Braces,
  Code2,
  FolderGit2,
  Rocket,
  Send,
  UserRound,
} from "lucide-react"

import { TerminalContactForm } from "@/components/terminal/TerminalContactForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  architectureLayers,
  getProject,
  getResearchLog,
  initSequence,
  projects,
  researchLogs,
  skills,
  type PortfolioProject,
  type ResearchLog,
} from "@/data/event-horizon"
import type { langtype } from "@/types/lang"

import { routeItems } from "./constants"
import { localizedProject, localizedRouteLabel } from "./i18n"
import {
  DetailBlock,
  Metric,
  TerminalLines,
  TerminalSection,
  TerminalSubheading,
} from "./TerminalPrimitives"
import type { RouteState } from "./types"

export function RouteOutput({
  articleContent,
  languageData,
  onNavigate,
  route,
}: {
  articleContent?: ReactNode
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
  route: RouteState
}) {
  switch (route.view) {
    case "about":
      return <AboutOutput languageData={languageData} />
    case "projects":
      return (
        <ProjectList
          languageData={languageData}
          onNavigate={onNavigate}
          projects={projects}
          title={languageData.projectsPage.title}
        />
      )
    case "project-detail":
      return (
        <ProjectDetailOutput
          languageData={languageData}
          onNavigate={onNavigate}
          project={route.selectedSlug ? getProject(route.selectedSlug) : null}
        />
      )
    case "blog":
      return <BlogOutput onNavigate={onNavigate} />
    case "blog-detail":
      return (
        <BlogDetailOutput
          articleContent={articleContent}
          log={route.selectedSlug ? getResearchLog(route.selectedSlug) : null}
          onNavigate={onNavigate}
        />
      )
    case "contact":
      return <ContactOutput languageData={languageData} />
    case "home":
    default:
      return <HomeOutput languageData={languageData} onNavigate={onNavigate} />
  }
}

export function HomeOutput({
  languageData,
  onNavigate,
}: {
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
}) {
  return (
    <TerminalSection
      icon={Rocket}
      label="home"
      title={`${languageData.hero.name} - PWSH Studio`}
    >
      <TerminalLines
        lines={[
          ...initSequence,
          `${languageData.hero.name} / ${languageData.hero.title}`,
          languageData.hero.description,
          "Use the start menu or commands to explore projects, writing, and contact.",
        ]}
      />
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Metric label="projects" value={String(projects.length)} />
        <Metric label="notes" value={String(researchLogs.length)} />
        <Metric label="skills" value={String(skills.length)} />
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {routeItems
          .filter((item) => item.href !== "/")
          .map((item) => (
            <Button
              key={item.href}
              type="button"
              variant="ghost"
              data-terminal-home-route={item.href}
              onClick={() => onNavigate(item.href, item.command)}
              className="h-auto justify-start rounded-md border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-3 py-3 text-left transition hover:border-[color:var(--shell-border-strong)] hover:text-[var(--shell-accent-text)]"
            >
              <span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                  cd
                </span>
                <span className="mt-1 block font-heading text-lg text-slate-50">
                  {localizedRouteLabel(languageData, item.href, item.label)}
                </span>
              </span>
            </Button>
          ))}
      </div>
    </TerminalSection>
  )
}

export function AboutOutput({ languageData }: { languageData: langtype }) {
  const aboutCopy = languageData.about

  return (
    <TerminalSection
      icon={UserRound}
      label="about"
      title={aboutCopy.hero.title}
    >
      <TerminalLines
        lines={[
          aboutCopy.hero.subtitle,
          aboutCopy.hero.description,
          `LeetCode rating: ${aboutCopy.stats.leetcodeRating}`,
        ]}
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {aboutCopy.stats.statItems.map((item) => (
          <Metric key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
      <div className="mt-6">
        <TerminalSubheading>experience</TerminalSubheading>
        <div className="mt-3 grid gap-3">
          {aboutCopy.experiences.map((experience) => (
            <Card
              key={`${experience.company}-${experience.title}`}
              size="sm"
              className="gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-4"
            >
              <CardHeader className="px-4">
                <CardTitle className="text-lg text-slate-50">
                  {experience.title}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="w-fit rounded-none border-[color:var(--shell-border)] font-mono text-[11px] tracking-[0.14em] text-[var(--shell-accent-text)] uppercase"
                >
                  {experience.company} / {experience.period}
                </Badge>
              </CardHeader>
              <CardContent className="px-4">
                <p className="text-sm leading-7 text-slate-300">
                  {experience.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <TerminalSubheading>technical stack</TerminalSubheading>
        <div className="mt-3 flex flex-wrap gap-2">
          {aboutCopy.techSkills.map((skill) => (
            <Badge
              key={skill.name}
              variant="outline"
              className="h-auto rounded-none border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
            >
              {skill.name} / lvl {skill.level}
            </Badge>
          ))}
        </div>
      </div>
    </TerminalSection>
  )
}

export function ProjectList({
  languageData,
  onNavigate,
  projects: projectItems,
  title,
}: {
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
  projects: PortfolioProject[]
  title: string
}) {
  return (
    <TerminalSection icon={Archive} label="projects" title={title}>
      <TerminalLines
        lines={[
          `${projectItems.length} projects available.`,
          "Select a row to inspect its case study at /projects/<slug>.",
        ]}
      />
      <div className="mt-5 grid gap-2">
        {projectItems.map((project) => {
          const localized = localizedProject(project, languageData)

          return (
            <button
              key={project.slug}
              type="button"
              data-project-slug={project.slug}
              onClick={() =>
                onNavigate(
                  `/projects/${project.slug}`,
                  `project ${project.slug}`
                )
              }
              className="grid gap-3 border border-[color:var(--shell-border)] bg-[var(--shell-bg)] p-3 text-left transition hover:border-[color:var(--shell-border-strong)] hover:bg-[var(--shell-accent-soft)] sm:grid-cols-[96px_minmax(0,1fr)_auto]"
            >
              <Badge
                variant="outline"
                className="h-fit rounded-none border-[color:var(--shell-border)] font-mono text-[11px] text-[var(--shell-accent-text)]"
              >
                {project.projectId}
              </Badge>
              <span className="min-w-0">
                <span className="block font-heading text-base text-slate-50">
                  {localized.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-400">
                  {localized.description}
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="h-auto rounded-none border-[color:var(--shell-border)] px-1.5 py-1 font-mono text-[9px] tracking-[0.1em] text-slate-500 uppercase"
                    >
                      {item}
                    </Badge>
                  ))}
                </span>
              </span>
              <Badge
                variant="outline"
                className="h-fit rounded-none border-[color:var(--shell-border)] font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase"
              >
                {project.category}
              </Badge>
            </button>
          )
        })}
      </div>
    </TerminalSection>
  )
}

export function ProjectDetailOutput({
  languageData,
  onNavigate,
  project,
}: {
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
  project?: PortfolioProject | null
}) {
  if (!project) {
    return (
      <TerminalSection
        icon={FolderGit2}
        label="project"
        title="Project not found"
      >
        <TerminalLines
          lines={["Use projects to inspect available case studies."]}
        />
      </TerminalSection>
    )
  }

  const localized = localizedProject(project, languageData)

  return (
    <TerminalSection
      icon={FolderGit2}
      label={project.projectId}
      title={localized.title}
    >
      <TerminalLines
        lines={[
          `Type: ${project.type}`,
          `Route: /projects/${project.slug}`,
          localized.description,
          `Role: ${project.role}`,
        ]}
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric label="category" value={project.category} />
        <Metric label="project id" value={project.projectId} />
        <Metric label="stack size" value={String(project.stack.length)} />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <DetailBlock title="problem" text={project.problem} />
        <DetailBlock title="architecture" text={project.architecture} />
        <DetailBlock title="blockchain logic" text={project.blockchainLogic} />
        <DetailBlock title="database design" text={project.databaseDesign} />
        <DetailBlock title="security notes" text={project.securityNotes} />
        <DetailBlock
          title="performance notes"
          text={project.performanceNotes}
        />
      </div>
      <div className="mt-6">
        <TerminalSubheading>backend decisions</TerminalSubheading>
        <TerminalLines
          lines={project.backendDecisions.map(
            (decision, index) => `${index + 1}. ${decision}`
          )}
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onNavigate("/projects", "projects")}
          className="rounded-none border-[color:var(--shell-border-strong)] bg-[var(--shell-accent-soft)] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-[var(--shell-accent-text)] uppercase"
        >
          back to projects
        </Button>
        {project.githubLink ? (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase hover:text-[var(--shell-accent-text)]"
          >
            github
          </a>
        ) : null}
        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase hover:text-[var(--shell-accent-text)]"
          >
            live
          </a>
        ) : null}
      </div>
    </TerminalSection>
  )
}

export function BlogOutput({
  onNavigate,
}: {
  onNavigate: (path: string, command?: string) => void
}) {
  return (
    <TerminalSection icon={BookOpen} label="blog" title="Engineering notes">
      <TerminalLines
        lines={[
          `${researchLogs.length} notes available.`,
          "Select a note to inspect it at /blog/<slug>.",
        ]}
      />
      <div className="mt-5 grid gap-2">
        {researchLogs.map((log) => (
          <button
            key={log.slug}
            type="button"
            data-log-slug={log.slug}
            onClick={() => onNavigate(`/blog/${log.slug}`, `note ${log.title}`)}
            className="grid gap-3 border border-[color:var(--shell-border)] bg-[var(--shell-bg)] p-3 text-left transition hover:border-[color:var(--shell-border-strong)] hover:bg-[var(--shell-accent-soft)] sm:grid-cols-[96px_minmax(0,1fr)_auto]"
          >
            <Badge
              variant="outline"
              className="h-fit rounded-none border-[color:var(--shell-border)] font-mono text-[11px] text-[var(--shell-accent-text)]"
            >
              {log.number}
            </Badge>
            <span>
              <span className="block font-heading text-base text-slate-50">
                {log.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-400">
                {log.excerpt}
              </span>
            </span>
            <Badge
              variant="outline"
              className="h-fit rounded-none border-[color:var(--shell-border)] font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase"
            >
              {log.readingTime}
            </Badge>
          </button>
        ))}
      </div>
    </TerminalSection>
  )
}

export function BlogDetailOutput({
  articleContent,
  log,
  onNavigate,
}: {
  articleContent?: ReactNode
  log?: ResearchLog | null
  onNavigate: (path: string, command?: string) => void
}) {
  if (!log) {
    return (
      <TerminalSection
        icon={BookOpen}
        label="note"
        title="Engineering note not found"
      >
        <TerminalLines lines={["Use blog to inspect available notes."]} />
      </TerminalSection>
    )
  }

  return (
    <TerminalSection icon={BookOpen} label={log.number} title={log.title}>
      <TerminalLines
        lines={[
          `Category: ${log.category}`,
          `Date: ${log.date}`,
          `Read time: ${log.readingTime}`,
          log.excerpt,
        ]}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {log.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="h-auto rounded-none border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Card
        size="sm"
        className="mt-6 gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-4"
      >
        <CardContent className="px-4">
          <TerminalSubheading>reading view</TerminalSubheading>
          <div className="mt-2 max-w-none font-sans">{articleContent}</div>
        </CardContent>
      </Card>
      <Button
        type="button"
        variant="outline"
        onClick={() => onNavigate("/blog", "blog")}
        className="mt-5 rounded-none border-[color:var(--shell-border-strong)] bg-[var(--shell-accent-soft)] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-[var(--shell-accent-text)] uppercase"
      >
        back to notes
      </Button>
    </TerminalSection>
  )
}

export function ContactOutput({ languageData }: { languageData: langtype }) {
  return (
    <TerminalSection
      icon={Send}
      label="contact"
      title={languageData.contact.form.title}
    >
      <TerminalLines
        lines={[
          "Path: Browser -> API -> Mail Service -> Developer Inbox.",
          languageData.contact.thoughtText,
        ]}
      />
      <div className="mt-5">
        <TerminalContactForm languageData={languageData} />
      </div>
    </TerminalSection>
  )
}

export function SkillOutput() {
  return (
    <TerminalSection icon={Code2} label="skills" title="Stack map">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="h-auto rounded-none border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </TerminalSection>
  )
}

export function ArchitectureOutput() {
  return (
    <TerminalSection icon={Braces} label="architecture" title="System layers">
      <div className="grid gap-3">
        {architectureLayers.map((layer) => (
          <Card
            key={layer.id}
            size="sm"
            className="gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-4"
          >
            <CardHeader className="px-4">
              <CardTitle className="text-lg text-slate-50">
                {layer.label}
              </CardTitle>
              <Badge
                variant="outline"
                className="w-fit rounded-none border-[color:var(--shell-border)] font-mono text-[10px] tracking-[0.14em] text-[var(--shell-accent-text)] uppercase"
              >
                {layer.category} / {layer.flow.join(" -> ")}
              </Badge>
            </CardHeader>
            <CardContent className="px-4">
              <p className="text-sm leading-7 text-slate-300">{layer.role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {layer.stacks.map((stack) => (
                  <Badge
                    key={stack}
                    variant="outline"
                    className="h-auto rounded-none border-[color:var(--shell-border)] px-2 py-1 font-mono text-[10px] text-slate-400"
                  >
                    {stack}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TerminalSection>
  )
}
