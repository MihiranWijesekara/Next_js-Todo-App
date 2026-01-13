"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddNewPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess(true);
        setForm({ title: "", description: "", role: "user" });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-150 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10">
            <h1 className="text-3xl font-bold text-white mb-2">Add New Todo</h1>
            <p className="text-blue-100"> </p>
          </div>

          {/* Form Container */}
          <div className="px-8 py-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">
                  ✓ User registered successfully!
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">✕ {error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter todo title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="h-11 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-gray-700 font-medium"
                >
                  Description
                </Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter todo description"
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="h-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg w-full"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg mt-6 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Todo"}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-black-400 text-xs mt-6">
          By adding a todo, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
