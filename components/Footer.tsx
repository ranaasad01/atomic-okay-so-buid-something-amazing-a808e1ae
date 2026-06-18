"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ArrowUp } from 'lucide-react';
import { navLinks, BRAND, socialLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={18} />,
  Twitter: <Twitter size={18} />,
  Linkedin: <Linkedin size={18} />,
};

export default function Footer() {
  const pathname = usePathname();

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#6c63ff]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] text-white font-bold text-sm shadow-lg shadow-[#6c63ff]/30">
                {BRAND.initials}
              </div>
              <span className="font-semibold text-white">{BRAND.name}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {BRAND.tagline}. Building beautiful, performant digital experiences
              that leave a lasting impression.
            </p>
            {BRAND.available && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </div>
            )}
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + socials */}
          <motion.div variants={fadeInUp} className="space-y-5">
            <div>
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
                Get in Touch
              </h3>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                <Mail size={14} />
                {BRAND.email}
              </a>
              <p className="mt-2 text-sm text-white/30">{BRAND.location}</p>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  {iconMap[social.icon]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {BRAND.name}. Crafted with passion.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
            aria-label="Scroll to top"
          >
            Back to top
            <ArrowUp size={12} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}