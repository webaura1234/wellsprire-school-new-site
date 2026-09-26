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
 * Home · About Wellspire · Our Team - Management - Leadership · Academics ·
 * Campus & Facilities · Learning Beyond Classrooms · Admissions · Contact Us.
 * Our Team and Academics expose dropdown children. (Careers still exists and
 * is linked from the footer; Public Disclosure lives under Academics.)
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
    href: "/about",
    Icon: Info,
  },
  {
    label: "Our Team – Management – Leadership",
    shortLabel: "Our Team",
    href: "/leadership",
    Icon: Users,
    children: [
      {
        label: "Management",
        href: "/leadership#team",
      },
      {
        label: "Leadership",
        href: "/leadership#leadership",
      },
    ],
  },
  {
    label: "Academics – Curriculum – Public Disclosure",
    shortLabel: "Academics",
    href: "/curriculum",
    Icon: BookOpen,
    children: [
      {
        label: "Curriculum",
        href: "/curriculum",
      },
      {
        label: "Public Disclosure",
        href: "/mandatory-public-disclosure",
      },
    ],
  },
  {
    label: "Campus & Facilities",
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
  },
];

export const desktopNavItems = siteNavItems;

export type DesktopNavChild = SiteNavChild;
export type DesktopNavItem = SiteNavItem;
