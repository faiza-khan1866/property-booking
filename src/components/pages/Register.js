import React, { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
// import Banner from "../layouts/Banner";
import AOS from "aos";
import "aos/dist/aos.css";

//content components
import RegisterForm from "../sections/register/RegisterForm";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const pagelocation = "Register";

const Register = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Helmet>
        <title>Carpe Diem | {pagelocation}</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      {/* <Banner
        breadcrumb={{
          pagename: pagelocation,
          img: "/assets/img/banner/registerbanner.jpg",
        }}
      /> */}
      <RegisterForm />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default Register;
