import { photos } from "@/lib/content";

/** Home §3 — titles only (WIS layout / handoff). */
export const homeLearningHighlights = [
  {
    title: "Value Education Lab",
    badge: "VALUES",
    image: photos.earlyYears,
    tag: "Lived, not lectured",
  },
  {
    title: "Biophilic Learning Spaces",
    badge: "CAMPUS",
    image: photos.building,
    tag: "Green by design",
  },
  {
    title: "AI & Robotics Lab",
    badge: "INNOVATION",
    image: photos.computerLab,
    tag: "Hands-on tech",
  },
  {
    title: "STEM & Experiential Learning",
    badge: "STEAM",
    image: photos.science,
    tag: "Grade 1 onwards",
  },
  {
    title: "Life Skills Farming Program",
    badge: "LIFE SKILLS",
    image: photos.farming,
    tag: "Soil to soul",
  },
  {
    title: "Creative & Sports Excellence",
    badge: "ARTS & SPORT",
    image: photos.storytellers,
    tag: "Whole child",
  },
  {
    title: "Dedicated Podcast Studio",
    badge: "VOICE",
    image: photos.podcast,
    tag: "Student voice",
  },
  {
    title: "Mini Library (Classroom Libraries)",
    badge: "READING",
    image: photos.classroom,
    tag: "Till Grade 5",
  },
] as const;

/** Learning Beyond — full copy for inner section (photo-aligned where possible). */
export const learningBeyondPrograms = [
  {
    tag: "LIFE SKILLS",
    title: "Life Skills Farming Program",
    image: photos.farming,
    body: "Hands-on farming: where food comes from, responsibility, patience, teamwork, and sustainability — learning from soil to soul.",
  },
  {
    tag: "STEAM",
    title: "STEAM Program",
    image: photos.computerLab,
    body: "Science, technology, engineering, arts, and math together — creative problem-solving from Grade 1 onwards.",
  },
  {
    tag: "VALUES",
    title: "Value Education Program",
    image: photos.earlyYears,
    body: "Ethics, empathy, communication, and leadership — taught through real-life situations, not lectures.",
  },
  {
    tag: "VOICE",
    title: "Podcasting & Communication Skills",
    image: photos.podcast,
    body: "In our podcast studio: articulation, storytelling, listening, teamwork, confidence, and responsible digital communication.",
  },
  {
    tag: "EXPERIENTIAL",
    title: "Bagless Days",
    image: photos.classroom,
    body: "Experiential learning through projects, creativity, collaboration, and joyful exploration — beyond the textbook.",
  },
  {
    tag: "CAMPUS",
    title: "Biophilic Learning Spaces",
    image: photos.building,
    body: "Green corridors, plant-filled rooms, open-air classrooms, and outdoor exploration — nature part of everyday learning.",
  },
  {
    tag: "INNOVATION",
    title: "AI & Robotics Lab",
    image: photos.computerLab,
    body: "Coding, robotics, and digital literacy — inquiry and innovation with hands-on tools.",
  },
  {
    tag: "READING",
    title: "Mini Library (Classroom Libraries)",
    image: photos.library,
    body: "Classroom mini libraries through Grade 5 — strong reading habits, language, and a love of books.",
  },
] as const;

export const programmeDialogCopy: Record<string, string> = {
  "Value Education Lab":
    "Ethics, empathy, communication, and leadership — taught through real-life situations in our Value Education Lab.",
  "Biophilic Learning Spaces":
    "Green corridors, plant-filled rooms, open-air classrooms, and outdoor exploration woven into daily learning.",
  "AI & Robotics Lab":
    "Hands-on coding, robotics, and digital literacy — creative problem-solving from the primary years.",
  "STEM & Experiential Learning":
    "Integrated science, technology, engineering, arts, and math through inquiry and experiential projects.",
  "Life Skills Farming Program":
    "Where food comes from — responsibility, patience, teamwork, and sustainability. Learning grows from soil to soul.",
  "Creative & Sports Excellence":
    "Arts, music, dance, sport, and movement — fitness, teamwork, and expression valued alongside academics.",
  "Dedicated Podcast Studio":
    "Articulation, storytelling, listening, teamwork, and responsible digital communication in a dedicated studio.",
  "Mini Library (Classroom Libraries)":
    "Mini libraries in classrooms through Grade 5 to build reading habits, vocabulary, and confident learners.",
  "STEAM Program":
    "Science, technology, engineering, arts, and math together — creative problem-solving from Grade 1 onwards.",
  "Value Education Program":
    "Ethics, empathy, communication, and leadership through real-life situations, not lectures alone.",
  "Podcasting & Communication Skills":
    "Guided use of the podcast studio for voice, storytelling, listening, teamwork, and digital responsibility.",
  "Bagless Days":
    "Project-led days with creativity, collaboration, and joyful exploration beyond regular timetables.",
};

export const founderDialogCopy: Record<string, string> = {
  "Mr Chamakura Bhoopal Reddy":
    "For over two decades, Mr Bhoopal Reddy has served as Vice Chairman of CMR Engineering College. He co-founded Wellspire to build strong school-level foundations in curiosity, discipline, and character — a campus rooted in higher-education wisdom and whole-child excellence.",
  "Ms Shruthi Reddy":
    "An engineer by qualification and educator by purpose, Ms Shruthi Reddy co-founded Wellspire with the belief that potential is limitless. She champions a dynamic, balanced ecosystem where every child discovers academic, artistic, and athletic strengths.",
};
