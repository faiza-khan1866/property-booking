import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import BlogDetails from "../sections/blog-inner/BlogDetails";
import MediaSection from "../sections/blog-inner/MediaSection";
import { API } from "../../http/API";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogInner = () => {
  const { id } = useParams();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    getSingleBlogsData();
    getMediaData();
  }, [id]);

  //blogs Detail page API
  const [singleBlogData, setSingleBlogData] = useState("");
  const getSingleBlogsData = () => {
    API.get(`/blogs/${id}`)
      .then((response) => {
        const data = response?.data;
        setSingleBlogData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Media API
  const [mediaData, setMediaData] = useState([]);
  const [IsMediaLoading, setIsMediaLoading] = useState(true);

  const getMediaData = () => {
    API.get(`/medias`)
      .then((response) => {
        const data = response?.data;
        setMediaData(data);
        setIsMediaLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsMediaLoading(false);
      });
  };
  return (
    <>
      <Helmet>
        <title>{singleBlogData?.seo?.meta_title}</title>
        <meta
          name="description"
          content={singleBlogData?.seo?.meta_description}
        />
      </Helmet>
      <Header />
      <Banner
        breadcrumb={{
          pagename: singleBlogData?.title,
          img: singleBlogData?.banner_img,
        }}
      />

      <BlogDetails blogdetail={singleBlogData} />
      {!IsMediaLoading && (
        <section className="pb-60">
          {mediaData?.length > 0 && (
            <MediaSection
              title="Media & <span>News</span>"
              mediaData={mediaData}
            />
          )}
        </section>
      )}
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default BlogInner;
