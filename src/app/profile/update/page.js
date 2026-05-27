"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    try {
      const { data, error } = await authClient.updateUser({
        name: name,
        image: image,
      });

      if (error) {
        setMessage("❌ Error: " + error.message);
      } else {
        setMessage("✅ Profile updated successfully!");
        setTimeout(() => (window.location.href = "/profile"), 1500);
      }
    } catch (err) {
      setMessage("❌ A network error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending || !session) return null;

  return (
    <div className="max-w-xl mx-auto px-6 py-20 w-full">
      <Link
        href="/profile"
        className="text-primary hover:underline mb-8 inline-block font-semibold"
      >
        &larr; Back to Dashboard
      </Link>

      <div className="bg-surface p-8 rounded-3xl border border-border shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-default-900">
          Update Information
        </h1>

        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          <Input
            label="Full Name"
            placeholder="Enter your name"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Profile Image URL"
            placeholder="https://example.com/my-photo.jpg"
            variant="bordered"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {message && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${message.includes("✅") ? "bg-success/20 text-success" : "bg-danger/20 text-danger"}`}
            >
              {message}
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="font-bold mt-2"
            isLoading={isUpdating}
          >
            Update Information
          </Button>
        </form>
      </div>
    </div>
  );
}
