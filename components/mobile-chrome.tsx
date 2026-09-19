"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { DesktopNavDock } from "@/components/desktop-nav-dock";
import { MobileMenuNav } from "@/components/mobile-menu-nav";
import { school } from "@/lib/school";

type MobileChromeProps = {
  children: ReactNode;
  /**
   * When set, desktop visitors are redirected (used when a dedicated
   * desktop route already exists, e.g. public disclosure).
   */
  desktopRedirect?: string;
  /** Highlight Admissions pill when on /admissions */
  admissionsActive?: boolean;
  activeMatch?: string;
};

export function MobileChrome({
  children,
  desktopRedirect,
  admissionsActive = false,
}: MobileChromeProps) {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    if (!desktopRedirect) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const bounce = () => {
      if (desktop.matches) window.location.replace(desktopRedirect);
    };
    bounce();
    desktop.addEventListener("change", bounce);
    return () => desktop.removeEventListener("change", bounce);
  }, [desktopRedirect]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <div className="mobile-subpage">
      <header
        className={`header admissions-mobile-header ${menu ? "is-menu-open" : ""}`}
      >
        <div className="header-brand-group">
          <Brand />
        </div>
        <DesktopNavDock />
        <Link className="button nav-apply" href="/admissions">
          <span>Explore Admissions</span>
          <ArrowUpRight size={15} className="nav-apply-arrow" />
        </Link>
        <Link
          className={`mobile-admissions-btn${admissionsActive ? " is-active" : ""}`}
          href="/admissions"
          aria-current={admissionsActive ? "page" : undefined}
          onClick={() => setMenu(false)}
        >
          Admissions
          <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="mobile-subpage-navigation"
          aria-label={menu ? "Close menu" : "Open menu"}
        >
          {menu ? (
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-subpage-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <MobileMenuNav
              onNavigate={() => setMenu(false)}
            />
            <div className="mobile-menu-ctas">
              <Link
                className="mobile-menu-cta mobile-menu-cta--primary"
                href="/admissions"
                onClick={() => setMenu(false)}
              >
                Apply for Admissions
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link
                className="mobile-menu-cta mobile-menu-cta--secondary"
                href="/#admissions"
                onClick={() => setMenu(false)}
              >
                Book a Campus Visit
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
            {(school.city || school.phone) && (
              <div className="mobile-menu-contact">
                {school.city && (
                  <p>
                    <MapPin size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span>{school.city}</span>
                  </p>
                )}
                {school.phone && (
                  <a href={`tel:${school.phone.replace(/\s/g, "")}`}>
                    <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span>{school.phone}</span>
                  </a>
                )}
              </div>
            )}
            <p className="mobile-menu-tagline">LEARN · GROW · BELONG</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main" className="mobile-subpage-main">
        {children}
      </main>
    </div>
  );
}
