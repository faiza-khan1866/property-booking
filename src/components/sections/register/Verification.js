import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import verify from "../../../assets/verify.png";
import { toast } from "react-toastify";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { AiOutlineLock } from "react-icons/ai";
import { API } from "../../../http/API";
import { userLogin, hideComp } from "../../../actions";
import { connect } from "react-redux";

const Verification = ({ pageShow, userLogin, hideComp }) => {
  useEffect(() => {
    if (pageShow === false) {
      window.history.back();
    }
  }, [pageShow]);

  const initailObject = {
    code: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name == "code") {
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
    const { code } = formValues;
    const errors = {};

    if (!code) {
      errors.code = "Please Enter Authorization Code.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let formdata = { ...formValues };
    setLoading(true);
    API.post(`/auth/email-verification`, formdata)
      .then((response) => {
        if (response?.data?.error) {
          setLoading(false);
          toast.error(response?.data?.error);
        } else {
          userLogin({
            auth_token: response?.headers?.x_auth_token,
            user_id: response?.data?.user?.id,
          });
          setLoading(false);
          toast.success(response?.data?.success);
          navigate("/account");
          hideComp(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };
  return (
    <>
      <Container>
        <section className="login_wrape mt-60 mb-60">
          <Row className="align-items-center">
            <Col sm={12} lg={5}>
              <img
                src={verify}
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
                Authenticate your Account
              </h2>
              <hr />
              <p className="verify_sub_title">
                Protecting your account is our top priority. Please confirm your
                account by entering the authorization code set to in your email.
              </p>
              {/* Login Form */}
              <Form data-aos="fade-up" data-aos-once="true">
                <Form.Group controlId="code" className="mb-4">
                  <Form.Label>Authorization Code *</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="code"
                      value={formValues.code}
                      onChange={handleInputChange}
                      placeholder="0000"
                      style={{ textAlign: "center" }}
                    />
                    <InputGroup.Text>
                      <AiOutlineLock fontSize="18px" />
                    </InputGroup.Text>
                  </InputGroup>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.code}
                  </p>
                </Form.Group>
                <Button
                  className="btn_submit mb-0"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Sending..." : "Verify"}
                </Button>
              </Form>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
};

// export default Verification;
const mapStateToProps = (state) => {
  return {
    pageShow: state?._todoProperties?.pageShow,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    hideComp: () => dispatch(hideComp()),
    userLogin: (auth_token, user_id) =>
      dispatch(userLogin(auth_token, user_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Verification);
