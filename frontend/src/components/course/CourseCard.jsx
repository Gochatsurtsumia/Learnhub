import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

export default function CourseCard({ course }) {
  const level = course.capacity > 20 ? "beginner" : "advanced";

  return (
    <Link to={`/courses/${course.id}`} className="group block">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-200 hover:shadow-lg hover:shadow-black/20">
        <div className="bg-gradient-to-br from-violet-600/20 to-zinc-900 h-40 flex items-center justify-center">
          <span className="text-4xl">📚</span>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-medium text-sm leading-snug group-hover:text-violet-400 transition-colors line-clamp-2">
              {course.title}
            </h3>
            <Badge label={level} variant={level} />
          </div>
          <p className="text-zinc-500 text-xs line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-zinc-400 text-xs">
              {course.capacity} spots
            </span>
            <span className="text-white font-semibold text-sm">
              ${course.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
