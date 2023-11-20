import React, { useState, useEffect } from 'react';
import img1 from '../styles/images.jpeg';
import img2 from '../styles/img2.jpg';
import img3 from '../styles/img3.jpg';
import img4 from '../styles/img1.jpg';
import '../styles/Hero.css'; 

const Hero = () => {
  const imagesWithText = [
    { img: img1, text: "In the world of data, extraction is the first step towards unlocking valuable insights and moving to transformation." },
    { img: img2, text: "Transformation isn't just about change, it's about crafting data into its most meaningful form." },
    { img: img3, text: "Loading data is akin to placing the final piece of a puzzle, completing the picture of business intelligence." },
    { img: img4, text: "Cleansed, transformed, and loaded data is the fuel that drives the engine of business decision-making."},
  ];

  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === imagesWithText.length - 1 ? 0 : activeIndex + 1);
    }, 3000); // 3000ms or 3 seconds interval

    return () => clearInterval(interval);
  }, [activeIndex, imagesWithText.length]);

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {imagesWithText.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {imagesWithText.map((item, index) => (
          <div key={index} className={index === activeIndex ? "carousel-item active" : "carousel-item"}>
            <img src={item.img} className="d-block w-100 carousel-img" alt={`Slide ${index + 1}`} />
            <div className="carousel-caption">
            <div className="text-center" style={{marginBottom:"210px", fontSize:"70px", color:"white", fontStyle:"oblique",fontWeight:"bold"}}>Axis Reconcilio</div>
              <h3>{item.text}</h3>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Hero;
