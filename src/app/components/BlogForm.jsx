"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import Loading from "../loading";

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// Import styles
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default function BlogForm() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "remote work",
        coverImage: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Detect theme mode (Tailwind's class-based dark mode)
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (document.documentElement.classList.contains("dark")) {
            setTheme("dark");
        } else {
            setTheme("light");
        }

        // Optional: Listen for changes if you allow toggling
        const observer = new MutationObserver(() => {
            if (document.documentElement.classList.contains("dark")) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const res = await fetch("/api/blog/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const json = await res.json();
        setLoading(false);

        if (res.ok) {
            setMessage("Submitted for review! ✅");
            // Clear the form after success:
            setForm({
                title: "",
                content: "",
                category: "remote work",
                coverImage: "",
            });
        } else {
            setMessage(json.message || "Error submitting");
        }
    };


    if (status === "loading") return <Loading />;
    if (status === "unauthenticated")
        return (
            <p>
                Please{" "}
                <button onClick={() => signIn()} className="underline text-blue-600">
                    login
                </button>{" "}
                to create a blog post.
            </p>
        );

    const isFormValid = form.title.trim() && form.content.trim() && form.category;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="title"
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border p-2"
            />

            <div data-color-mode={theme} className="w-full">
                <MDEditor
                    value={form.content}
                    onChange={(val) =>
                        setForm((prev) => ({ ...prev, content: val || "" }))
                    }
                    height={300}
                    theme={theme === "dark" ? "dark" : "light"}
                />
            </div>

            <div className="border p-2 dark:border-gray-600">
                <h3 className="font-semibold mb-2">Preview</h3>
                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {form.content}
                    </ReactMarkdown>
                </div>
            </div>

            <input
                name="coverImage"
                type="text"
                placeholder="Cover Image URL (optional)"
                value={form.coverImage}
                onChange={handleChange}
                className="w-full border p-2"
            />

            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border p-2"
            >
                <option value="remote work">Remote Work</option>
                <option value="tax/legal">Tax / Legal</option>
                <option value="travel tips">Travel Tips</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="other">Other</option>
            </select>

            <button
                type="submit"
                disabled={loading || !isFormValid}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Submitting..." : "Submit Post"}
            </button>

            {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </form>
    );
}