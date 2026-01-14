"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import router from "next/router";

export default function AddNewPage() {
  // TanStack Query for fetching user data
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/auth/login");
        }
        throw new Error("Failed to fetch user");
      }
      const data = await res.json();
      return data.user;
    },
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // / TanStack Query mutation for registration
  // const registerMutation = useMutation({
  //   mutationFn: async (formData: typeof form) => {
  //     console.log("Form submitted with data:", formData);
  //     console.log("Full Name:", formData.fullName);
  //     console.log("Email:", formData.email);
  //     console.log("Password:", formData.password);
  //     console.log("Role:", formData.role);

  //     const res = await fetch("/api/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.error || "Registration failed");
  //     }

  //     return data;
  //   },
  //   onSuccess: () => {
  //     setForm({ fullName: "", email: "", password: "", role: "" });
  //   },
  // });

  const todoAddMutation = useMutation({
    mutationFn: async (formData: typeof form) => {
      console.log("Form submitted with data:", formData);
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          user_id: user?.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      return data;
    },
    onSuccess: () => {
      setForm({ title: "", description: "", status: "draft" });
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted with data:", form);
    console.log("Title:", form.title);
    console.log("Description:", form.description);
    console.log("Status:", form.status);
    console.log("user ID:", user?.id);
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          user_id: user?.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess(true);
        setForm({ title: "", description: "", status: "draft" });
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
