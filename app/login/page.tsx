"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    setLoading(false);
    if (res.ok) {
      router.replace("/");
    } else {
      setError(true);
      setPassword("");
    }
  }

  return (
    <div className="auth-gate">
      <div className="auth-card">
        <div className="auth-icon">🏡</div>
        <div className="auth-titles">
          <h1>B&amp;B Armenes</h1>
          <p>Booking Board</p>
        </div>
        <form onSubmit={submit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="auth-input"
          />
          {error && <p className="auth-error">Password errata</p>}
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "…" : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
