"use client";

import { useMemo, useState } from "react";
import type { CourseSlug } from "../types";

const defaults: Record<CourseSlug, { html: string; css: string; js: string }> = {
  html: { html: '<h1>Hello World</h1>\n<p>This is my first webpage.</p>', css: "", js: "" },
  css: { html: '<article class="card"><h2>Style this card</h2><p>Try changing its layout, colors and spacing.</p></article>', css: ".card {\n  padding: 1.5rem;\n  border-radius: 1rem;\n  background: #f1f5f9;\n  color: #0f172a;\n}", js: "" },
  javascript: { html: '<h2 id="message">Hello!</h2>\n<button id="change">Change message</button>', css: "body { font-family: sans-serif; padding: 1rem; }\nbutton { padding: .6rem 1rem; }", js: 'document.querySelector("#change").addEventListener("click", () => {\n  document.querySelector("#message").textContent = "JavaScript is working!";\n});' },
};

export default function PracticeEditor({ course }: { course: CourseSlug }) {
  const [code, setCode] = useState(defaults[course]);
  const [revision, setRevision] = useState(0);
  const documentContent = useMemo(() => {
    const csp = course === "javascript" ? "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:;" : "default-src 'none'; style-src 'unsafe-inline'; img-src data: blob:;";
    const script = course === "javascript" ? `<script>${code.js.replace(/<\/script/gi, "<\\/script")}</script>` : "";
    return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${csp}"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font:16px system-ui,sans-serif;padding:1rem;color:#111827}${code.css}</style></head><body>${code.html}${script}</body></html>`;
  }, [code, course]);
  const setField = (field: "html" | "css" | "js", value: string) => { setCode((current) => ({ ...current, [field]: value })); setRevision((r) => r + 1); };
  const fields = course === "html" ? ["html"] : course === "css" ? ["html", "css"] : ["html", "css", "js"];
  return <section className="glass-card p-5" aria-labelledby="practice-heading"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h3 id="practice-heading" className="text-xl">Practice Playground</h3><p className="text-sm text-muted-foreground">Edit the code and preview it in a sandboxed frame.</p></div><div className="flex gap-2"><button type="button" onClick={() => setCode(defaults[course])} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">Reset</button><button type="button" onClick={() => setRevision((r) => r + 1)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Run preview</button></div></div><div className="grid gap-4 lg:grid-cols-2"> <div className="space-y-3">{fields.map((field) => <label key={field} className="block"><span className="mb-1 block text-sm font-medium capitalize">{field} editor</span><textarea aria-label={`${field} code editor`} spellCheck={false} value={code[field as keyof typeof code]} onChange={(e) => setField(field as keyof typeof code, e.target.value)} className="min-h-36 w-full resize-y rounded-xl border border-border bg-black/40 p-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none"/></label>)}</div><div><p className="mb-1 text-sm font-medium">Live preview</p><iframe key={revision} title={`${course} live code preview`} sandbox={course === "javascript" ? "allow-scripts" : ""} referrerPolicy="no-referrer" srcDoc={documentContent} className="min-h-64 w-full rounded-xl border border-border bg-white"/></div></div></section>;
}
