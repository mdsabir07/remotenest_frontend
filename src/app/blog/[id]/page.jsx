import BlogDetails from "./BlogDetails";

const Blogs = [
  {
    "id": "post-001",
    "title": "Budget Smart: Which City Is Best for Remote Work on a Budget?",
    "slug": "budget-friendly-remote-cities",
    "excerpt": "Enjoy a better lifestyle at lower costs — discover 5 cities with affordable living expenses and great safety.",
    "content": "In this blog, we explain how to calculate monthly costs (rent, food, transport) to choose the most budget-friendly city. Each city includes sample expenses, local SIM/internet costs, and coworking options.",
    "author": "Omar Faruk",
    "publishedAt": "2025-03-12T09:00:00.000Z",
    "tags": ["budget", "cities", "cost-of-living"],
    "coverImage": "https://i.ibb.co.com/v4B5tHWq/end-game-citi-4.jpg",
    "readingTime": "6 min",
    "featured": true
  },
  {
    "id": "post-002",
    "title": "Wi-Fi & Connectivity Guide: Which City Has the Fastest and Most Reliable Internet?",
    "slug": "best-cities-for-wifi-connectivity",
    "excerpt": "Compare download/upload speeds, mobile coverage, and coffee spaces across 7 cities ideal for remote workers.",
    "content": "This article highlights average download/upload speeds, mobile network coverage, and the number of coworking spaces in each city. It also discusses key factors that often influence decision-making.",
    "author": "Nadia Rahman",
    "publishedAt": "2025-05-02T11:30:00.000Z",
    "tags": ["connectivity", "wifi", "coworking"],
    "coverImage": "https://i.ibb.co.com/dJ6g414f/end-game-citi-5.jpg",
    "readingTime": "7 min",
    "featured": false
  },
  {
    "id": "post-003",
    "title": "Visa & Legality: Essential Info for Digital Nomads",
    "slug": "visa-guide-digital-nomads",
    "excerpt": "Which countries offer digital nomad visas? How long can you stay and what documents do you need? A quick guide.",
    "content": "This guide covers types of digital nomad visas, processing times, and general requirements. It includes examples of popular destinations, potential tax issues, and tips on preparing in advance.",
    "author": "Maria Gomes",
    "publishedAt": "2024-11-20T08:00:00.000Z",
    "tags": ["visa", "legal", "nomad"],
    "coverImage": "https://i.ibb.co.com/wZ8jjnYS/end-game-citi-6.jpg",
    "readingTime": "8 min",
    "featured": false
  },
  {
    "id": "post-004",
    "title": "How to Test a City with a 1-Month Trial Stay",
    "slug": "one-month-trial-city-check",
    "excerpt": "Which factors should you check during a 1-month trial — community, bills, healthcare, and lifestyle.",
    "content": "Learn how to evaluate a city's lifestyle during a trial stay — where to live, where to work, how to manage logistics, and what to observe if you plan to stay long-term.",
    "author": "Rafi Ahmed",
    "publishedAt": "2025-01-05T10:15:00.000Z",
    "tags": ["travel", "trial", "planning"],
    "coverImage": "https://i.ibb.co.com/k60r8vc9/end-game-citi-7.jpg",
    "readingTime": "5 min",
    "featured": true
  },
  {
    "id": "post-005",
    "title": "Local Living: Food & Cultural Tips to Make Life Abroad Easier",
    "slug": "local-living-food-culture-tips",
    "excerpt": "10 practical tips for adapting to a new country — from local food markets to customs and etiquette.",
    "content": "Discover how to enjoy local cuisine, shop at markets, follow social etiquette, and respect customs — essential advice for adapting quickly to a new environment.",
    "author": "Sofia Khan",
    "publishedAt": "2024-09-18T07:45:00.000Z",
    "tags": ["local-living", "culture", "food"],
    "coverImage": "https://i.ibb.co.com/k60r8vc9/end-game-citi-7.jpg",
    "readingTime": "6 min",
    "featured": false
  },
  {
    "id": "post-006",
    "title": "Safety & Health: Essential Guidelines for Remote Workers",
    "slug": "safety-health-remote-workers",
    "excerpt": "Safety in the city — how to identify safe zones, access health insurance, and use emergency services.",
    "content": "This post discusses health insurance, required vaccinations, local emergency contacts, and safety guidelines for going out. It also highlights city safety indicators and benefits of living near health centers.",
    "author": "Dr. Leila Noor",
    "publishedAt": "2025-06-01T09:00:00.000Z",
    "tags": ["safety", "health", "advice"],
    "coverImage": "https://i.ibb.co.com/k60r8vc9/end-game-citi-7.jpg",
    "readingTime": "7 min",
    "featured": true
  }
];

export default async function BlogDetailPage({ params }) {
    const { id } = await params;
    const SingleBlog = Blogs.find((B) => B.id === id);
    return (
       <div>
       {
        <BlogDetails SingleBlog={SingleBlog}></BlogDetails>
       }
       </div>
    );
}