import Image from "next/image";
import Link from "next/link";
export function QuadrantIcon({
  kind,
  className = "",
}: {
  kind: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      width="40"
      height="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === 0 ? (
        <>
          <path d="M20 12C15 8 9 8 5 10v21c5-2 10-2 15 2 5-4 10-4 15-2V10c-5-2-10-2-15 2v21" />
          <path d="m9 15 7 1m-7 5 7 1m8-6 7-1m-7 7 7-1" />
        </>
      ) : kind === 1 ? (
        <>
          <path d="M20 35V18m0 7-7-6m7 3 7-6M13 35h14" />
          <path d="M13 26C2 25 6 14 11 14 9 3 23 3 25 9c9-2 13 11 6 14-1 6-7 7-11 3-2 3-6 3-7 0Z" />
        </>
      ) : kind === 2 ? (
        <>
          <circle cx="20" cy="9" r="4" />
          <path d="M7 15c9 4 17 4 26 0M20 18v10m0 0-8 9m8-9 8 9m-15-20 3 8m11-8-3 8" />
        </>
      ) : (
        <>
          <path d="M15 21h10l-3 15h-4l-3-15Zm-2-3h14M19 16C8 13 20 5 21 2c-1 7 9 8 2 14" />
          <path d="m12 7-3-2m20 2 3-2M8 13H4m28 0h4" />
        </>
      )}
    </svg>
  );
}
export function Crest({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`crest ${className}`}
      width="92"
      height="108"
      viewBox="0 0 120 140"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <g className="crest-laurel">
        <path
          pathLength="1"
          d="M58 126C15 113 8 79 19 43M35 112c-15 1-19-7-20-15 10 0 17 6 20 15Zm-13-18C9 90 6 81 8 74c10 4 14 12 14 20Zm-7-22C5 65 5 57 9 50c8 7 9 14 6 22Zm2-20c-5-9-2-18 5-22 4 10 2 17-5 22Z"
        />
        <path
          pathLength="1"
          d="M62 126c43-13 50-47 39-83M85 112c15 1 19-7 20-15-10 0-17 6-20 15Zm13-18c13-4 16-13 14-20-10 4-14 12-14 20Zm7-22c10-7 10-15 6-22-8 7-9 14-6 22Zm-2-20c5-9 2-18-5-22-4 10-2 17 5 22Z"
        />
      </g>
      <g className="crest-sun">
        <path d="M45 29a15 15 0 0 1 30 0M60 3v8M46 6l4 8M35 16l7 5M74 6l-4 8M85 16l-7 5" />
        <path d="M50 29a10 10 0 0 1 20 0" />
      </g>
      <path
        className="crest-shield"
        pathLength="1"
        d="M30 32h60v45c0 20-17 33-30 40-13-7-30-20-30-40V32Zm30 0v85M30 71h60"
      />
      <g className="crest-quadrant q0" transform="translate(33 37) scale(.6)">
        <path d="M20 12C15 8 9 8 5 10v21c5-2 10-2 15 2 5-4 10-4 15-2V10c-5-2-10-2-15 2v21M9 15l7 1m8 0 7-1" />
      </g>
      <g className="crest-quadrant q1" transform="translate(63 37) scale(.6)">
        <path d="M20 35V17m0 8-7-6m7 3 7-6M13 35h14M13 26C2 25 6 14 11 14 9 3 23 3 25 9c9-2 13 11 6 14-1 6-7 7-11 3-2 3-6 3-7 0Z" />
      </g>
      <g className="crest-quadrant q2" transform="translate(34 73) scale(.57)">
        <circle cx="20" cy="9" r="4" />
        <path d="M7 15c9 4 17 4 26 0M20 18v10m0 0-8 9m8-9 8 9" />
      </g>
      <g className="crest-quadrant q3" transform="translate(63 73) scale(.57)">
        <path d="M15 21h10l-3 15h-4l-3-15Zm-2-3h14M19 16C8 13 20 5 21 2c-1 7 9 8 2 14" />
      </g>
      <path d="m43 130 17-5 17 5M60 125v10" />
    </svg>
  );
}
export const Spire = Crest;
export function Brand({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      className={`brand ${className}`}
      href="/"
      aria-label="Wellspire School home"
    >
      <Image
        src="/images/wellspire-school-logo.jpg"
        alt="Wellspire School — Inspiring Lifelong Learning"
        width={120}
        height={120}
        className="brand-logo-img"
        unoptimized
        priority
      />
    </Link>
  );
}
