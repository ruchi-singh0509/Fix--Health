import React from "react";
import Navbar from "../components/Navbar.js";
import HeroImage from "../components/HomeImage.js";
import Booking from "../components/Booking.js";
import Review from "../components/Review.js";
import Footer from "../components/Footer.js";

function LandingPage() {
  return (
    <div className="home-section">
      <Navbar />
      <HeroImage />
      <Booking />
      <Review />
      <Footer />
    </div>
  );
}

export default LandingPage;
