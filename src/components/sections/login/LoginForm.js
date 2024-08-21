import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import login from "../../../assets/login.png";
import { toast } from "react-toastify";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineMail,
} from "react-icons/ai";
import { API } from "../../../http/API";
import { userLogin } from "../../../actions";
import ForgetPasswordModal from "./ForgetPasswordModal";

const initailObject = {
  email: "",
  password: "",
  user_type: "user",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    const { email, password } = formValues;
    const errors = {};

    if (!email) {
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
    API.post(`/auth/login`, formdata)
      .then((response) => {
        if (response?.data?.error) {
          setLoading(false);
          toast.error(response?.data?.error);
        } else if (response?.data?.errors) {
          setLoading(false);
          toast.error(response?.data?.errors?.email[0]);
        } else {
          setLoading(false);
          toast.success(response?.data?.success);
          dispatch(
            userLogin({
              auth_token: response?.headers?.x_auth_token,
              user_id: response?.data?.user?.id,
            })
          );
          setFormValues({ ...initailObject });
          // navigate("/account");
          navigate(-1);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data);
      });
  };

  return (
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
              Login
            </h2>
            <hr />
            {/* Login Form */}
            <Form data-aos="fade-up" data-aos-once="true">
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
              <Button
                className="btn_submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Log in"}
              </Button>
            </Form>
            <span className="sign_up">
              Don’t have an account?
              <span onClick={() => navigate("/register")}>
                Create Account Now
              </span>
            </span>
            <span className="lost_pass" onClick={() => setModalShow(true)}>
              Forgot password?
            </span>
          </Col>
        </Row>
        <ForgetPasswordModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </section>
    </Container>
  );
};

export default LoginForm;
