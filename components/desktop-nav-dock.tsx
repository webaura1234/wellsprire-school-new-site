"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { siteNavItems } from "@/lib/site-nav";

type DesktopNavDockProps = {
  activeSection?: string;
  onHashClick?: (id: string) => void;
};

function pathOnly(href: string) {
  return href.split("#")[0] || "/";
}

function hashOnly(href: string) {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : "";
}

function isRouteActive(pathname: string, href: string) {
  const path = pathOnly(href);
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function childIsActive(pathname: string, href: string) {
  if (typeof window === "undefined") {
    return isRouteActive(pathname, href) && !hashOnly(href);
  }
  if (!isRouteActive(pathname, href) && pathOnly(href) !== "/") return false;
  const want = hashOnly(href);
  if (pathOnly(href) === "/") {
    return want
      ? window.location.hash.replace(/^#/, "") === want
      : pathname === "/" && !window.location.hash;
  }
  if (!want) return pathname === pathOnly(href) && !window.location.hash;
  return (
    pathname === pathOnly(href) &&
    window.location.hash.replace(/^#/, "") === want
  );
}

function parentIsActive(
  pathname: string,
  activeSection: string | undefined,
  item: (typeof siteNavItems)[number],
) {
  if (item.label === "Home") {
    return pathname === "/" && (!activeSection || activeSection === "main");
  }
  if (item.hashId && activeSection === item.hashId) return true;
  if (item.href === "/admissions" || item.href === "/careers") {
    return pathname === item.href;
  }
  if (isRouteActive(pathname, item.href) && pathOnly(item.href) !== "/") {
    return true;
  }
  return Boolean(
    item.children?.some((child) => {
      const p = pathOnly(child.href);
      return p !== "/" && isRouteActive(pathname, child.href);
    }),
  );
}

export function DesktopNavDock({
  activeSection,
  onHashClick,
}: DesktopNavDockProps) {
  const pathname = usePathname();

  return (
    <nav className="header-nav-dock" aria-label="Main navigation">
      {siteNavItems.map((item) => {
        const active = parentIsActive(pathname, activeSection, item);
        const hasChildren = Boolean(item.children?.length);
        const parentHref =
          item.hashId && pathname === "/" && item.hashId !== "main"
            ? `#${item.hashId}`
            : item.href === "/"
              ? "/"
              : item.href;

        const parentLink = (
          <Link
            href={parentHref}
            className={`nav-dock-link${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
            aria-haspopup={hasChildren ? "menu" : undefined}
            onClick={() => {
              if (item.hashId === "main" && pathname === "/") {
                onHashClick?.("main");
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else if (item.hashId && pathname === "/") {
                onHashClick?.(item.hashId);
              }
            }}
          >
            <span>{item.label}</span>
            {hasChildren && (
              <ChevronDown
                className="nav-dock-chevron"
                size={12}
                strokeWidth={2.2}
                aria-hidden="true"
              />
            )}
          </Link>
        );

        if (!hasChildren) {
          return (
            <div key={item.label} className="nav-dock-item">
              {parentLink}
            </div>
          );
        }

        return (
          <div key={item.label} className="nav-dock-item has-dropdown">
            {parentLink}
            <div className="nav-dock-dropdown" role="menu">
              {item.children!.map((child) => {
                const childActive = childIsActive(pathname, child.href);
                return (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    className={`nav-dock-dropdown-link${childActive ? " is-active" : ""}`}
                    role="menuitem"
                    aria-current={childActive ? "page" : undefined}
                    onClick={() => {
                      if (
                        child.href.startsWith("/#") ||
                        (child.href.startsWith("#") && pathname === "/")
                      ) {
                        const id = hashOnly(child.href);
                        if (id) onHashClick?.(id);
                      }
                    }}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
