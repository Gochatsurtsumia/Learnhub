import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Skeleton from "../../components/ui/Skeleton";

export default function MyEnrollments() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/enrollments/user/${user?.id}`)
      .then(({ data }) => setEnrollments(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">My Enrollments</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {enrollments.length} courses enrolled
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : enrollments.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-500">
            You haven't enrolled in any courses yet.
          </p>
          <Link
            to="/courses"
            className="text-violet-400 text-sm mt-2 inline-block hover:text-violet-300"
          >
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {enrollments.map((enrollment) => (
            <Link
              key={enrollment.id}
              to={`/courses/${enrollment.course.id}`}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between hover:border-zinc-600 transition-colors"
            >
              <div>
                <h3 className="text-white font-medium">
                  {enrollment.course.title}
                </h3>
                <p className="text-zinc-500 text-sm mt-1">
                  {enrollment.course.description}
                </p>
              </div>
              <span className="text-white font-semibold">
                ${enrollment.course.price}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
