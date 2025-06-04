import React from "react";
import Banner from "./Banner/Banner";
import ServiceHighlights from "./Components/ServiceHighlights";
import Marque from "./Components/Marque";
import StoreLocation from "./Components/StoreLocation";
import FeaturedCategory from "./Components/FeaturedCategory";

const Home = () => {
  return (
    <div className="container mx-auto ">
      <Banner />

      <ServiceHighlights />

      <Marque />

      <StoreLocation />

      <FeaturedCategory />

      <div>
        sdfsfdsfdsfdsf
        <br />
        sdfsfsdf
      </div>

      <footer></footer>
    </div>
  );
};

export default Home;
