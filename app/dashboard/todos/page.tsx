"use client";

import { useRouter } from "next/navigation";

const todos = [
  {
    id: 1,
    title: "Set up project",
    description: "Initialize repo and configs",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Design UI",
    description: "Create wireframes for dashboard",
    status: "draft",
  },
  {
    id: 3,
    title: "Build auth",
    description: "Implement login/register flow",
    status: "Completed",
  },
  {
    id: 4,
    title: "API integration",
    description: "Connect to backend services",
    status: "draft",
  },
];

const statusColors: Record<string, string> = {
  draft: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

export default function TodosPage() {
  const router = useRouter();

  return (
    <div className="container bg-gray-150  mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Todos</h1>
            <p className="text-slate-600">
              Track your tasks with status at a glance.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/todos/addNew")}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap ml-4"
          >
            + Add New Todo
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  ID
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
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {todos.map((todo) => (
                <tr key={todo.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">
                    {todo.id}
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
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <div className="flex items-center gap-3">
                      {/* Edit Button/Icon */}
                      <button
                        // onClick={() => handleEdit(todo.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit todo"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>

                      {/* Delete Button/Icon */}
                      <button
                        // onClick={() => handleDelete(todo.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete todo"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
