// app/auth/error/page.jsx

"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const errorMessages = {
    Configuration: "Server configuration error.",
    AccessDenied: "Access denied. You may not have permission.",
    Verification: "The sign-in link is invalid or has expired.",
    CredentialsSignin: "Invalid email or password.",
    OAuthSignin: "OAuth sign-in failed. Please try again.",
    OAuthCallback: "OAuth callback error.",
    OAuthCreateAccount: "OAuth account creation failed.",
    OAuthAccountNotLinked: "Account not linked. Please use the same login method.",
    EmailCreateAccount: "Email account creation error.",
    Default: "Something went wrong. Please try again.",
};

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const errorMessage = errorMessages[error] || errorMessages.Default;

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Authentication Error</h1>
            <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
            <Link href="/login" style={{ marginTop: "2rem", display: "inline-block", color: "blue" }}>
                Back to Login
            </Link>
        </div>
    );
}