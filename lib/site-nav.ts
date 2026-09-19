import {
  BookOpen,
  Briefcase,
  ClipboardList,
  FileText,
  Home,
  Phone,
  type LucideIcon,
} from "lucide-react";

export type SiteNavChild = {
  label: string;
  href: string;
};

export type SiteNavItem = {
  label: string;
  href: string;
  hashId?: string;
  children?: readonly SiteNavChild[];
  Icon: LucideIcon;
};

/**
 * Shared IA for desktop dock + mobile hamburger.
 * Home · About Us ▾ · Academics ▾ · Admissions · Careers · Contact ▾
 */
export const siteNavItems: readonly SiteNavItem[] = [
  {
    label: "Home",
    href: "/",
    hashId: "main",
    Icon: Home,
  },
  {
    label: "About Us",
    href: "/about",
    Icon: FileText,
    children: [
      { label: "About Wellspire", href: "/about#about" },
      { label: "Management & Leadership", href: "/leadership" },
      { label: "Principal’s Message", href: "/leadership#leadership" },
    ],
  },
  {
    label: "Academics",
    href: "/#academics",
    hashId: "academics",
    Icon: BookOpen,
    children: [
      { label: "Curriculum", href: "/#academics" },
      { label: "Campus & Facilities", href: "/campus-life#campus" },
      { label: "Campus Life", href: "/campus-life#campus-life" },
      { label: "Learning Beyond", href: "/learning-beyond" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    Icon: ClipboardList,
  },
  {
    label: "Careers",
    href: "/careers",
    Icon: Briefcase,
  },
  {
    label: "Contact",
    href: "/#contact",
    hashId: "contact",
    Icon: Phone,
    children: [
      { label: "Public Disclosure", href: "/mandatory-public-disclosure" },
    ],
  },
];

export const desktopNavItems = siteNavItems;

export type DesktopNavChild = SiteNavChild;
export type DesktopNavItem = SiteNavItem;
