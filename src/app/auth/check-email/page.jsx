export default function CheckEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md bg-white p-8 rounded shadow text-center">
                <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
                <p>Thank you for registering! A verification email has been sent to your email address.</p>
                <p>Please check your inbox and click the verification link to activate your account.</p>
            </div>
        </div>
    );
}