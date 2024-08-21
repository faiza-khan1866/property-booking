import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button, InputGroup } from "react-bootstrap";
import { AiOutlineLock } from "react-icons/ai";
import { API } from "../../../http/API";
import { userLogout } from "../../../actions";

const ResetPassword = ({ userId, xauthtoken }) => {
  let initailObject = {
    user_id: userId,
    password: "",
    newpassword: "",
    confirmpassword: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const logout = () => {
    localStorage.removeItem("userData");
    dispatch(userLogout());
    navigate(`/login`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, change_password, confirm_password } = formValues;
    const errors = {};
    if (!password) {
      errors.password = "Please enter a Current password before submission";
    } else if (!change_password) {
      errors.change_password = "Please enter a New password before submission";
    } else if (change_password === password) {
      errors.change_password =
        "Current Password and New password cannot be same";
    } else if (!confirm_password) {
      errors.confirm_password =
        "Please enter a Confirm password before submission";
    } else if (change_password !== confirm_password) {
      errors.confirm_password =
        "New Password and Confirm Password does not match";
    } else if (change_password.length < 8) {
      errors.change_password = "Password must be at least 8 characters";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let formdata = { ...formValues };

    setLoading(true);
    API.post(`/auth/change-password`, formdata, {
      headers: {
        Authorization: `Bearer ${xauthtoken}`,
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          if (response?.data?.[0] === 404) {
            toast.error(response.data.message);
          } else {
            toast.success(response.data.message);
            logout();
            setFormValues({ ...initailObject });
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        toast.error("Something Went wrong!");
      });
  };
  return (
    <>
      <div className="myaccount-content">
        <h4 className="title">
          Reset <span>Password</span>
        </h4>
        <Form className="account_details_form">
          <Form.Group controlId="password" className="mb-4">
            <Form.Label>
              Current password (leave blank to leave unchanged) *
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
              <InputGroup.Text>
                <AiOutlineLock fontSize="18px" />
              </InputGroup.Text>
            </InputGroup>
            <p className="mt-2 text-danger form_error_msg">
              {errors?.password}
            </p>
          </Form.Group>
          <Form.Group controlId="change_password" className="mb-4">
            <Form.Label>
              New password (leave blank to leave unchanged) *
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                name="change_password"
                value={formValues.change_password}
                onChange={handleInputChange}
              />
              <InputGroup.Text>
                <AiOutlineLock fontSize="18px" />
              </InputGroup.Text>
            </InputGroup>
            <p className="mt-2 text-danger form_error_msg">
              {errors?.change_password}
            </p>
          </Form.Group>
          <Form.Group controlId="confirm_password" className="mb-4">
            <Form.Label>Confirm new password *</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                name="confirm_password"
                value={formValues.confirm_password}
                onChange={handleInputChange}
              />
              <InputGroup.Text>
                <AiOutlineLock fontSize="18px" />
              </InputGroup.Text>
            </InputGroup>
            <p className="mt-2 text-danger form_error_msg">
              {errors?.confirm_password}
            </p>
          </Form.Group>
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
export default ResetPassword;
