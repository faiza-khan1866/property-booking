import React from "react";
import { Accordion, Card } from "react-bootstrap";

const FaqSection = ({ plansdata, title }) => {
  return (
    <section className={`faqs-area pt-60`}>
      <div className="container">
        <div className="section-title mb-50">
          <h2
            data-aos="fade-right"
            data-aos-once="true"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
        </div>
        <Accordion>
          {plansdata?.map((x, i) => (
            <Card data-aos="fade-up" data-aos-once="true">
              <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                {x?.title}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={i + 1}>
                <Card.Body>
                  <hr />
                  <div dangerouslySetInnerHTML={{ __html: x?.description }} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
