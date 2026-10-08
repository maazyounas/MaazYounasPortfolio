import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3, GraduationCap } from "lucide-react";

export function CourseShell({ children }: { children: React.ReactNode }) {
  return <div className="relative min-h-screen bg-background pt-24 pb-16"><div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.10),transparent_55%)]"/><main className="container-responsive relative z-10">{children}</main></div>;
}

export function CourseHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="mx-auto mb-12 max-w-3xl text-center"><p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-red-200"><GraduationCap size={16}/>{eyebrow}</p><h1 className="mb-5 text-metallic">{title}</h1><p className="text-lg text-muted-foreground">{description}</p></header>;
}

export function CourseStats({ difficulty, duration, total, progress }: { difficulty: string; duration: string; total: number; progress: number }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat icon={<GraduationCap/>} label="Level" value={difficulty}/><Stat icon={<Clock3/>} label="Duration" value={duration}/><Stat icon={<BookOpen/>} label="Lectures" value={String(total)}/><Stat icon={<BookOpen/>} label="Progress" value={`${progress}%`}/></div>;
}
function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="glass-card p-4"><div className="mb-2 flex items-center gap-2 text-primary">{icon}<span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span></div><p className="font-semibold text-foreground">{value}</p></div>; }

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft size={16}/>{children}</Link>; }

export function ProgressBar({ value, label }: { value: number; label: string }) { return <div aria-label={label}><div className="mb-2 flex justify-between text-sm"><span className="text-muted-foreground">{label}</span><strong>{value}%</strong></div><div className="h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${value}%` }}/></div></div>; }
