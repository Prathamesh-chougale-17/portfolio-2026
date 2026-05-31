import type { MDXComponents } from "mdx/types"

import { ArchitectureDiagram } from "@/components/blog/ArchitectureDiagram"
import { CodeBlock } from "@/components/blog/CodeBlock"

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 scroll-m-24 font-heading text-2xl font-semibold text-slate-50">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 scroll-m-24 font-heading text-xl font-semibold text-cyan-100">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-base leading-8 text-slate-300">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 space-y-3 text-base leading-7 text-slate-300">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="relative pl-6 before:absolute before:top-3 before:left-0 before:size-1.5 before:rounded-full before:bg-cyan-300">
      {children}
    </li>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  ArchitectureDiagram,
}

export function useMDXComponents(): MDXComponents {
  return components
}
