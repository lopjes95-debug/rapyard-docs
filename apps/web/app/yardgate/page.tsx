"use client";

import { Gate } from "./Gate";
import { useGatePhase } from "./useGatePhase";

export default function YardGatePage() {
  const sessionId = "demo-session"; // replace with real session
  const phase = useGatePhase(sessionId);

  return (
    <section className="p-8 space-y-6">
      <Gate phase={phase} />

      <div className="text-center space-y-3">
        <p className="text-slate-400 text-sm">Current Phase: {phase}</p>

        <div className="flex justify-center gap-3">
          <PhaseButton sessionId={sessionId} phase="cypher" label="Open Gate" />
          <PhaseButton sessionId={sessionId} phase="battle" label="Battle Mode" />
          <PhaseButton sessionId={sessionId} phase="closed" label="Close Gate" />
        </div>
      </div>
    </section>
  );
}

function PhaseButton({ sessionId, phase, label }) {
  return (
    <button
      onClick={async () => {
        await fetch(`/api/sessions/${sessionId}/phase`, {
          method: "POST",
          body: JSON.stringify({ phase }),
          headers: { "Content-Type": "application/json" }
        });
      }}
      className="px-4 py-2 rounded-full border border-slate-700 text-xs hover:border-yard-neon hover:text-yard-neon transition"
    >
      {label}
    </button>
  );
}

