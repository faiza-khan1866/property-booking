import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { API } from "../../../http/API";

const AccountDetails = ({ userId, userData, xauthtoken }) => {
  let initailObject = {
    user_id: userId,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    email: userData?.email,
    mobile: userData?.mobile,
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name == "mobile") {
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
    const { first_name, last_name, email, mobile } = formValues;
    const errors = {};

    if (!first_name) {
      errors.first_name = "Please enter a first name before updating profile";
    } else if (!last_name) {
      errors.last_name = "Please enter a last name before updating profile";
    } else if (!mobile) {
      errors.mobile = "Please enter a phone number before updating profile";
    } else if (!email) {
      errors.email = "Please enter an email id before updating profile";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let formdata = { ...formValues };
    setLoading(true);
    API.post(`/auth/update-profile`, formdata, {
      headers: {
        Authorization: `Bearer ${xauthtoken}`,
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          toast.success(response.data.message);
          setFormValues({ ...initailObject });
          navigate("/account");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something Went wrong!");
      });
  };

  return (
    <>
      <div className="myaccount-content">
        <h4 className="title">
          Account <span>Details</span>
        </h4>
        <Form className="account_details_form">
          <Row>
            <Col sm={6}>
              <Form.Group controlId="first_name" className="mb-4">
                <Form.Label>First Name *</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={formValues.first_name}
                    onChange={handleInputChange}
                  />
                  <InputGroup.Text>
                    <AiOutlineUser fontSize="18px" />
                  </InputGroup.Text>
                </InputGroup>
                <p className="mt-2 text-danger form_error_msg">
                  {errors?.first_name}
                </p>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="last_name" className="mb-4">
                <Form.Label>Last Name *</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={formValues.last_name}
                    onChange={handleInputChange}
                  />
                  <InputGroup.Text>
                    <AiOutlineUser fontSize="18px" />
                  </InputGroup.Text>
                </InputGroup>
                <p className="mt-2 text-danger form_error_msg">
                  {errors?.last_name}
                </p>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="mobile" className="mb-4">
                <Form.Label>Phone Number *</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={formValues.mobile}
                    onChange={handleInputChange}
                  />
                  <InputGroup.Text>
                    <AiOutlinePhone fontSize="18px" />
                  </InputGroup.Text>
                </InputGroup>
                <p className="mt-2 text-danger form_error_msg">
                  {errors?.mobile}
                </p>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="email" className="mb-4">
                <Form.Label>Email Address *</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formValues.email}
                    readOnly
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
          </Row>
          <Button
            className="btn_submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Sending..." : "Save Changes"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AccountDetails;
