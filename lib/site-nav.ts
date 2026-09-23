import {
  BookOpen,
  Building2,
  ClipboardList,
  Compass,
  Home,
  Info,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";

export type SiteNavChild = {
  label: string;
  href: string;
};

export type SiteNavItem = {
  label: string;
  /** Compact label for the desktop dock at mid widths. */
  shortLabel?: string;
  href: string;
  hashId?: string;
  children?: readonly SiteNavChild[];
  Icon: LucideIcon;
};

/**
 * Primary navigation — WIS Web Layout & Content.doc, verbatim order:
 * Home · About Wellspire · Our Team - Management - Leadership · Curriculum ·
 * Campus & Facilities · Learning Beyond Classrooms · Admissions · Contact Us.
 * Flat, no dropdowns, matching the doc exactly. (Careers and Public
 * Disclosure aren't doc nav items — both pages still exist and are linked
 * from the footer; Public Disclosure itself is untouched.)
 */
export const siteNavItems: readonly SiteNavItem[] = [
  {
    label: "Home",
    href: "/",
    hashId: "main",
    Icon: Home,
  },
  {
    label: "About Wellspire",
    shortLabel: "About",
    href: "/about",
    Icon: Info,
  },
  {
    label: "Our Team – Management – Leadership",
    shortLabel: "Our Team",
    href: "/leadership",
    Icon: Users,
  },
  {
    label: "Curriculum",
    href: "/curriculum",
    Icon: BookOpen,
  },
  {
    label: "Campus & Facilities",
    shortLabel: "Campus",
    href: "/campus-life#campus",
    Icon: Building2,
  },
  {
    label: "Learning Beyond Classrooms",
    shortLabel: "Learning Beyond",
    href: "/learning-beyond",
    Icon: Compass,
  },
  {
    label: "Admissions",
    href: "/admissions",
    Icon: ClipboardList,
  },
  {
    label: "Contact Us",
    shortLabel: "Contact",
    href: "/#contact",
    hashId: "contact",
    Icon: Phone,
    children: [
      {
        label: "Public Disclosure",
        href: "/mandatory-public-disclosure",
      },
    ],
  },
];

export const desktopNavItems = siteNavItems;

export type DesktopNavChild = SiteNavChild;
export type DesktopNavItem = SiteNavItem;
