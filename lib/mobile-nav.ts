import {
  Building2,
  ClipboardList,
  FileText,
  GraduationCap,
  Home,
  Phone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export type MobileNavItem = {
  label: string;
  href: string;
  /** Home scroll-spy id when the item points at a home section */
  sectionId?: string;
  Icon: LucideIcon;
};

/** Shared mobile hamburger IA — keep in sync across home + sub-pages. */
export const mobileNavItems: MobileNavItem[] = [
  { label: "Home", href: "/", sectionId: "main", Icon: Home },
  { label: "About", href: "/about", Icon: FileText },
  {
    label: "Management & Leadership",
    href: "/leadership",
    Icon: Users,
  },
  { label: "Campus Life", href: "/campus-life", Icon: Building2 },
  {
    label: "Curriculum",
    href: "/#academics",
    sectionId: "academics",
    Icon: GraduationCap,
  },
  {
    label: "Learning Beyond",
    href: "/#learning-beyond",
    sectionId: "learning-beyond",
    Icon: Sparkles,
  },
  { label: "Admissions", href: "/admissions", Icon: ClipboardList },
  { label: "Contact", href: "/#contact", sectionId: "contact", Icon: Phone },
];
