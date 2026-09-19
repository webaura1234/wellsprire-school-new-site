"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { siteNavItems } from "@/lib/site-nav";

type MobileMenuNavProps = {
  activeSection?: string;
  onNavigate?: () => void;
  onHashClick?: (id: string) => void;
};

function pathOnly(href: string) {
  return href.split("#")[0] || "/";
}

function hashOnly(href: string) {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : "";
}

export function MobileMenuNav({
  activeSection,
  onNavigate,
  onHashClick,
}: MobileMenuNavProps) {
  const pathname = usePathname();
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <nav className="mobile-menu-nav" aria-label="Mobile navigation">
      {siteNavItems.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const path = pathOnly(item.href);
        const isParentActive =
          item.label === "Home"
            ? pathname === "/" &&
              (!activeSection || activeSection === "main")
            : path === "/"
              ? Boolean(item.hashId && activeSection === item.hashId)
              : pathname === path ||
                pathname.startsWith(`${path}/`) ||
                Boolean(
                  item.children?.some((c) => {
                    const cp = pathOnly(c.href);
                    return cp !== "/" && pathname.startsWith(cp);
                  }),
                );

        if (!hasChildren) {
          const isHome = item.href === "/";
          const isHashOnHome =
            item.href.startsWith("/#") || item.href.startsWith("#");

          if (isHome || (isHashOnHome && pathname === "/")) {
            const hashId =
              item.hashId === "main"
                ? "main"
                : hashOnly(item.href) || item.hashId || "";
            return (
              <a
                key={item.label}
                href={isHome ? "#main" : `#${hashId}`}
                className={`mobile-menu-link${isParentActive ? " is-active" : ""}`}
                aria-current={isParentActive ? "page" : undefined}
                onClick={() => {
                  if (isHome || hashId === "main") {
                    onHashClick?.("main");
                    const lenis = (
                      window as Window & { lenis?: { scrollTo?: Function } }
                    ).lenis;
                    if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 0.85 });
                    else window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (hashId) {
                    onHashClick?.(hashId);
                  }
                  onNavigate?.();
                }}
              >
                <span className="mobile-menu-link-icon" aria-hidden="true">
                  <item.Icon size={20} strokeWidth={1.5} />
                </span>
                <span className="mobile-menu-link-label">{item.label}</span>
                <ChevronRight
                  className="mobile-menu-link-chevron"
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`mobile-menu-link${isParentActive ? " is-active" : ""}`}
              aria-current={isParentActive ? "page" : undefined}
              onClick={() => onNavigate?.()}
            >
              <span className="mobile-menu-link-icon" aria-hidden="true">
                <item.Icon size={20} strokeWidth={1.5} />
              </span>
              <span className="mobile-menu-link-label">{item.label}</span>
              <ChevronRight
                className="mobile-menu-link-chevron"
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </Link>
          );
        }

        const expanded = openLabel === item.label;

        return (
          <div
            key={item.label}
            className={`mobile-menu-group${expanded ? " is-open" : ""}${isParentActive ? " is-active" : ""}`}
          >
            <button
              type="button"
              className={`mobile-menu-link mobile-menu-link--toggle${isParentActive ? " is-active" : ""}`}
              aria-expanded={expanded}
              onClick={() =>
                setOpenLabel((prev) => (prev === item.label ? null : item.label))
              }
            >
              <span className="mobile-menu-link-icon" aria-hidden="true">
                <item.Icon size={20} strokeWidth={1.5} />
              </span>
              <span className="mobile-menu-link-label">{item.label}</span>
              <ChevronDown
                className="mobile-menu-link-chevron mobile-menu-link-chevron--dropdown"
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
            {expanded && (
              <div className="mobile-menu-submenu" role="group">
                {item.children!.map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    className="mobile-menu-sublink"
                    onClick={() => {
                      if (
                        pathname === "/" &&
                        (child.href.startsWith("/#") ||
                          child.href.startsWith("#"))
                      ) {
                        const id = hashOnly(child.href);
                        if (id) onHashClick?.(id);
                      }
                      onNavigate?.();
                    }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
