import React, { useState } from "react";
import { API } from "../../../http/API";
import { toast } from "react-toastify";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineEdit,
} from "react-icons/ai";

const ContactForm = () => {
  const initailObject = {
    name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name == "phone_number") {
      // Regular expression to match only numbers
      const numberPattern = /^\d*$/;
      if (numberPattern.test(e.target.value)) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
      }
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone_number, subject, message } = formValues;
    const errors = {};
    if (!name) {
      errors.name = "Please Enter Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid Email Address.";
    } else if (!phone_number) {
      errors.phone_number = "Please Enter Phone Number.";
    } else if (!subject) {
      errors.subject = "Please Enter Subject.";
    } else if (!message) {
      errors.message = "Please Enter Message.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    API.post("/contact-us", updatedData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          toast.success("Data has been Submitted Successfully!");
          setFormValues({ ...initailObject });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something Went Wrong!");
      });
  };

  return (
    <section className="contact-part pt-60">
      <div className="container">
        <div
          data-aos="fade-right"
          data-aos-once="true"
          className="section-title mb-40"
        >
          <h2>
            Contact <span>Us</span>
          </h2>
        </div>
        <div className="row">
          <div
            data-aos="fade-right"
            data-aos-once="true"
            className="col-md-6 mb-small"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462561.6574537445!2d55.22748795!3d25.076022449999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1677742216990!5m2!1sen!2s"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="contact-maps"
            ></iframe>
          </div>
          <div className="col-md-6">
            {/* Contact Form */}
            <div className="contact-form">
              <Form data-aos="fade-up" data-aos-once="true">
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group controlId="name" className="mb-4">
                      <Form.Label>Name *</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formValues.name}
                          onChange={handleInputChange}
                        />
                        <InputGroup.Text>
                          <AiOutlineUser fontSize="18px" />
                        </InputGroup.Text>
                      </InputGroup>
                      <p className="mt-2 text-danger form_error_msg">
                        {errors?.name}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group controlId="email" className="mb-4">
                      <Form.Label>Email Address *</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                        />
                        <InputGroup.Text>
                          <AiOutlineMail fontSize="18px" />
                        </InputGroup.Text>
                      </InputGroup>
                      <p className="mt-2 text-danger form_error_msg">
                        {errors?.email}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group controlId="phone_number" className="mb-4">
                      <Form.Label>Phone Number *</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name="phone_number"
                          value={formValues.phone_number}
                          onChange={handleInputChange}
                        />
                        <InputGroup.Text>
                          <AiOutlinePhone fontSize="18px" />
                        </InputGroup.Text>
                      </InputGroup>
                      <p className="mt-2 text-danger form_error_msg">
                        {errors?.phone_number}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group controlId="subject" className="mb-4">
                      <Form.Label>Subject *</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formValues.subject}
                          onChange={handleInputChange}
                        />
                        <InputGroup.Text>
                          <AiOutlineEdit fontSize="18px" />
                        </InputGroup.Text>
                      </InputGroup>
                      <p className="mt-2 text-danger form_error_msg">
                        {errors?.subject}
                      </p>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="message" className="mb-4">
                  <Form.Label>Message *</Form.Label>
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formValues.message}
                      onChange={handleInputChange}
                    />
                    <InputGroup.Text>
                      <AiOutlineEdit fontSize="18px" />
                    </InputGroup.Text>
                  </InputGroup>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.message}
                  </p>
                </Form.Group>
                <Button
                  className="btn_submit mb-0"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Sending..." : "Submit"}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
