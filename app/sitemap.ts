import type { MetadataRoute } from "next"

import { projects, researchLogs } from "@/data/event-horizon"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://event-horizon-os.local"
  const routes = ["", "/projects", "/blog", "/contact"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }))

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
  }))

  const blogRoutes = researchLogs.map((log) => ({
    url: `${base}/blog/${log.slug}`,
    lastModified: new Date(log.date),
  }))

  return [...routes, ...projectRoutes, ...blogRoutes]
}
