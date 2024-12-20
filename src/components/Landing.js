import React, { useEffect, useState } from "react";
import "../styles/Landing.css";

export default function Landing() {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = 3; // Total number of unique slides

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides); // Increment slide index with wrap-around
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="landing-page">
    <div className="landing">
      <div className="slider">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${slideIndex * 100}%)`, // Move left based on slide index
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/banner_1.png`} alt="Banner 1" />
          </div>
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/banner_2.png`} alt="Banner 2" />
          </div>
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/banner_3.png`} alt="Banner 3" />
          </div>
        </div>
      </div>
    </div>
</div>
);
}