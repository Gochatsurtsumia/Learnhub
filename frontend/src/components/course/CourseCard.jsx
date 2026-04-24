import { Link } from "react-router-dom";

const gradients = [
  "from-violet-600/30 to-blue-600/10",
  "from-emerald-600/30 to-teal-600/10",
  "from-orange-600/30 to-red-600/10",
  "from-pink-600/30 to-purple-600/10",
];

const levelColor = {
  beginner: {
    bg: "bg-emerald-500/10 border-emerald-500/20",
    text: "text-emerald-400",
    label: "Beginner",
  },
  advanced: {
    bg: "bg-violet-500/10 border-violet-500/20",
    text: "text-violet-400",
    label: "Advanced",
  },
};

export default function CourseCard({ course, index = 0 }) {
  const level = course.capacity > 15 ? "beginner" : "advanced";
  const gradient = gradients[index % gradients.length];
  const lvl = levelColor[level];
  const isFull = course.capacity === 0;

  return (
    <Link to={`/courses/${course.id}`} className="group block h-full">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 h-full flex flex-col">
        <div
          className={`bg-gradient-to-br ${gradient} h-44 flex items-center justify-center relative`}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-3xl">
            📚
          </div>
          {isFull && (
            <div className="absolute top-3 right-3 bg-red-500/20 border border-red-500/30 text-red-400 text-xs px-2 py-1 rounded-full">
              Full
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-semibold text-base leading-snug group-hover:text-violet-400 transition-colors line-clamp-2 flex-1">
              {course.title}
            </h3>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${lvl.bg} ${lvl.text}`}
            >
              {lvl.label}
            </span>
          </div>

          <p className="text-zinc-500 text-sm line-clamp-2 flex-1">
            {course.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${isFull ? "bg-red-400" : "bg-emerald-400"}`}
              />
              <span className="text-zinc-400 text-xs">
                {isFull ? "No seats" : `${course.capacity} seats left`}
              </span>
            </div>
            <span className="text-white font-bold text-lg">
              ${course.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
