import { Button, Form } from "react-bootstrap";
import "./Form.css";
import { useState } from "react";

import axios from "../../Api/Axios";
import * as URLS from "../../Api/Urls";

export default function DataForm() {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [productDetailFormData, setProductDetailFormData] = useState({
    productDetail: "",
  });

  const handleFormChange = (e) => {
    e.preventDefault();
    setErrors({});

    const { name, value } = e.target;

    setProductDetailFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.productDetail || data.productDetail === "") {
      errors.productDetail = "Product Description is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationForm = validateForm(productDetailFormData);

    if (Object.keys(validationForm).length === 0) {
      setLoader(true);
      try {
        const response = await axios.post(
          URLS.SubmitProductFormUrl,
          {
            formData: productDetailFormData,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          setProductDetailFormData({
            productDetail: "",
          });
          

          setErrors({});
        } else if(response.status === 400) {
          alert(response.data.data);
        } else {
          alert("Some Error, Please Try Again");
        }
      } catch (e) {
        alert("Some Error, Please Try Again");
      }

      setLoader(false);
    } else {
      setErrors(validationForm);
    }
  };

  return (
    <>
      <div className=" container dataForm_Container">
        <Form onSubmit={handleSubmit} className="pt-5">
          <Form.Group
            className=" mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Product Details</Form.Label>
            <Form.Control
              placeholder="Enter Product Details"
              name="productDetail"
              className="form-control"
              as="textarea"
              rows={3}
              isInvalid={errors.productDetail}
              value={productDetailFormData.productDetail}
              onChange={handleFormChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.productDetail}
            </Form.Control.Feedback>
          </Form.Group>

          <Button disabled={loader} style={{minWidth: '100px'}} variant="primary" type="submit">
            {loader ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  
                  style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto',}}
                  width="23px"
                  height="23px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M18 50A32 32 0 0 0 82 50A32 34.3 0 0 1 18 50"
                    fill="#1d0e0b"
                    stroke="none"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      dur="1s"
                      repeatCount="indefinite"
                      keyTimes="0;1"
                      values="0 50 51.15;360 50 51.15"
                    />
                  </path>
                </svg>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </div>
    </>
  );
}
