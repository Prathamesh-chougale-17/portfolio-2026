import { Icons } from "@/components/icons"
import type { langtype } from "@/types/lang"
export const en: langtype = {
  leetcode_username: "prathameshchougale17",
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  hero: {
    name: "Prathamesh Chougale",
    image: "/profile.webp",
    intro: "Hi, I'm ",
    title: "Software Engineer",
    company: "RDM",
    companyLink: "https://rdmtoken.com",
    description:
      "Full-stack developer skilled in React, Next.js, and TypeScript. Passionate about building performant, accessible, and scalable web applications with real-world impact.",
  },
  homeSection: {
    achievementSectionTitle: "Achievements",
    projectSectionTitle: "Projects",
  },
  aboutSection: {
    statsTitle: "Statistics",
    techStackTitle: "Tech Stack",
    experienceTitle: "Experience",
  },
  achievements: [
    {
      title: "Smart India Hackathon Winner",
      description:
        "Secured Rank 1 in the Smart India Hackathon for developing an innovative real-world solution under national evaluation.",
      Icon: Icons.trophy,
    },
    {
      title: "HSBC Hackathon Winner 2024",
      description:
        "Won HSBC Hackathon 2024 by developing a high-impact web-based solution addressing financial workflow challenges.",
      Icon: Icons.award,
    },
    {
      title: "Open Source Contributor",
      description:
        "Contributed to popular open-source repositories such as Next.js SaaS Starter (12k+ stars), enhancing production-grade SaaS development tools.",
      Icon: Icons.gitHub,
    },
  ],
  projectsPage: {
    title: "My Projects",
    subtitle: "Showcasing My Creative Work",
    description:
      "Explore my portfolio of projects that combine creativity, engineering, and real-world problem solving using React, Next.js, and AI technologies.",
    filters: {
      searchPlaceholder: "Search projects by title, description, or tags...",
      filterByTag: "Filter by tag",
      allTags: "All Tags",
      featuredOnly: "Featured only",
      clearFilters: "Clear filters",
    },
  },
  projects: [
    {
      title: "Oorja AI",
      description:
        "A wellness platform offering personalized mental and physical health assessments. Integrated AI features for personalized recommendations and interactive learning.",
      tags: ["Next.js", "Next Auth", "Shadcn", "MongoDB"],
      liveLink: "https://oorjaai.vercel.app",
      image: "/projects/oorja.webp",
      featured: true,
    },
    {
      title: "Swaad Link",
      description:
        "A full-stack web app for booking personal chefs with real-time availability, Chef Profiles, and advanced search/filtering.",
      tags: ["React.js", "Clerk", "Node.js", "Express.js", "MongoDB"],
      githubLink: "https://github.com/Prathamesh-chougale-17/swaadLink",
      liveLink: "https://swaad-link.vercel.app",
      image: "/projects/swaadlink.webp",
      featured: false,
    },
    {
      title: "Health Vault",
      description:
        "Digital health record platform using Next.js and Clerk, enabling patients to store, retrieve, and manage health data efficiently.",
      tags: ["Next.js", "Sanity", "MongoDB", "Clerk"],
      githubLink: "https://github.com/Prathamesh-chougale-17/health-vault",
      liveLink: "https://health-vault.vercel.app",
      image: "/projects/health-vault.webp",
      featured: false,
    },
    {
      title: "Next.js SaaS Starter Contributions",
      description:
        "Open-source contributions to Next.js SaaS Starter (12.3k+ stars) — improving developer experience for production-grade SaaS products.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Open Source"],
      githubLink: "https://github.com/nextjs/saas-starter",
      liveLink: "https://next-saas-start.vercel.app",
      image: "/projects/saas.webp",
      featured: true,
    },
    {
      title: "Bighorn",
      description:
        "A modern renting and leasing platform for heavy vehicles and machinery. Built with Next.js, Tailwind CSS, and MongoDB, it offers real-time search, booking, and secure payments.",
      tags: ["Next.js", "Tailwind CSS", "MongoDB"],
      image: "/projects/bighorn.webp",
      liveLink: "https://big-horn.vercel.app",
      featured: false,
    },
    {
      title: "Bounty Quest",
      description:
        "Bounty-Quest is a decentralized task-based rewards system that generates daily tasks using the Gemini API. Participants complete tasks by posting on the blockchain via Twitter, providing a link to their tweet for AI-powered evaluation. The top three winners are announced based on AI scoring, and authentication is managed through Solana. Future updates will include smart contract integration to distribute rewards in DevSOL.",
      tags: ["Solana", "Next.js", "Tailwind CSS", "AI"],
      image: "/projects/bounty-quest.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/bounty-quest",
      liveLink: "https://solana-ai-steel.vercel.app",
      featured: false,
    },
    {
      title: "Carbon Track",
      description:
        "Track every product from raw materials to final delivery using ERC-1155 tokens on Avalanche blockchain. Generate immutable Digital Product Passports with complete carbon footprint data and supply chain verification.",
      tags: ["Next.js", "Tailwind CSS", "Avalanche", "Blockchain"],
      image: "/projects/carbon-track.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/next-carbon-footprint",
      liveLink: "https://next-carbon-footprint.vercel.app",
      featured: true,
    },
    {
      title: "Classic Portfolio Template",
      description:
        "A classic portfolio website template built with Next.js and Tailwind CSS, featuring responsive design and easy customization options.",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript", "Clerk"],
      image: "/projects/classic-portfolio-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/classic-portfolio-template",
      liveLink: "https://classic-portfolio-template-green.vercel.app",
      featured: false,
    },
    {
      title: "Custom Template",
      description:
        "A customizable template for building Next.js applications with Tailwind CSS.",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript", "Clerk"],
      image: "/projects/custom-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/nextjs-custom-template",
      liveLink: "https://nextjs-custom-template.vercel.app",
      featured: false,
    },
    {
      title: "Esport",
      description:
        "A competitive gaming platform that offers tournaments, matchmaking, and player statistics. Built with Next.js, Tailwind CSS, and Firebase.",
      tags: ["Next.js", "Tailwind CSS", "Sanity"],
      image: "/projects/esport.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/esport",
      liveLink: "https://esport-nexus.vercel.app",
      featured: false,
    },
    {
      title: "Gamify",
      description:
        "Gamify is a platform that allows users to create and participate in various games and challenges. Built with Next.js, Tailwind CSS, and Firebase, it offers real-time multiplayer support and user authentication.",
      tags: ["Next.js", "Tailwind CSS", "Sanity"],
      image: "/projects/gamify.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/gamify",
      liveLink: "https://gamify-swart.vercel.app/",
      featured: false,
    },
    {
      title: "Go Auth",
      description:
        "This repository is a starter project that demonstrates a secure, scalable authentication system using: Go (Golang) for the backend and Tanstack for the frontend. It includes features such as user registration, login, password hashing, JWT-based session management, and protected routes.",
      tags: ["Go", "Tanstack", "Authentication"],
      image: "/projects/go-auth.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/go-auth",
      featured: false,
    },
    {
      title: "Homebrew",
      description:
        "Advance AI Detection and Environmental Monitoring System using computer vision and IoT sensors. Built with Next.js, Tailwind CSS, and integrated with AI models for real-time analysis. Used Yolov12 for object detection and custom-trained models for specific use cases.",
      tags: ["Next.js", "Tailwind CSS", "AI", "IoT", "Yolov12"],
      image: "/projects/homebrew.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/ideathon-web",
      liveLink: "https://homebrew-nine.vercel.app",
      featured: false,
    },
    {
      title: "HSBC",
      description:
        "This is a comprehensive dashboard that provides insights into financial fraud detection using various data visualization techniques. The dashboard is built using Nextjs, TypeScript, Tailwind CSS, and Recharts.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
      image: "/projects/hsbc.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/hsbc",
      liveLink: "https://hsbc-five.vercel.app",
      featured: false,
    },
    {
      title: "Link Shorter",
      description:
        "A modern, full-stack URL shortener application built with Go backend and React frontend. It also features realtime click analytics",
      tags: ["Go", "React", "Tailwind CSS", "MongoDB"],
      image: "/projects/link-shorter.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/link-shorter",
      featured: false,
    },
    {
      title: "Mirrorship",
      description:
        "Mirrorship combines daily journaling with AI-powered insights and activity tracking. Write, reflect, and discover patterns in your personal growth journey.",
      tags: ["Next.js", "Tailwind CSS", "AI"],
      image: "/projects/mirrorship.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/mirrorship",
      liveLink: "https://mirrorship.vercel.app",
      featured: false,
    },
    {
      title: "Modern Portfolio Template",
      description:
        "A sleek and modern portfolio website template built with Next.js and Tailwind CSS, designed to showcase your projects and skills effectively.",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript"],
      image: "/projects/modern-portfolio-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/next-modern-portfolio-template",
      liveLink: "https://next-modern-portfolio-template.vercel.app",
      featured: false,
    },
    {
      title: "Muxify",
      description:
        "Muxify is a music streaming web application that allows users to browse, search, and play their favorite songs. Built with Next.js for the frontend and MongoDB for the database, it features a sleek UI and seamless playback experience.",
      tags: ["Next.js", "Tailwind CSS", "Sanity", "MongoDB"],
      image: "/projects/muxify.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/muxicify",
      liveLink: "https://muxify.vercel.app",
      featured: false,
    },
    {
      title: "Next Algorand Starter",
      description:
        "A starter template for building Algorand applications using Next.js.",
      tags: ["Next.js", "Algorand"],
      image: "/projects/next-algorand-starter.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/algorand-nextjs-starter",
      featured: false,
    },
    {
      title: "Parkpoolx",
      description:
        "Optimize parking, reduce congestion, and find rides easily with our integrated platform. Parkpoolx leverages real-time data and user-friendly design to enhance urban mobility and parking efficiency.",
      tags: ["Next.js", "Tailwind CSS", "MongoDB", "Next Auth"],
      image: "/projects/parkpoolx.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/parkpoolx",
      liveLink: "https://parkpoolx.vercel.app",
      featured: false,
    },
    {
      title: "Space Theme Template",
      description:
        "A futuristic space-themed website template built with Next.js and Tailwind CSS, perfect for showcasing your projects in a unique way.",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript"],
      image: "/projects/space-theme-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/space-theme-template",
      liveLink: "https://space-theme-template.vercel.app",
      featured: false,
    },
    {
      title: "Study Status",
      description:
        "Study Status is a web application that helps students track their study progress and manage their time effectively. Built with Next.js and Tailwind CSS, it features a clean and intuitive interface.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "/projects/study-status.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/status-study",
      liveLink: "https://status-study-seven.vercel.app",
      featured: false,
    },
    {
      title: "Tankshooter",
      description:
        "Tankshooter is an exciting multiplayer tank battle game built with Next.js and Socket.io. Players can join battles, customize their tanks, and compete for the top spot on the leaderboard.",
      tags: ["Next.js", "Socket.io", "Game Development"],
      image: "/projects/tankshooter.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/tankshooter",
      liveLink: "https://tankshooter-seven.vercel.app",
      featured: false,
    },
    {
      title: "Tulippg",
      description:
        "It is Simple PG/Hostel Management Web Application that allows users to easily find PGs and hostels based on their preferences. Built with Next.js, Tailwind CSS, and MongoDB, it offers advanced search and filtering options for a seamless user experience.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "/projects/tulippg.webp",
      liveLink: "https://tulippg.in",
      featured: true,
    },
  ],
  about: {
    hero: {
      title: "About Me",
      image: "/profile.webp",
      subtitle:
        "Full Stack Developer | Open Source Contributor | Problem Solver",
      description:
        "I'm a passionate full-stack developer with a strong foundation in computer science and hands-on experience building scalable web applications. My journey includes developing enterprise dashboards for HSBC, leading hackathon teams, and contributing to open source projects.",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    },
    techSkills: [
      { name: "React", level: 5, icon: Icons.react },
      { name: "TypeScript", level: 5, icon: Icons.typescript },
      { name: "Next.js", level: 5, icon: Icons.nextjs },
      { name: "Node.js", level: 4, icon: Icons.nodejs },
      { name: "Tailwind CSS", level: 5, icon: Icons.tailwindcss },
      { name: "Python", level: 3, icon: Icons.python },
      { name: "Docker", level: 3, icon: Icons.docker },
      { name: "Git/GitHub", level: 5, icon: Icons.gitHub },
      { name: "Databases", level: 4, icon: Icons.database },
      { name: "Arch Linux", level: 3, icon: Icons.arch },
    ],
    experiences: [
      {
        title: "Software Trainee Intern",
        company: "HSBC",
        period: "Jan 2025 - Mar 2025",
        description:
          "Developed a full-stack internal web application to consolidate team updates and organizational data into a unified dashboard. Improved internal visibility and collaboration using React.js and Java.",
      },
      {
        title: "Freelance Full Stack Developer",
        company: "Self-employed",
        period: "Sep 2024 - Dec 2024",
        description:
          "Built and maintained dynamic web applications for clients using React.js, Next.js, and TypeScript. Contributed clean, reusable, and scalable code to open-source repositories.",
      },
      {
        title: "Community Contributor",
        company: "ACM Chapter, PCCOE",
        period: "2024",
        description:
          "Conducted sessions for 300+ students on Git, GitHub, and Open Source. Helped establish a strong developer community and fostered contributions to public projects.",
      },
    ],
    stats: {
      statItems: [
        { label: "LeetCode Problems Solved", value: "450+" },
        { label: "Hackathon Wins", value: "5+" },
      ],
      leetcodeRating: "1500+",
    },
  },
  contact: {
    thoughtTitle: "Let's Build Something Impactful",
    thoughtText:
      "I love collaborating on innovative ideas that push boundaries. If you’re working on something exciting or need a developer to bring your vision to life, let’s connect!",
    imageUrl: "/contact/dialing.gif",
    imageAlt: "Developer working on laptop",
    socials: {
      title: "Connect with me",
      links: [
        {
          name: Icons.instagram,
          url: "https://instagram.com/prathamesh_chougale_17",
          label: "Instagram",
        },
        {
          name: Icons.x,
          url: "https://twitter.com/prathamesh_7717",
          label: "X (Twitter)",
        },
        {
          name: Icons.linkedin,
          url: "https://linkedin.com/in/prathamesh-chougale",
          label: "LinkedIn",
        },
        {
          name: Icons.gitHub,
          url: "https://github.com/prathamesh-chougale-17",
          label: "GitHub",
        },
      ],
    },
    form: {
      title: "Send Me a Message",
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "your.email@example.com" },
      subject: { label: "Subject", placeholder: "Enter message subject" },
      message: {
        label: "Message",
        placeholder: "Tell me about your project or inquiry...",
      },
      submit: "Send Message",
      success: "Thanks for reaching out! I'll get back to you soon.",
      error: "Something went wrong. Please try again.",
    },
  },
  offline: {
    title: "You're Offline",
    description:
      "It looks like you've lost your internet connection. Some features may not be available until you're back online.",
    returnToHome: "Return to Home",
    tryAgain: "Try Again",
  },
  chat: {
    typing: "Typing...",
    online: "Online",
    clear: "Clear",
    close: "Close",
    messagePlaceholder: "Type your message...",
    chatLoading: "Ahh, let me think...",
    copy: "Copy",
    copied: "Copied",
    chatCleared: "Chat cleared",
    failedToSend: "Failed to send message",
    errorResponse: "I'm having trouble responding right now. Try again later.",
    welcomeMessage:
      "Hello! I'm Prathamesh Chougale, a Software Engineer passionate about building impactful web applications. How can I assist you today?",
  },
}
