import { useState, useEffect } from "react";
import api from "../../services/api";
import CourseCard from "../../components/course/CourseCard";
import Skeleton from "../../components/ui/Skeleton";

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .get("/api/courses")
      .then(({ data }) => setCourses(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "available" && c.capacity > 0) ||
      (filter === "full" && c.capacity === 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-white text-3xl font-bold tracking-tight">
          Course Catalog
        </h1>
        <p className="text-zinc-500 mt-2">{courses.length} courses available</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors flex-1"
        />
        <div className="flex gap-2">
          {["all", "available", "full"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${
                filter === f
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
            >
              <Skeleton className="h-44 rounded-none" />
              <div className="p-5 flex flex-col gap-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-zinc-400 font-medium">No courses found</p>
          <p className="text-zinc-600 text-sm mt-1">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
