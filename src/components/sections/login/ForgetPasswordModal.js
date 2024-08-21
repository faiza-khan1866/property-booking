import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, InputGroup } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import { API } from "../../../http/API";

const initailObject = {
  email: "",
  redirect_url: "https://carpediem.prismcloudhosting.com/",
};

const ForgetPasswordModal = (props) => {
  const [formValues, setFormValues] = useState(initailObject);
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

  const handleSubmit = async (e) => {
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

    let formdata = { ...formValues };
    setLoading(true);
    API.post(`/forget-password`, formdata)
      .then((response) => {
        if (response?.data?.errors) {
          setLoading(false);
          toast.error(response?.data?.errors?.email[0]);
        } else {
          setLoading(false);
          toast.success(response?.data);
          setFormValues({ ...initailObject });
          props.onHide();
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("The selected email is invalid");
      });
  };
  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="modal-body forget_password_form">
            <button
              type="button"
              className="close close_modal_icon"
              onClick={props.onHide}
            >
              <span aria-hidden="true">
                <i className="fa fa-times"></i>
              </span>
            </button>
            <h2
              className="main-title"
              data-aos="fade-down"
              data-aos-once="true"
            >
              Forgot Password?
            </h2>
            <hr />
            <Form data-aos="fade-up" data-aos-once="true">
              <Form.Group controlId="email" className="mb-4">
                <Form.Label>
                  Enter the email address associated with your account *
                </Form.Label>
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
              <Button
                className="btn_submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Submit"}
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgetPasswordModal;
