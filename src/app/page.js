import Image from "next/image";
import Banner from "./components/Banner";
import CommunityHighlight from "./components/CommunityHighlight";
import FeaturedCities from "./components/FeaturedCities";
import HowItWorks from "./components/HowItWorks";
import Contact from "./components/Contact";
import BlogPreview from "./components/BlogPreview";

export default function Home() {
  return (
    <div>
    <Banner></Banner>
    <CommunityHighlight></CommunityHighlight>
    <FeaturedCities></FeaturedCities>
    <HowItWorks></HowItWorks>
    <BlogPreview></BlogPreview>
    <Contact></Contact>
   </div>
  );
}
