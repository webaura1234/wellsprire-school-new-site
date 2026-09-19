import { siteNavItems, type SiteNavItem } from "@/lib/site-nav";
import type { LucideIcon } from "lucide-react";

export type MobileNavItem = {
  label: string;
  href: string;
  sectionId?: string;
  Icon: LucideIcon;
  children?: SiteNavItem["children"];
};

/** Same IA as desktop — includes dropdown children for hamburger accordions. */
export const mobileNavItems: MobileNavItem[] = siteNavItems.map((item) => ({
  label: item.label,
  href: item.href,
  sectionId: item.hashId,
  Icon: item.Icon,
  children: item.children,
}));
