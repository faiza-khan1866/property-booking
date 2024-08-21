import React, { useState } from "react";
import { API } from "../../../http/API";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { AiOutlineMail, AiOutlineUser, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const initailObject = {
  name: "",
  email: "",
  property_name: "",
  message: "",
  images: [],
};
const GetQuote = () => {
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
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { property_name, name, email } = formValues;
    const errors = {};
    if (!property_name) {
      errors.property_name = "Please Enter Property Name.";
    } else if (!name) {
      errors.name = "Please Enter Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
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
      imagesFormData.append("images[]", x.image);
    });
    imagesFormData.append("contactData", JSON.stringify(updatedData));

    setLoading(true);

    API.post("/interior-quotation", imagesFormData, {
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
    <section className="get-quote-area pt-60 pb-60">
      <div className="container">
        <div
          className="section-title mb-40"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <h2>
            Get A <span>Quotation</span>
          </h2>
        </div>
        {/* Get a Quote Form */}
        <div className="quote-form" data-aos="fade-up" data-aos-once="true">
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <Form.Group controlId="property_name" className="mb-4">
                  <Form.Label>Property Name *</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="property_name"
                      value={formValues.property_name}
                      onChange={handleInputChange}
                    />
                    <InputGroup.Text>
                      <AiOutlineEdit fontSize="18px" />
                    </InputGroup.Text>
                  </InputGroup>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.property_name}
                  </p>
                </Form.Group>
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
                <Form.Group controlId="message" className="mb-4">
                  <Form.Label>Message (any specific request)</Form.Label>
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
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.message}
                  </p>
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
                  name="images"
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
                className="btn_submit mb-0"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Request Quotation"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default GetQuote;
