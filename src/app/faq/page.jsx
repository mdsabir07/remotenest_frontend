import FAQs from "../components/FAQs";

export default function FAQPage() {
    const faqs = [
        {
            question: "What is RemoteNest and how does it work?",
            answer:
                "RemoteNest is a platform connecting remote testers and reviewers with products or services. You get tasks to review, test, or provide feedback, and you earn rewards or payments based on your work.",
        },
        {
            question: "How do I sign up as a tester / reviewer?",
            answer:
                "To join RemoteNest, register with your email, submit your profile, and complete initial onboarding or sample evaluations. Once approved, you’ll receive testing assignments in your dashboard.",
        },
        {
            question: "What types of tasks or tests will I get?",
            answer:
                "You may receive usability tests, product reviews, website feedback, bug reports, or user experience assessments. Tasks vary depending on client requirements and your tester qualifications.",
        },
        {
            question: "How much can I earn per task?",
            answer:
                "Earnings depend on the complexity of the task and client budget. Some tasks might pay a few dollars, while others (more advanced tests) may pay up to $100+.",
        },
        {
            question: "When and how am I paid?",
            answer:
                "Payments are usually processed after a task is approved. RemoteNest supports payment via PayPal (or other supported methods). Check your payment settings and payout schedule in your account.",
        },
        {
            question: "Are there any eligibility requirements to apply?",
            answer:
                "Yes. You typically need to be 18+, have a valid email, reliable internet access, and sometimes additional screening (e.g. demographic or device criteria). Some tasks may require specific devices or skills.",
        },
        {
            question: "Can I test tasks from multiple cities or regions?",
            answer:
                "Yes — tasks may be posted for various cities or regions. You can choose tests relevant to your region or globally, depending on your eligibility and the client’s target audience.",
        },
        {
            question: "What do I do if a submitted test is rejected or disputed?",
            answer:
                "If a test is rejected, first review any feedback from the client. You can appeal or request clarification via support. Make sure your submission clearly follows the task instructions. If needed, contact RemoteNest support.",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl sm:text-5xl text-center font-bold mb-8 lg:mb-14">Frequently Asked Questions</h1>
            <FAQs faqs={faqs} />
        </div>
    );
}