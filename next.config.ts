import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/blog/designing-apis-like-spacecraft-systems",
        destination: "/blog/designing-apis-for-production-reliability",
        permanent: true,
      },
      {
        source: "/blog/how-i-built-event-horizon-os",
        destination: "/blog/building-powershell-inspired-developer-workspace",
        permanent: true,
      },
      {
        source: "/blog/smart-contracts-explained-through-orbital-systems",
        destination: "/blog/smart-contracts-explained-through-system-boundaries",
        permanent: true,
      },
      {
        source: "/blog/backend-architecture-behind-a-cinematic-portfolio",
        destination: "/blog/backend-architecture-behind-interactive-workspace",
        permanent: true,
      },
      {
        source: "/project/classic-portfolio-template",
        destination: "/projects/classic-developer-site-template",
        permanent: true,
      },
      {
        source: "/project/modern-portfolio-template",
        destination: "/projects/modern-developer-site-template",
        permanent: true,
      },
      {
        source: "/project",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/projects/classic-portfolio-template",
        destination: "/projects/classic-developer-site-template",
        permanent: true,
      },
      {
        source: "/projects/modern-portfolio-template",
        destination: "/projects/modern-developer-site-template",
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
