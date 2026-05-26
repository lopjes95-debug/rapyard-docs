export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        background: "#08090a",
        color: "#f5f5f5",
      }}
    >
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p
          style={{
            color: "#8b5cf6",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Rapyard Club
        </p>

        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 1,
            margin: "1rem 0",
          }}
        >
          Rapyard Docs
        </h1>

        <p
          style={{
            fontSize: "1.25rem",
            lineHeight: 1.7,
            color: "#c7c7c7",
            maxWidth: "680px",
          }}
        >
          Welcome to the official documentation hub for Rapyard. Guides,
          references, setup notes, and project resources will live here.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          <a
            href="#getting-started"
            style={{
              background: "#8b5cf6",
              color: "white",
              padding: "0.9rem 1.2rem",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Get Started
          </a>

          <a
            href="https://github.com/lopjes95-debug"
            target="_blank"
            rel="noreferrer"
            style={{
              border: "1px solid #333",
              color: "white",
              padding: "0.9rem 1.2rem",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            GitHub
          </a>
        </div>

        <section
          id="getting-started"
          style={{
            marginTop: "5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          <article
            style={{
              border: "1px solid #222",
              borderRadius: "1rem",
              padding: "1.5rem",
              background: "#111",
            }}
          >
            <h2>Setup</h2>
            <p style={{ color: "#aaa", lineHeight: 1.6 }}>
              Install dependencies, run locally, and prepare deployments.
            </p>
          </article>

          <article
            style={{
              border: "1px solid #222",
              borderRadius: "1rem",
              padding: "1.5rem",
              background: "#111",
            }}
          >
            <h2>Guides</h2>
            <p style={{ color: "#aaa", lineHeight: 1.6 }}>
              Step-by-step instructions for using and extending Rapyard.
            </p>
          </article>

          <article
            style={{
              border: "1px solid #222",
              borderRadius: "1rem",
              padding: "1.5rem",
              background: "#111",
            }}
          >
            <h2>Reference</h2>
            <p style={{ color: "#aaa", lineHeight: 1.6 }}>
              Technical notes, API details, commands, and configuration.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
