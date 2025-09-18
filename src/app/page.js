import Image from "next/image";
import Banner from "./components/Banner";
import CommunityHighlight from "./components/CommunityHighlight";
import FeaturedCities from "./components/FeaturedCities";
import NewsletterSignup from "./components/NewsletterSignup";

export default function Home() {
  return (
    <div>
    <Banner></Banner>
    <CommunityHighlight></CommunityHighlight>
    <FeaturedCities></FeaturedCities>
    <NewsletterSignup></NewsletterSignup>
   </div>
  );
}
