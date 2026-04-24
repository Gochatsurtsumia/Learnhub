const variants = {
  beginner: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  advanced: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  default: "bg-zinc-800 text-zinc-400 border border-zinc-700",
};

export default function Badge({ label, variant = "default" }) {
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${variants[variant] || variants.default}`}
    >
      {label}
    </span>
  );
}
