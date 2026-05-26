import Link from "next/link";
import React from "react";

export default function HomePage(): JSX.Element {
  return (
    <main className="p-8 space-y-8">
      <section className="max-w-3xl space-y-3">
        <h1 className="text-5xl font-bold">RapYard</h1>
        <p className="text-slate-300 text-lg">
          The creator arena. Battles, cyphers, mixtapes, and the people who build and back the sound.
          This is the official documentation hub for the RapYard ecosystem.
        </p>
      </section>

      <section className="flex gap-4">
        <Link
          href="/yardgate"
          className="px-6 py-3 rounded-full bg-purple-600 text-white"
        >
          Enter the Gate
        </Link>

        <Link
          href="https://github.com/lopjes95-debug/rapyard-s1js"
          className="px-6 py-3 rounded-full border border-white text-white"
        >
          GitHub
        </Link>
      </section>
    </main>
  );
}
