import React, { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

//content components
import VerificationArea from "../sections/register/Verification";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const Verification = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Helmet>
        <title>Carpe Diem | Verification</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      <VerificationArea />
      <WhatsappFixedIcon />

      <Footer />
    </>
  );
};

export default Verification;
