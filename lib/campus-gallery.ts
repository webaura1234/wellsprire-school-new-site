export type CampusGalleryFilter = "all" | "exterior" | "sports" | "labs" | "indoor";

export type CampusGalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<CampusGalleryFilter, "all">;
  /** Taller tile for portrait photography. */
  portrait?: boolean;
};

export const campusGalleryFilters: {
  id: CampusGalleryFilter;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Exterior" },
  { id: "sports", label: "Sports" },
  { id: "labs", label: "Labs" },
  { id: "indoor", label: "Indoor" },
];

/** Curated campus photography for the Campus & Facilities gallery. */
export const campusGalleryItems: readonly CampusGalleryItem[] = [
  {
    id: "campus-playground",
    src: "/images/campus-playground.avif",
    alt: "Wellspire School main building with playground and outdoor sports court",
    caption: "Main building, playground & courts",
    category: "exterior",
  },
  {
    id: "playground-campus",
    src: "/images/playground-campus.avif",
    alt: "Colourful outdoor playground and climbing frames beside the school building",
    caption: "Outdoor playground",
    category: "exterior",
  },
  {
    id: "sports-basketball",
    src: "/images/sports-basketball.avif",
    alt: "Outdoor blue and red basketball court with the school building beyond the fence",
    caption: "Basketball court",
    category: "sports",
  },
  {
    id: "sports-track-field",
    src: "/images/sports-track-field.avif",
    alt: "Red running track and green sports field in front of the school building",
    caption: "Athletics field & track",
    category: "sports",
  },
  {
    id: "sports-track-lanes",
    src: "/images/sports-track-lanes.avif",
    alt: "Eight-lane synthetic running track starting line around a grass field",
    caption: "200m running track",
    category: "sports",
  },
  {
    id: "robotics-lab",
    src: "/images/robotics-lab.avif",
    alt: "AI and Robotics Lab with white workstations and a central bot-testing track",
    caption: "AI & Robotics Lab",
    category: "labs",
  },
  {
    id: "robotics-workstations",
    src: "/images/robotics-workstations.avif",
    alt: "Educational robots displayed on worktables in the robotics lab",
    caption: "Robotics workstations",
    category: "labs",
  },
  {
    id: "value-education-lab",
    src: "/images/value-education-lab.avif",
    alt: "Value Education Lab with interactive balance scales and empathy wall displays",
    caption: "Value Education Lab",
    category: "labs",
  },
  {
    id: "robotics-spidy",
    src: "/images/robotics-spidy.avif",
    alt: "Red hexapod robot named SPIDY with ultrasonic sensors in the robotics lab",
    caption: "Student robotics project",
    category: "labs",
  },
  {
    id: "robotics-zoop",
    src: "/images/robotics-zoop.avif",
    alt: "3D-printed bipedal robot named ZOOP with sensor eyes on a lab table",
    caption: "Hands-on robotics build",
    category: "labs",
    portrait: true,
  },
  {
    id: "robotics-rover",
    src: "/images/robotics-rover.avif",
    alt: "Small wheeled educational robot with sensors on a white lab table",
    caption: "STEM rover project",
    category: "labs",
    portrait: true,
  },
  {
    id: "biophilic-atrium",
    src: "/images/biophilic-atrium.avif",
    alt: "Four-story school atrium with floor-to-ceiling vertical gardens under a glass skylight",
    caption: "Biophilic atrium",
    category: "indoor",
  },
  {
    id: "atrium-courtyard",
    src: "/images/atrium-courtyard.avif",
    alt: "Central indoor courtyard with hanging vines, planters, and wooden benches",
    caption: "Indoor courtyard",
    category: "indoor",
  },
] as const;
