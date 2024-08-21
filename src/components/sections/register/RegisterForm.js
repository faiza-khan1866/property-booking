import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import login from "../../../assets/login.png";
import { toast } from "react-toastify";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlinePhone,
} from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { API } from "../../../http/API";
import { showComp } from "../../../actions";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init();
  }, []);

  const initailObject = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile: "",
    user_type: "user",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, mobile, email, password } = formValues;
    const errors = {};
    if (!first_name) {
      errors.first_name = "Please Enter First Name.";
    } else if (!last_name) {
      errors.last_name = "Please Enter Last Name.";
    } else if (!mobile) {
      errors.mobile = "Please Enter Phone Number.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    } else if (!password) {
      errors.password = "Please Enter Password.";
    } else if (password.length < 8) {
      errors.password =
        "The password should be at least eight characters long.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let formdata = { ...formValues };
    setLoading(true);
    API.post(`/auth/register`, formdata)
      .then((response) => {
        if (response?.data?.error) {
          setLoading(false);
          toast.error(response?.data?.error);
        } else if (response?.data?.errors) {
          setLoading(false);
          toast.error(response?.data?.errors);
        } else {
          setLoading(false);
          toast.success(response?.data?.message);
          setFormValues({ ...initailObject });
          dispatch(showComp(true));
          navigate("/verification");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <>
      <Container>
        <section className="login_wrape mt-60 mb-60">
          <Row>
            <Col sm={12} lg={5}>
              <img
                src={login}
                alt="User"
                className="img-fluid"
                data-aos="fade-down"
                data-aos-once="true"
              />
            </Col>
            <Col sm>
              <h2
                className="main-title"
                data-aos="fade-down"
                data-aos-once="true"
              >
                Register
              </h2>
              <hr />
              {/* Register Form */}
              <Form data-aos="fade-up" data-aos-once="true">
                <Row>
                  <Col sm={12} md={6}>
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
                  <Col sm={12} md={6}>
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
                  <Col sm={12} md={6}>
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
                </Row>
                <Form.Group controlId="password" className="mb-4">
                  <Form.Label>Password *</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formValues.password}
                      onChange={handleInputChange}
                    />
                    <InputGroup.Text>
                      {showPassword ? (
                        <AiOutlineEye
                          fontSize="18px"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          fontSize="18px"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.password}
                  </p>
                </Form.Group>
                <p className="pass_note">
                  Hint: The password should be at least eight characters long.
                  To make it stronger, use upper and lower case letters,
                  numbers, and symbols like ! " ? $ % ^ & ).
                </p>
                <Button
                  className="btn_submit mb-0"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Sending..." : "Register"}
                </Button>
              </Form>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
};

export default RegisterForm;
