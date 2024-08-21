import React, { useEffect, useRef, useState } from "react";
import SearchFilter from "../../layouts/SearchFilter";

const BannerVideo = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef(null);

  const VideoUpdateSrc = () => {
    setTimeout(() => {
      setVideoSrc("https://www.carpediemdxb.com/video/carpediem.mp4");
    }, 5000);
  };

  useEffect(() => {
    VideoUpdateSrc();
  }, []);

  return (
    <div className="home-banner-area">
      {/* Video element as the background */}
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          className="banner_video"
          playsInline
          webkit-playsinline="true"
          fetchpriority="high"
          poster={"https://carpediemdxb.com/video/Thumbnail1920x640.webp"}
          ref={videoRef}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src="https://carpediemdxb.com/video/Thumbnail1920x640.webp"
          alt="banner image"
          className="banner_video"
        />
      )}

      {/* Add content you want to display on top of the video */}
      <div className="container" fetchpriority="high">
        <div
          className="banner-content"
          data-aos="fade-down"
          data-aos-once="true"
        >
          <h1 className="title">DISCOVER A DIFFERENT WORLD</h1>
          <span className="promo-tag">with Carpe Diem Lifestyle</span>
          <div
            data-aos="fade-up"
            data-aos-once="true"
            className="search-filter desktop-search"
          >
            <SearchFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerVideo;
