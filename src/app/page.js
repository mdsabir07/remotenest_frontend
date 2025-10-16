import Banner from "./components/Banner";
import FeaturedCities from "./components/FeaturedCities";
import HowItWorks from "./components/HowItWorks";
import PostGrid from "@/components/PostGrid";
import { fetchLatestPosts } from "@/lib/posts";
import LogoCarousel from "@/components/LogoCarousel";
import Testimonial from "@/components/Testimonial";


export default async function Home() {
  const posts = await fetchLatestPosts(3);
  return (
    <>
      <Banner></Banner>
      <LogoCarousel />
      <FeaturedCities></FeaturedCities>
      <HowItWorks></HowItWorks>
      <Testimonial />
      <section className="my-12 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl text-center font-bold mb-14">Latest <span className="text-blue-500">Blog</span> Posts</h2>
        <PostGrid posts={posts} limit={3} />
      </section>
    </>
  );
}
