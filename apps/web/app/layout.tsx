import React from "react";
// @ts-ignore: CSS module declaration missing in this project
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RapYard",
  description: "Cinematic industrial yard for cyphers, battles, and mixtapes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return React.createElement(
    "html",
    { lang: "en" },
    React.createElement(
      "body",
      { className: "bg-yard-coal text-slate-100" },
      React.createElement(
        "div",
        { className: "min-h-screen flex flex-col" },
        React.createElement(
          "header",
          { className: "border-b border-slate-800 px-6 py-4 flex items-center justify-between" },
          React.createElement(
            "span",
            { className: "text-xl font-semibold tracking-[0.25em] uppercase text-yard-neon" },
            "RapYard"
          ),
          React.createElement(
            "nav",
            { className: "flex gap-4 text-sm text-slate-300" },
            React.createElement(
              "a",
              { href: "/yardgate", className: "hover:text-yard-ember" },
              "YardGate"
            )
          )
        ),
        React.createElement("main", { className: "flex-1" }, children),
        React.createElement(
          "footer",
          { className: "border-t border-slate-800 px-6 py-4 text-xs text-slate-500" },
          `© ${new Date().getFullYear()} RapYard.`
        )
      )
    )
  );
}

