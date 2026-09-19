"use client";

import { useEffect } from "react";

/** Client redirect that preserves a hash (server redirects drop fragments). */
export function HashRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <p style={{ padding: "2rem", textAlign: "center" }}>
      Taking you there…
    </p>
  );
}
