import Image from "next/image";
import Banner from "./components/Banner";
import CommunityHighlight from "./components/CommunityHighlight";
import FeaturedCities from "./components/FeaturedCities";
import NewsletterSignup from "./components/NewsletterSignup";
import HowItWorks from "./components/HowItWorks";
import BlogPreview from "./components/BlogPreview";
import Contact from "./components/Contact";
import StatsSection from "./components/StatsSection";

export default function Home() {
  return (
    <div>
    <Banner></Banner>
    <CommunityHighlight></CommunityHighlight>
    <FeaturedCities></FeaturedCities>
    <HowItWorks></HowItWorks>
    <BlogPreview></BlogPreview>
    <Contact></Contact>
    <StatsSection></StatsSection>
    <NewsletterSignup></NewsletterSignup>
    
   </div>
  );
}
