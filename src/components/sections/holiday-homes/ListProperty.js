import React, { useState } from "react";
import { API } from "../../../http/API";
import { toast } from "react-toastify";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineEdit,
  AiOutlineBook,
  AiOutlinePhone,
} from "react-icons/ai";

const initailObject = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  flat_number: "",
  street_number: "",
  address: "",
  message: "",
  property_images: [],
};

const ListProperty = ({ title }) => {
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadFile, setUploadFie] = useState([]);
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    let downloadFile = [...event.target.files];
    let updatedFiles = downloadFile.map((x) => ({
      image: x,
    }));
    setUploadFie(updatedFiles);
  };

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
    const {
      first_name,
      last_name,
      email,
      phone_number,
      flat_number,
      street_number,
      address,
    } = formValues;
    const errors = {};
    if (!first_name) {
      errors.first_name = "Please Enter First Name.";
    } else if (!last_name) {
      errors.last_name = "Please Enter Last Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    } else if (!phone_number) {
      errors.phone_number = "Please Enter Phone Number.";
    } else if (!flat_number) {
      errors.flat_number = "Please Enter Flat Number.";
    } else if (!street_number) {
      errors.street_number = "Please Enter Street Number.";
    } else if (!address) {
      errors.address = "Please Enter Address.";
    } else if (uploadFile.length == 0) {
      toast.info("Please Upload Images.");
      return;
    } else if (uploadFile.length == 1) {
      toast.info("Please Upload More than One Images.");
      return;
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    let imagesFormData = new FormData();

    uploadFile.forEach((x) => {
      imagesFormData.append("property_images[]", x.image);
    });
    imagesFormData.append("data", JSON.stringify(updatedData));

    setLoading(true);

    API.post("/list-your-properties", imagesFormData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${imagesFormData._boundary}`,
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          toast.success("Data has been Submitted Successfully!");
          setFormValues({ ...initailObject });
          setUploadFie([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something Went Wrong!");
      });
  };

  return (
    <section className="list-your-property-area pt-60">
      <div className="container">
        <div className="section-title mb-40">
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
        </div>
        {/* property Form */}
        <div className="proprty-form">
          <Form data-aos="fade-up" data-aos-once="true">
            <Row>
              <Col sm={12}>
                <h3>Personal Details</h3>
              </Col>
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
              <Col sm={12}>
                <h3>Property Details</h3>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId="flat_number" className="mb-4">
                  <Form.Label>House/Flat no. *</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="flat_number"
                      value={formValues.flat_number}
                      onChange={handleInputChange}
                    />
                    <InputGroup.Text>
                      <AiOutlineBook fontSize="18px" />
                    </InputGroup.Text>
                  </InputGroup>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.flat_number}
                  </p>
                </Form.Group>
                <Form.Group controlId="street_number" className="mb-4">
                  <Form.Label>Street no. *</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="street_number"
                      value={formValues.street_number}
                      onChange={handleInputChange}
                    />
                    <InputGroup.Text>
                      <AiOutlineBook fontSize="18px" />
                    </InputGroup.Text>
                  </InputGroup>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.street_number}
                  </p>
                </Form.Group>
                <Form.Group controlId="address" className="mb-4">
                  <Form.Label>Address *</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formValues.address}
                      onChange={handleInputChange}
                    />
                    <InputGroup.Text>
                      <AiOutlineBook fontSize="18px" />
                    </InputGroup.Text>
                  </InputGroup>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.address}
                  </p>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId="message" className="mb-4">
                  <Form.Label>Details</Form.Label>
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="message"
                      value={formValues.message}
                      onChange={handleInputChange}
                    />
                    <InputGroup.Text>
                      <AiOutlineEdit fontSize="18px" />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <button
                  type="button"
                  onClick={handleClick}
                  className="main-btn btn-border"
                >
                  Upload Images
                </button>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  name="property_images"
                />
                <span
                  className={`fileuploadtext mt-2 mr-3 ${
                    uploadFile?.length == 0 && "mb-30"
                  }`}
                >
                  Files:
                </span>
                {uploadFile?.length > 0 ? (
                  <ul className="mb-30 mt-2">
                    {uploadFile?.map((x, i) => (
                      <li key={i}>
                        <p className=" fileuploadtext">{x?.image?.name}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className=" fileuploadtext">None selected</span>
                )}
              </Col>
            </Row>
            <div className="text-center">
              <Button
                className="btn_submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Submit"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ListProperty;
