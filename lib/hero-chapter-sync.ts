const CHAPTER_META = [
  {
    name: "Campus",
    word: "grounds",
    note: "A campus where children thrive.",
    detail: "10 acres. Green, safe, and child-friendly.",
  },
  {
    name: "Classrooms",
    word: "learning",
    note: "Smart, sunlit classrooms.",
    detail: "Air-conditioned rooms made for inquiry.",
  },
  {
    name: "Val-Ed Lab",
    word: "values",
    note: "Values, lived — not lectured.",
    detail: "Ethics, empathy, and leadership through real-life situations.",
  },
  {
    name: "Computer Lab",
    word: "innovation",
    note: "Code, create, and think ahead.",
    detail: "AI, robotics, and digital literacy — hands-on.",
  },
] as const;

export function getHeroHeaderHeight() {
  return document.querySelector<HTMLElement>(".header")?.offsetHeight ?? 106;
}

export function heroPinLength(track: HTMLElement) {
  return track.offsetHeight - (window.innerHeight - getHeroHeaderHeight());
}

export function isHeroPinActive(track: HTMLElement | null) {
  if (!track) return false;
  return heroPinLength(track) > 48;
}

/** Imperative chapter paint so scroll updates work on every device. */
export function paintHeroChapter(index: number, root?: ParentNode | null) {
  const scope =
    root ??
    document.querySelector(".hero-scroll-track") ??
    document;
  const chapter = Math.min(3, Math.max(0, index));
  const meta = CHAPTER_META[chapter];

  scope.querySelectorAll<HTMLElement>(".hero-photo-panel").forEach((el, i) => {
    const active = i === chapter;
    el.classList.toggle("is-active", active);
    el.setAttribute("aria-hidden", String(!active));
  });

  scope.querySelectorAll<HTMLElement>(".hero-detail-panel").forEach((el, i) => {
    const active = i === chapter;
    el.classList.toggle("is-active", active);
    el.setAttribute("aria-hidden", String(!active));
  });

  scope.querySelectorAll<HTMLElement>(".pillar-tab").forEach((el, i) => {
    const active = i === chapter;
    el.classList.toggle("is-active", active);
    el.setAttribute("aria-selected", String(active));
    el.tabIndex = active ? 0 : -1;
  });

  const foot = scope.querySelector<HTMLElement>(".arch-footnote");
  if (foot) foot.textContent = `A WINDOW INTO ${meta.name.toUpperCase()}`;

  const num = scope.querySelector<HTMLElement>(".hero-annotation .annotation-number");
  if (num) num.textContent = `0${chapter + 1}`;

  const note = scope.querySelector<HTMLElement>(".hero-annotation p");
  if (note) note.textContent = meta.note;

  const margin = scope.querySelector<HTMLElement>(".hero-marginalia .margin-label");
  if (margin) margin.textContent = `ROOM FOR ${meta.word.toUpperCase()}`;

  const detail = scope.querySelector<HTMLElement>(".hero-marginalia > p");
  if (detail) detail.textContent = meta.detail;

  const trackEl =
    scope instanceof HTMLElement &&
    scope.classList.contains("hero-scroll-track")
      ? scope
      : ((scope as ParentNode).querySelector?.(".hero-scroll-track") ??
        document.querySelector(".hero-scroll-track"));
  trackEl?.setAttribute("data-hero-chapter", String(chapter));
}

export function chapterFromHeroTrack(track: HTMLElement) {
  const pinLength = heroPinLength(track);
  if (pinLength <= 0) return null;

  const headerHeight = getHeroHeaderHeight();
  const scrolled = headerHeight - track.getBoundingClientRect().top;
  if (scrolled < -24) return null;

  const progress = Math.max(0, Math.min(1, scrolled / pinLength));
  return Math.min(3, Math.max(0, Math.floor(progress * 3.999)));
}

export function scrollYForHeroChapter(
  track: HTMLElement,
  chapterIndex: number,
  scrollY: number,
) {
  const headerHeight = getHeroHeaderHeight();
  const pinLength = heroPinLength(track);
  if (pinLength <= 0) return 0;

  const trackTopDoc = track.getBoundingClientRect().top + scrollY;
  const segmentTargets = [0, 0.36, 0.64, 0.88];
  const targetProgress =
    segmentTargets[chapterIndex] ??
    chapterIndex / (CHAPTER_META.length - 1);
  if (chapterIndex === 0) return 0;
  return Math.round(
    trackTopDoc - headerHeight + targetProgress * pinLength,
  );
}
