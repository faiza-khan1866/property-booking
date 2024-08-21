import React, { useState, Fragment } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { API } from "../../http/API";
import { toast } from "react-toastify";
import { AiOutlineMail } from "react-icons/ai";

const Subscribe = () => {
  const defaultState = {
    email: "",
  };
  const [formValues, setFormValues] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = formValues;
    const errors = {};
    if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }
    let updatedData = { ...formValues };
    setLoading(true);
    API.post("/subscribers", updatedData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          toast.success("Data has been Submitted Successfully!");
          setFormValues({ ...defaultState });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something Went Wrong!");
      });
  };
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <footer>
        <div className="footer-subscibe-area pt-60 pb-60">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-10 col-sm-12">
                <div className="subscribe-text text-center">
                  <div
                    data-aos="fade-down"
                    data-aos-once="true"
                    className="section-title mb-20"
                  >
                    <h2>
                      Subscribe to Our <span>Newsletter!</span>
                    </h2>
                  </div>
                  <p data-aos="fade-down" data-aos-once="true">
                    Stay up-to-date on all the latest house deals, special
                    offers, and in-season discounts.
                  </p>
                  <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                      <Form
                        data-aos="fade-down"
                        data-aos-once="true"
                        className="subscribe-form mt-20 "
                      >
                        <Form.Group controlId="email">
                          <InputGroup>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formValues.email}
                              onChange={handleInputChange}
                              placeholder="Enter your Email Address"
                            />
                            <InputGroup.Text>
                              <Button
                                className="btn_submit"
                                disabled={loading}
                                onClick={handleSubmit}
                              >
                                {loading ? "Sending..." : "Subscribe"}
                              </Button>
                            </InputGroup.Text>
                          </InputGroup>
                          <p className="mt-2 text-danger form_error_msg">
                            {errors?.email}
                          </p>
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Subscribe;
