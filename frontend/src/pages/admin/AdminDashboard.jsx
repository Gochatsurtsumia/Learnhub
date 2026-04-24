import { useState, useEffect } from "react";
import api from "../../services/api";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    capacity: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    api
      .get("/api/courses")
      .then(({ data }) => setCourses(data))
      .finally(() => setLoading(false));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post("/api/courses", {
        ...form,
        price: parseFloat(form.price),
        capacity: parseInt(form.capacity),
      });
      setForm({ title: "", description: "", price: "", capacity: "" });
      setShowForm(false);
      fetchCourses();
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;
    await api.delete(`/api/courses/${id}`);
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your courses</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Course"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
          />
          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 sm:col-span-2"
          />
          <input
            placeholder="Capacity"
            type="number"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            required
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
          />
          <Button type="submit" disabled={creating} className="sm:col-span-2">
            {creating ? "Creating..." : "Create Course"}
          </Button>
        </form>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-zinc-500 font-medium px-4 py-3">
                Title
              </th>
              <th className="text-left text-zinc-500 font-medium px-4 py-3">
                Price
              </th>
              <th className="text-left text-zinc-500 font-medium px-4 py-3">
                Capacity
              </th>
              <th className="text-right text-zinc-500 font-medium px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-zinc-800">
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-40" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </td>
                  </tr>
                ))
              : courses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-white font-medium">
                      {course.title}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">${course.price}</td>
                    <td className="px-4 py-3 text-zinc-400">
                      {course.capacity}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
