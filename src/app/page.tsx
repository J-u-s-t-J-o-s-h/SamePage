import { buildHealthCheck } from "@/lib/health";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const health = buildHealthCheck({
    version: process.env.npm_package_version ?? "0.1.0",
  });

  return (
    <div className="page-shell">
      <main className="hero">
        <p className="eyebrow">Household coordination</p>
        <h1 className="brand">SamePage</h1>
        <p className="lede">
          A local-first place for your family to capture what matters and stay
          aligned — without organizing everything up front.
        </p>

        <section className="status-panel" aria-label="Application status">
          <h2>Status</h2>
          <p className="status-line">
            <span className="status-dot" aria-hidden="true" />
            {health.status === "ok"
              ? "Application shell is running"
              : "Application needs attention"}
          </p>
          <ul>
            {health.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="meta">
            Health details:{" "}
            <a href="/api/health">
              <code>/api/health</code>
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
