"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Star, Check, Mail, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, ExternalLink, Code2, Palette, Zap, Globe, Terminal, Layout, Heart, Eye, ChevronRight } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
  cardHover,
} from "@/lib/motion";

// ─── Inline data ─────────────────────────────────────────────────────────────

const projects = [
  {
    id: "1",
    title: "Luminary Design System",
    description:
      "A comprehensive component library powering 12 enterprise products. Built with React, TypeScript, and Storybook — reducing design-to-code time by 60%.",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    image: "https://cdn.prod.website-files.com/5e60642a30fed6e8bad55789/691b7fdd1a7de0d41a6f161d_Connectopia%20-%20Lum%20Branding.webp",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    color: "from-[#6c63ff] to-[#00d4ff]",
  },
  {
    id: "2",
    title: "Orbit Analytics Dashboard",
    description:
      "Real-time data visualization platform for SaaS metrics. Handles 2M+ events/day with sub-100ms query response using edge functions.",
    tags: ["Next.js", "D3.js", "Supabase", "Vercel"],
    image: "https://i.ytimg.com/vi/glCQ5z3yMno/maxresdefault.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    color: "from-[#f59e0b] to-[#ef4444]",
  },
  {
    id: "3",
    title: "Pulse Mobile App",
    description:
      "Health & wellness tracker with AI-powered insights. 50k+ downloads, 4.8★ App Store rating. Built with React Native and a custom ML pipeline.",
    tags: ["React Native", "Python", "TensorFlow", "AWS"],
    image: "https://play-lh.googleusercontent.com/3gvSC902Etqh70J9zBlwpPYNu9C79LAu_Y1ebPuCQ2wVw-qdxg_uelAZo0GzMJAVgh2PIKnRo9Iymm8NOlXZmjE",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    color: "from-[#10b981] to-[#06b6d4]",
  },
];

const services = [
  {
    icon: <Layout size={24} />,
    title: "UI/UX Design",
    description:
      "Pixel-perfect interfaces grounded in user research. From wireframes to polished Figma prototypes that developers love to build.",
    gradient: "from-[#6c63ff]/20 to-[#6c63ff]/5",
    border: "border-[#6c63ff]/20",
    iconColor: "text-[#6c63ff]",
    iconBg: "bg-[#6c63ff]/10",
  },
  {
    icon: <Code2 size={24} />,
    title: "Frontend Engineering",
    description:
      "Performant, accessible web apps with React & Next.js. Core Web Vitals scores in the green, every time.",
    gradient: "from-[#00d4ff]/20 to-[#00d4ff]/5",
    border: "border-[#00d4ff]/20",
    iconColor: "text-[#00d4ff]",
    iconBg: "bg-[#00d4ff]/10",
  },
  {
    icon: <Terminal size={24} />,
    title: "Full-Stack Development",
    description:
      "End-to-end product engineering — APIs, databases, auth, and deployment pipelines. Ship fast, scale confidently.",
    gradient: "from-[#10b981]/20 to-[#10b981]/5",
    border: "border-[#10b981]/20",
    iconColor: "text-[#10b981]",
    iconBg: "bg-[#10b981]/10",
  },
  {
    icon: <Palette size={24} />,
    title: "Brand & Identity",
    description:
      "Cohesive visual identities that communicate your values instantly — logos, color systems, typography, and motion guidelines.",
    gradient: "from-[#f59e0b]/20 to-[#f59e0b]/5",
    border: "border-[#f59e0b]/20",
    iconColor: "text-[#f59e0b]",
    iconBg: "bg-[#f59e0b]/10",
  },
  {
    icon: <Zap size={24} />,
    title: "Performance Optimization",
    description:
      "Lighthouse audits, bundle analysis, and surgical refactoring. Turn sluggish apps into sub-second experiences.",
    gradient: "from-[#ef4444]/20 to-[#ef4444]/5",
    border: "border-[#ef4444]/20",
    iconColor: "text-[#ef4444]",
    iconBg: "bg-[#ef4444]/10",
  },
  {
    icon: <Globe size={24} />,
    title: "Technical Consulting",
    description:
      "Architecture reviews, tech-stack decisions, and team mentorship. Bring clarity to complex engineering challenges.",
    gradient: "from-[#8b5cf6]/20 to-[#8b5cf6]/5",
    border: "border-[#8b5cf6]/20",
    iconColor: "text-[#8b5cf6]",
    iconBg: "bg-[#8b5cf6]/10",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "CTO, Luminary Labs",
    avatar: "https://imageio.forbes.com/specials-images/imageserve/5c928fa04bbe6f52641ab341/0x0.jpg?format=jpg&crop=2124,2123,x980,y756,safe&height=416&width=416&fit=bounds",
    rating: 5,
    text: "Alex transformed our product from a clunky MVP into something our users genuinely love. The attention to detail — from micro-animations to load performance — is extraordinary.",
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Founder, Orbit Analytics",
    avatar: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/aewahyauhdstskbbuq43",
    rating: 5,
    text: "We hired Alex to rescue a stalled redesign. Within 6 weeks we had a polished dashboard that our enterprise clients praised in every demo. Exceptional communicator too.",
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Head of Product, Pulse Health",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    rating: 5,
    text: "The design system Alex built cut our sprint velocity in half — in the best way. Components are so well-documented that onboarding new engineers takes days, not weeks.",
  },
];

const stats = [
  { value: "50+", label: "Projects shipped" },
  { value: "12", label: "Happy clients" },
  { value: "4.9★", label: "Average rating" },
  { value: "6yr", label: "Experience" },
];

const skills = [
  { name: "React / Next.js", level: 96 },
  { name: "TypeScript", level: 92 },
  { name: "UI/UX Design", level: 88 },
  { name: "Node.js / APIs", level: 84 },
  { name: "Figma", level: 90 },
  { name: "Animation & Motion", level: 86 },
];

const timeline = [
  {
    year: "2024",
    title: "Senior Creative Developer",
    company: "Freelance / Studio AR",
    description:
      "Running an independent studio focused on design-engineering for Series A–C startups.",
    type: "work" as const,
  },
  {
    year: "2022",
    title: "Lead Frontend Engineer",
    company: "Luminary Labs",
    description:
      "Led a team of 6 engineers building the company's core design system and customer-facing dashboard.",
    type: "work" as const,
  },
  {
    year: "2020",
    title: "UI Engineer",
    company: "Verve Digital",
    description:
      "Shipped pixel-perfect marketing sites and web apps for Fortune 500 clients.",
    type: "work" as const,
  },
  {
    year: "2018",
    title: "B.S. Computer Science",
    company: "UC Berkeley",
    description:
      "Graduated with honors. Minor in Visual Art. Senior thesis on generative design systems.",
    type: "education" as const,
  },
];

// ─── Skill bar component ──────────────────────────────────────────────────────

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const barVariant: Variants = {
    hidden: { width: "0%" },
    visible: {
      width: `${level}%`,
      transition: { duration: 1, ease: "easeOut", delay: index * 0.1 },
    },
  };

  return (
    <motion.div variants={fadeInUp} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className="text-xs text-white/40 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          variants={barVariant}
          className="h-full rounded-full bg-gradient-to-r from-[#6c63ff] to-[#00d4ff]"
        />
      </div>
    </motion.div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return sent ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
        <Check size={28} className="text-emerald-400" />
      </div>
      <h3 className="text-xl font-semibold text-white">Message sent!</h3>
      <p className="text-white/50 text-sm max-w-xs">
        Thanks for reaching out. I'll get back to you within 24 hours.
      </p>
    </motion.div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/40 uppercase tracking-widest">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jane Smith"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#6c63ff]/50 focus:bg-white/8 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/40 uppercase tracking-widest">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jane@company.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#6c63ff]/50 focus:bg-white/8 transition-all duration-200"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-white/40 uppercase tracking-widest">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell me about your project — timeline, goals, budget..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#6c63ff]/50 focus:bg-white/8 transition-all duration-200 resize-none"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] text-white font-semibold text-sm shadow-lg shadow-[#6c63ff]/25 hover:shadow-[#6c63ff]/40 transition-shadow duration-300"
      >
        Send Message
      </motion.button>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6c63ff]/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00d4ff]/8 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6c63ff]/5 blur-[150px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for new projects · {BRAND.location}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-white">I design &</span>
            <br />
            <span className="bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#00d4ff] bg-clip-text text-transparent">
              engineer
            </span>
            <br />
            <span className="text-white">digital magic.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Hi, I'm{" "}
            <span className="text-white font-medium">{BRAND.name}</span> — a{" "}
            {BRAND.tagline.toLowerCase()} who turns ambitious ideas into
            polished, performant products that users remember.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] text-white font-semibold text-sm shadow-xl shadow-[#6c63ff]/30 hover:shadow-[#6c63ff]/50 transition-shadow duration-300"
            >
              <Sparkles size={16} />
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-semibold text-sm transition-all duration-200 bg-white/5 hover:bg-white/8"
            >
              Let's Talk
              <ArrowRight size={16} />
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/20 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative py-28 sm:py-36">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#6c63ff]/6 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: image + floating cards */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                {/* Main image */}
                <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                  <img
                    src="https://static.dezeen.com/uploads/2014/05/Studio8Photo-by-InputCreativeStudio_dezeen_784_2.jpg"
                    alt={BRAND.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />
                </div>

                {/* Floating card: experience */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -right-6 top-8 bg-[#1a1a1a] border border-white/10 rounded-2xl px-5 py-4 shadow-xl shadow-black/30 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-white">6+</div>
                  <div className="text-xs text-white/40 mt-0.5">Years of craft</div>
                </motion.div>

                {/* Floating card: stack */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, duration: 0.6 }}
                  className="absolute -left-6 bottom-10 bg-[#1a1a1a] border border-white/10 rounded-2xl px-5 py-4 shadow-xl shadow-black/30 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart size={14} className="text-[#ef4444]" />
                    <span className="text-xs text-white/40">Favourite stack</span>
                  </div>
                  <div className="flex gap-2">
                    {["Next.js", "TS", "Figma"].map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: copy + skills */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <span className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest">
                  About Me
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Where design meets{" "}
                  <span className="bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] bg-clip-text text-transparent">
                    engineering
                  </span>
                </h2>
                <p className="text-white/50 leading-relaxed text-lg">
                  I'm a San Francisco-based creative developer with 6 years of
                  experience building products that sit at the intersection of
                  beautiful design and solid engineering. I care deeply about
                  the details — the easing curve on an animation, the contrast
                  ratio of a button, the milliseconds shaved off a load time.
                </p>
                <p className="text-white/50 leading-relaxed">
                  When I'm not shipping code, I'm contributing to open-source,
                  mentoring junior developers, or exploring generative art. I
                  believe the best digital products feel inevitable — like they
                  couldn't have been built any other way.
                </p>
              </motion.div>

              {/* Skills */}
              <motion.div variants={staggerContainer} className="space-y-4">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#6c63ff] hover:text-[#00d4ff] transition-colors duration-200 group"
                >
                  Work with me
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="relative py-28 sm:py-36 border-t border-white/5">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6c63ff]/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest"
            >
              What I Do
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-4xl sm:text-5xl font-bold leading-tight"
            >
              Services built for{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] bg-clip-text text-transparent">
                impact
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-white/50 max-w-xl mx-auto text-lg"
            >
              From concept to deployment, I cover the full spectrum of modern
              product development — with a designer's eye and an engineer's
              rigour.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover="hover"
                initial="rest"
                animate="rest"
                // @ts-ignore
                custom={cardHover}
                className={`relative group p-7 rounded-2xl border ${service.border} bg-gradient-to-br ${service.gradient} backdrop-blur-sm hover:border-opacity-40 transition-all duration-300 cursor-default`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.iconBg} ${service.iconColor} mb-5`}
                >
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="relative py-28 sm:py-36 border-t border-white/5">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#00d4ff]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest"
            >
              Selected Work
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-4xl sm:text-5xl font-bold leading-tight"
            >
              Projects I'm{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] bg-clip-text text-transparent">
                proud of
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-white/50 max-w-xl mx-auto text-lg"
            >
              A curated selection of recent work — each one a story of
              collaboration, craft, and shipping something that matters.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl border border-white/8 overflow-hidden bg-[#141414] hover:border-white/15 transition-all duration-300 shadow-xl shadow-black/20"
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#141414]/60" />
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col justify-center p-8 lg:p-12 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] text-white text-sm font-semibold shadow-lg shadow-[#6c63ff]/20"
                      >
                        <Eye size={14} />
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white text-sm font-semibold transition-colors duration-200 bg-white/5 hover:bg-white/8"
                      >
                        <Github size={14} />
                        Source
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS / TIMELINE ────────────────────────────────────────────── */}
      <section id="skills" className="relative py-28 sm:py-36 border-t border-white/5">
        <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-[#6c63ff]/6 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest"
            >
              Experience
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-4xl sm:text-5xl font-bold leading-tight"
            >
              The journey{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] bg-clip-text text-transparent">
                so far
              </span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Timeline */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-[#6c63ff]/50 via-[#00d4ff]/30 to-transparent" />
              <div className="space-y-10">
                {timeline.map((item) => (
                  <motion.div
                    key={`${item.year}-${item.title}`}
                    variants={fadeInLeft}
                    className="relative pl-12"
                  >
                    <div
                      className={`absolute left-0 top-1 w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        item.type === "work"
                          ? "border-[#6c63ff] bg-[#6c63ff]/10 text-[#6c63ff]"
                          : "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff]"
                      }`}
                    >
                      {item.year.slice(2)}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-white/30 font-mono">{item.year}</div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <div className="text-sm text-[#6c63ff] font-medium">{item.company}</div>
                      <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-5"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.id}
                  variants={fadeInRight}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 rounded-2xl bg-[#141414] border border-white/8 hover:border-white/15 transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={12} className="text-[#f59e0b] fill-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-4 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-28 sm:py-36 border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6c63ff]/8 blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.span
                  variants={fadeInUp}
                  className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest"
                >
                  Get In Touch
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl font-bold leading-tight"
                >
                  Let's build something{" "}
                  <span className="bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] bg-clip-text text-transparent">
                    remarkable
                  </span>
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-white/50 leading-relaxed text-lg"
                >
                  Whether you have a fully-formed brief or just a spark of an
                  idea, I'd love to hear from you. I typically respond within
                  24 hours.
                </motion.p>
              </div>

              {/* Contact details */}
              <motion.div variants={staggerContainer} className="space-y-4">
                <motion.a
                  variants={fadeInUp}
                  href={`mailto:${BRAND.email}`}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-white/15 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/10 border border-[#6c63ff]/20 flex items-center justify-center text-[#6c63ff]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 mb-0.5">Email</div>
                    <div className="text-sm font-medium text-white group-hover:text-[#6c63ff] transition-colors duration-200">
                      {BRAND.email}
                    </div>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-white/20 group-hover:text-white/40 transition-colors" />
                </motion.a>

                {/* Social links */}
                <motion.div variants={fadeInUp} className="flex gap-3">
                  {[
                    { icon: <Github size={18} />, href: "https://github.com", label: "GitHub" },
                    { icon: <Twitter size={18} />, href: "https://twitter.com", label: "Twitter" },
                    { icon: <Linkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                      className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-200"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Availability note */}
              <motion.div
                variants={fadeInUp}
                className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-400">
                    Currently available
                  </span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  I'm open to freelance projects, contract work, and select
                  full-time opportunities. My next availability window opens
                  February 2025.
                </p>
              </motion.div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="p-8 rounded-3xl bg-[#141414] border border-white/8 shadow-2xl shadow-black/30"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Send a message
              </h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="relative py-20 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6c63ff]/10 via-transparent to-[#00d4ff]/10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#6c63ff]/10 blur-[80px]" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5"
          >
            Ready to turn your vision into{" "}
            <span className="bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] bg-clip-text text-transparent">
              reality?
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-white/50 text-lg mb-10 max-w-xl mx-auto"
          >
            Great products don't happen by accident. Let's collaborate and
            build something your users will love — and your competitors will
            envy.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] text-white font-semibold shadow-xl shadow-[#6c63ff]/30 hover:shadow-[#6c63ff]/50 transition-shadow duration-300"
            >
              <Sparkles size={16} />
              Start a Project
            </motion.a>
            <motion.a
              href={`mailto:${BRAND.email}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/70 hover:text-white font-semibold transition-all duration-200 bg-white/5 hover:bg-white/8"
            >
              <Mail size={16} />
              {BRAND.email}
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}