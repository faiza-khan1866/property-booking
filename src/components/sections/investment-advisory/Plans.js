import React from "react";
import { Card } from "react-bootstrap";

const Plans = ({ plansdata }) => {
  return (
    <section className={`plans-area pt-60 pb-60`}>
      <div className="container">
        <div className="section-title mb-50">
          <h2 data-aos="fade-right" data-aos-once="true">
            Our Tailored <span>Plan</span>
          </h2>
        </div>
        {plansdata?.map((x, i) => (
          <Card data-aos="fade-up" data-aos-once="true">
            <Card.Body>{x?.title}</Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Plans;
