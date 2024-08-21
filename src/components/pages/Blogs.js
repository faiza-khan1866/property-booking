import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import BlogsList from "../sections/blogs/BlogsList";
import { API } from "../../http/API";
import AOS from "aos";
import "aos/dist/aos.css";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const pagelocation = "Blogs";

const Blogs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    getBlogsData();
  }, []);

  //blogs page API
  const [blogData, setBlogData] = useState([]);

  const getBlogsData = () => {
    API.get(`/blogs`)
      .then((response) => {
        const data = response?.data;
        setBlogData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Carpe Diem | {pagelocation}</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      <Banner
        breadcrumb={{
          pagename: pagelocation,
          img: "/assets/img/banner/blogsbanner.jpg",
        }}
      />
      <BlogsList blogsData={blogData} />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};
export default Blogs;
