import React from "react";
import { Accordion, Card } from "react-bootstrap";
import paymentLogo from "~/../../public/assets/img/icon/money.png";
const Payment = (props) => {
  return (
    <>
      <div className="payment_area">
        <h3>
          Payment <span>Methods</span>
        </h3>
        <div className="payment_method">
          <form>
            <Accordion>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={3}
                  onClick={() => props.setPaymentOption("NetworkPay")}
                >
                  <div className="heading_payment">
                    <input
                      type="radio"
                      name="payment"
                      id="NetworkPaymentOption"
                    />

                    <label htmlFor="NetworkPaymentOption">
                      <img
                        className="paymentOptionIcon"
                        src={paymentLogo}
                        alt="payment icon"
                      />
                      Network Pay
                    </label>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={3}>
                  <Card.Body>
                    <div className="payment_body">
                      <p>Network Pay</p>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
