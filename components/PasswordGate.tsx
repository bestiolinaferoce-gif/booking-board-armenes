"use client";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  // Auth is handled by middleware + /login page. This component just renders children.
  return <>{children}</>;
}
