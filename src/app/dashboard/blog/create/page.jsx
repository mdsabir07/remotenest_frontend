"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BlogForm from "@/app/components/BlogForm";
import Loading from "@/app/loading";

export default function CreateBlogPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            // Redirect or prompt login
            signIn(); // redirects to login page by default
        }
    }, [status]);

    if (status === "loading") {
        return <Loading />;
    }

    if (!session) {
        return <p>Redirecting to login...</p>; // or blank until redirect happens
    }

    // Optionally, check user role if you want only certain roles to access
    // if (session.user.role !== 'author') {
    //   router.push('/unauthorized');
    //   return null;
    // }

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>
            <BlogForm />
        </div>
    );
}