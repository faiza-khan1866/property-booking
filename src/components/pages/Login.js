import React, { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
// import Banner from "../layouts/Banner";
import AOS from "aos";
import "aos/dist/aos.css";

//content components
import LoginForm from "../sections/login/LoginForm";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const pagelocation = "Login";

const Login = () => {
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
          img: "/assets/img/banner/loginbanner.jpg",
        }}
      /> */}
      <LoginForm />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};
export default Login;
