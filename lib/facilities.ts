import { photos } from "@/lib/content";

/** Campus & Facilities (inner page) — WIS Web Layout & Content.doc, verbatim. */
export const facilitiesHeader = "Infrastructure That Supports Learning";

export const campusFacilities = [
  {
    name: "Academic Spaces",
    items: [
      "Smart Classrooms",
      "Mini Libraries in Classrooms (till Grade 5)",
      "Regular Library",
      "Computer Lab",
      "Math Lab",
      "Composite Science Lab",
    ],
    image: photos.classroom,
  },
  {
    name: "Specialised Labs",
    items: [
      "AI & Robotics Lab – coding and innovation",
      "Value Education Lab – ethics, empathy, leadership",
    ],
    image: photos.computerLab,
  },
  {
    name: "Creative Spaces",
    items: [
      "Art Studio",
      "Music Room",
      "Dance Studio",
      "Dedicated Podcast Studio for communication, storytelling, and digital expression",
    ],
    image: photos.storytellers,
  },
  {
    name: "Sports Facilities",
    items: [
      "Football",
      "Basketball",
      "Skating",
      "Martial Arts",
      "Indoor Games",
      "An Olympic-standard 200-metre running track",
      "Athletics Field",
    ],
    image: photos.building,
  },
  {
    name: "Biophilic Campus",
    items: [
      "Green corridors",
      "Plant-filled rooms",
      "Open-air classrooms",
      "Outdoor exploration",
    ],
    image: photos.earlyYears,
  },
] as const;
