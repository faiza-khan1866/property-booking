import React, { useState } from "react";
import Sidebar from "../../layouts/Blogsidebar";
import { API } from "../../../http/API";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

const BlogDetails = ({ blogdetail }) => {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const initailObject = {
    name: "",
    email: "",
    blog_id: "",
    comment: "",
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { comment, name, email } = formValues;
    const errors = {};
    if (!comment) {
      errors.comment = "Please Enter Comment.";
    } else if (!name) {
      errors.name = "Please Enter Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid Email Address.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues, blog_id: blogdetail?.id };
    setLoading(true);
    API.post("/comments", updatedData)
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
    <section className="blog-detail-section pt-60">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="blog-details-box">
              <div className="blog-content">
                <h2 className="title">{blogdetail?.title}</h2>
                <h2 className="subtitle">{blogdetail?.sub_title}</h2>
                <ul className="blog-meta">
                  <li>
                    <i className="far fa-user" />
                    By {blogdetail?.writer?.name}
                  </li>

                  {/* {blogdetail.reviews > 0 || blogdetail.reviews !== "" ? ( */}
                  <li>
                    <i className="far fa-comments" />2 Comments
                  </li>
                  {/* ) : (
                    ""
                  )} */}
                  <li>
                    <i className="far fa-calendar-alt" />
                    {new Date(blogdetail?.created_at).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </li>
                </ul>
                <div
                  className="blog-detail"
                  dangerouslySetInnerHTML={{
                    __html: blogdetail?.description,
                  }}
                />
              </div>
              <div className="comment-section mt-40">
                <h3 className="box-title">
                  <span>{blogdetail?.comments?.length}</span> Comments
                </h3>
                <ul className="comments-list mb-40">
                  {blogdetail?.comments?.map((review, i) => (
                    <li key={i}>
                      <div className="comment-img">
                        {/* <img
                          src={process.env.PUBLIC_URL + "/" + review.img}
                          alt={review.name}
                        /> */}
                        <div className="avatarStyle">
                          <span>{review?.name?.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="comment-desc">
                        <div className="desc-top">
                          <h6>{review?.name}</h6>
                          <span className="date">
                            {new Date(review?.created_at).toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </span>
                          {/* <Link to="#" className="reply-link">
                            <i className="far fa-reply" />
                            Reply
                          </Link> */}
                        </div>
                        <p>{review?.comment}</p>
                      </div>
                      {/* <ul className="children">
                        {review.replies.map((reply, i) => (
                          <li key={i}>
                            <div className="comment-img">
                              <img
                                src={process.env.PUBLIC_URL + "/" + reply.img}
                                alt={reply.name}
                              />
                            </div>
                            <div className="comment-desc">
                              <div className="desc-top">
                                <h6>{reply.name}</h6>
                                <span className="date">{reply.date}</span>
                                <Link to="#" className="reply-link">
                                  <i className="far fa-reply" />
                                  Reply
                                </Link>
                              </div>
                              <p>{reply.comment}</p>
                            </div>
                          </li>
                        ))}
                      </ul> */}
                    </li>
                  ))}
                </ul>
                <h3 className="box-title">
                  Post your <span>Comment</span>
                </h3>
                <div className="comment-form">
                  <Form data-aos="fade-up" data-aos-once="true">
                    <Form.Group controlId="comment" className="mb-4">
                      <Form.Label>Comment *</Form.Label>
                      <InputGroup>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="comment"
                          value={formValues.comment}
                          onChange={handleInputChange}
                        />
                        <InputGroup.Text>
                          <AiOutlineEdit fontSize="18px" />
                        </InputGroup.Text>
                      </InputGroup>
                      <p className="mt-2 text-danger form_error_msg">
                        {errors?.comment}
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
          {/* Blog Sidebar */}
          <div className="col-lg-4 col-md-10 col-sm-12">
            <div className="sidebar">
              {/* About Author Widget */}

              <div className="widget about-author-widget mb-40">
                <h5 className="widget-title">About the Writer</h5>
                <div className="author-box">
                  <img
                    src={blogdetail?.writer?.featured_img}
                    alt={blogdetail?.writer?.name}
                    className="img-fluid"
                  />
                  <h6>{blogdetail?.writer?.name}</h6>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogdetail?.writer?.description,
                    }}
                  />
                  <ul className="social-icon">
                    <li>
                      <a
                        rel={"external"}
                        href={blogdetail?.writer?.social_links?.facebook}
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a
                        rel={"external"}
                        href={blogdetail?.writer?.social_links?.instagram}
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a
                        rel={"external"}
                        href={blogdetail?.writer?.social_links?.linkedin}
                      >
                        <i className="fab fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a
                        rel={"external"}
                        href={blogdetail?.writer?.social_links?.whatsapp}
                      >
                        <i className="fab fa-whatsapp" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Sidebar sliderImages={blogdetail?.slider_image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
