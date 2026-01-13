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
    status: "Pending",
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
    status: "Pending",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

export default function TodosPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Todos</h1>
          <p className="text-slate-600">
            Track your tasks with status at a glance.
          </p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
