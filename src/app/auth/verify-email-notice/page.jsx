import Link from "next/link";

export default function VerifyEmailNotice() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 rounded shadow text-center">
                <h2 className="text-xl font-bold mb-4 text-red-500">Email Not Verified</h2>
                <p>Please check your inbox and click the verification link to verify your email.</p>
                <Link href="/auth/login" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Go to Login
                </Link>
            </div>
        </div>
    );
}