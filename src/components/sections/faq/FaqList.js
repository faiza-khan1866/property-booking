import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const FaqList = ({ faqdata }) => {
  return (
    <section className="faq-section pt-60">
      <div className="container">
        <div
          data-aos="fade-down"
          data-aos-once="true"
          className="section-title text-center mb-50"
        >
          <h2>
            FAQ - Frequently Asked <span>Questions</span>
          </h2>
        </div>

        <Accordion allowZeroExpanded>
          {faqdata?.map((item, i) => (
            <AccordionItem data-aos="fade-right" data-aos-once="true" key={i}>
              <AccordionItemHeading>
                <AccordionItemButton>{item?.question}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <hr />
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.answer,
                  }}
                />
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqList;
