import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/api/courses/${id}`).then(({ data }) => setCourse(data));

    api
      .get(`/api/enrollments/user/${user?.id}`)
      .then(({ data }) => {
        const alreadyEnrolled = data.some((e) => e.course.id === parseInt(id));
        setEnrolled(alreadyEnrolled);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await api.post("/api/enrollments", {
        userId: user?.id,
        courseId: parseInt(id),
      });
      setEnrolled(true);
      setMessage("Successfully enrolled!");
    } catch (err) {
      const msg =
        err.response?.status === 500
          ? "No more seats available."
          : "Enrollment failed. Try again.";
      setMessage(msg);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!course) return <p className="text-zinc-500">Course not found.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-white text-2xl font-bold mb-2">{course.title}</h1>
        <p className="text-zinc-400 text-sm mb-6">{course.description}</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl aspect-video flex items-center justify-center mb-6">
          <span className="text-zinc-600 text-sm">
            Video player coming soon
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Course Curriculum</h2>
          {[
            "Introduction",
            "Core Concepts",
            "Advanced Topics",
            "Final Project",
          ].map((section, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3 border-b border-zinc-800 last:border-0"
            >
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                {i + 1}
              </div>
              <span className="text-zinc-300 text-sm">{section}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-6 h-fit">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
          <div className="text-white text-3xl font-bold">${course.price}</div>
          <div className="flex flex-col gap-2 text-sm text-zinc-400">
            <span>📚 {course.capacity} spots available</span>
            <span>🎓 Certificate included</span>
            <span>♾️ Lifetime access</span>
          </div>

          {message && (
            <p
              className={`text-sm text-center ${enrolled ? "text-emerald-400" : "text-red-400"}`}
            >
              {message}
            </p>
          )}

          <Button
            onClick={handleEnroll}
            disabled={enrolling || enrolled}
            className="w-full"
          >
            {enrolled
              ? "Enrolled ✓"
              : enrolling
                ? "Enrolling..."
                : "Enroll Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
