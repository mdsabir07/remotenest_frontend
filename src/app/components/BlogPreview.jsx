
import Image from "next/image";
import Link from "next/link";

const BlogPreview = () => {

    const blogs = [
        {
            id: 1,
            title: "Mastering React in 2025",
            image: "https://i.ibb.co/JYBmBJM/react.jpg", 
            excerpt: "Learn the latest features of React...",
            link: "/blog/1",
        },
        {
            id: 2,
            title: "Next.js Performance Tips",
            image: "https://i.ibb.co/6CH9GgL/next.png",  
            excerpt: "Discover how to optimize your Next.js apps...",
            link: "/blog/2",
        },
        {
            id: 3,
            title: "Tailwind CSS Made Easy",
            image: "https://i.ibb.co/XkJLypQ4/tailwind.jpg",  
            excerpt: "Simplify your frontend development...",
            link: "/blog/3",
        },
    ];
    return (
        <section className="py-12 ">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
                        >
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                width={500}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                                <Link
                                    href={blog.link}
                                    className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
