import React from "react";
import whatsappgif from "../../assets/whatsapp1.gif";

const WhatsappFixedIcon = () => {
  return (
    <div className="contact-pannel-main">
      <a
        href={"https://wa.me/+971524735565"}
        className="contact-pannel-btn text-decoration-none"
        target={"_blank"}
      >
        <img src={whatsappgif} height={60} width={60} alt="whatsApp Icon" />
      </a>
    </div>
  );
};
export default WhatsappFixedIcon;
