export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

// ─── Brand constants ────────────────────────────────────────────────────────
export const BRAND = {
  name: "Alex Rivera",
  initials: "AR",
  tagline: "Creative Developer & Designer",
  email: "hello@alexrivera.dev",
  location: "San Francisco, CA",
  available: true,
} as const;

// ─── Navigation (single source of truth) ────────────────────────────────────
// Route links start with "/"; section anchors start with "#"
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// Primary CTA shown in the navbar
export const navCTA = {
  label: "Hire Me",
  href: "#contact",
};

// ─── Social links ────────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: "Github" },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
];

// ─── Shared TypeScript types ─────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "design" | "tools";
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education";
}