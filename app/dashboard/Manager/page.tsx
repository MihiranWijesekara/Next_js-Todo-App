"use client";

import { useEffect, useState } from "react";
import { table } from "console";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// const todos = [
//   {
//     id: 1,
//     user: "Achinth Mihiran",
//     title: "Set up project",
//     description: "Initialize repo and configs",
//     status: "In Progress",
//   },
//   {
//     id: 2,
//     user: "Achinth Mihiran",
//     title: "Design UI",
//     description: "Create wireframes for dashboard",
//     status: "draft",
//   },
//   {
//     id: 3,
//     user: " Nimal Perera",
//     title: "Build auth",
//     description: "Implement login/register flow",
//     status: "Completed",
//   },
//   {
//     id: 4,
//     user: "Saman Kumara",
//     title: "API integration",
//     description: "Connect to backend services",
//     status: "draft",
//   },
// ];

const statusColors: Record<string, string> = {
  draft: "bg-amber-100 text-amber-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export default function TodosPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    fullName: string;
    email: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user data
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          // Redirect to login if not authenticated
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  // Fetch todos for the current user
  const {
    data: todosData,
    isLoading: todosLoading,
    refetch: refetchTodos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(`/api/manager`);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      return data.todos || [];
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container bg-gray-150  mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-slate-900">
          Welcome, {user?.fullName || "User"}
        </div>
        <button
          onClick={() => router.push("/auth/login")}
          className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
        >
          Log Out
        </button>
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Todos</h1>
            <p className="text-slate-600">
              Track your tasks with status at a glance.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {todosData && todosData.length > 0 ? (
                todosData.map((todo: any) => (
                  <tr key={todo.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {todo.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                      {todo.full_name}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                      {todo.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {todo.description}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          statusColors[todo.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {todo.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-500">
                    No todos found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
