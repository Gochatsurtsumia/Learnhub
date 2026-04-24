const variants = {
  primary: "bg-violet-600 hover:bg-violet-500 text-white",
  secondary: "bg-zinc-800 hover:bg-zinc-700 text-white",
  danger: "bg-red-600 hover:bg-red-500 text-white",
  ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
