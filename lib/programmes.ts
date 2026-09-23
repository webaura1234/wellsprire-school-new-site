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
    body: "Hands-on Farming Experience. Children learn: where food comes from, responsibility and patience, and teamwork and sustainability. Learning truly grows from the soil to the soul.",
  },
  {
    tag: "STEAM",
    title: "STEAM Program",
    image: photos.computerLab,
    body: "Science + Technology + Engineering + Arts + Math. Creative problem-solving from Grade 1 onwards.",
  },
  {
    tag: "VALUES",
    title: "Value Education Program",
    image: photos.earlyYears,
    body: "Ethics, empathy, communication, leadership taught through real-life situations.",
  },
  {
    tag: "VOICE",
    title: "Podcasting & Communication Skills Program",
    image: photos.podcast,
    body: "Through guided use of the dedicated Podcast Studio, students develop articulation, storytelling, listening skills, teamwork, confidence, and responsible digital communication.",
  },
  {
    tag: "EXPERIENTIAL",
    title: "Bagless Days",
    image: photos.classroom,
    body: "Experiential learning through projects, creativity, collaboration, and joyful exploration.",
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
    "Where food comes from — responsibility, patience, teamwork, and sustainability. Learning truly grows from the soil to the soul.",
  "Creative & Sports Excellence":
    "Arts, music, dance, sport, and movement — fitness, teamwork, and expression valued alongside academics.",
  "Dedicated Podcast Studio":
    "Articulation, storytelling, listening, teamwork, and responsible digital communication in a dedicated studio.",
  "Mini Library (Classroom Libraries)":
    "Mini libraries in classrooms through Grade 5 to build reading habits, vocabulary, and confident learners.",
  "STEAM Program":
    "Science + Technology + Engineering + Arts + Math. Creative problem-solving from Grade 1 onwards.",
  "Value Education Program":
    "Ethics, empathy, communication, leadership taught through real-life situations.",
  "Podcasting & Communication Skills Program":
    "Through guided use of the dedicated Podcast Studio, students develop articulation, storytelling, listening skills, teamwork, confidence, and responsible digital communication.",
  "Bagless Days":
    "Project-led days with creativity, collaboration, and joyful exploration beyond regular timetables.",
};

/** Full founder profiles — Management.doc, verbatim. Paragraphs separated by "\n\n". */
export const founderDialogCopy: Record<string, string> = {
  "Mr Chamakura Bhoopal Reddy": [
    "For over two decades, Mr Bhoopal Reddy has been a pillar of higher education, serving as the Vice Chairman of CMR Engineering College — an institution distinguished for its academic rigour and spirit of innovation. In this role, he played a pivotal part in shaping the learning journeys of thousands of aspiring engineers, championing holistic development and industry-ready competencies.",
    "His extensive experience in nurturing young adults revealed a profound insight: the seeds of excellence — curiosity, discipline, and character — are sown much earlier. He realised that a strong school-level foundation is the most decisive force in enabling lifelong success.",
    "Guided by this conviction, Mr. Reddy has embarked on a new mission: to build that foundation with intention and purpose. The establishment of Wellspire is the embodiment of this vision — a school rooted in the wisdom of higher education, yet wholly committed to excellence across the entire schooling spectrum.",
    "At Wellspire, we are committed to fostering not only academic proficiency but also critical thinking, creativity, and character. Our philosophy is to create a warm, stimulating environment where young learners are encouraged to explore, question, imagine, and innovate. We strive to build a community where the leaders, problem-solvers, and inventors of tomorrow take their first confident steps today.",
    "With a legacy of educational leadership and a dynamic, future-focused approach, Mr. Reddy is shaping Wellspire into a beacon of holistic, future-ready, and transformative education.",
  ].join("\n\n"),
  "Ms Shruthi Reddy": [
    "An engineer by qualification, a fitness enthusiast by passion, and an educator by purpose — Shruthi Reddy embodies discipline, balance, and a deep commitment to personal growth.",
    "She lives by a powerful belief: Potential is Limitless. After years of dedicating herself to her family, she channelled her discipline into a remarkable personal transformation. Today, she brings that same strength, clarity, and determination to the field of education. She believes that education must prepare children for the world — not just exams — and that every child carries a unique potential waiting to unfold.",
    "As the Co-Founder of Wellspire, she has envisioned and crafted a learning ecosystem that reflects her philosophy — dynamic, balanced, enriching, and rooted in holistic development. Her mission is to ensure that every child discovers their academic, artistic, and athletic strengths, building a strong foundation for a confident, skilled, and successful life.",
  ].join("\n\n"),
};
