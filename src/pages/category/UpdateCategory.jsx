import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addCategoryValidator from "../../validators/addCategoryValidator";

const initialFormData = {
  title: "",
  desc: "",
};

const initialFormError = {
  title: "",
};

const UpdateCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const categoryId = params.id;
  console.log(categoryId);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (categoryId) {
      const getCategory = async () => {
        try {
          // Api request
          const response = await axios.get(`/category/${categoryId}`);
          const data = response.data.data;

          setFormData({ title: data.category.title, desc: data.category.desc });
        } catch (error) {
          setLoading(false);

          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            autoClose: true,
          });
        }
      };
      getCategory();
    }
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = addCategoryValidator({ title: formData.title });

    if (errors.title) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // api request
        const response = await axios.put(`/category/${categoryId}`, formData);
        const data = response.data;

        toast.success(data.message, {
          autoClose: true,
        });

        // toast.success(data.message, {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: true,
        // });

        setFormData(initialFormData);
        setFormError(initialFormError);

        setLoading(false);
        navigate("/categories");
      } catch (error) {
        setLoading(false);
        // console.log(error.response);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          autoClose: true,
        });
      }
    }
  };

  return (
    <div>
      <button
        className="button button-block"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Technology"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="desc"
              placeholder="Lorem ipsum"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={`${loading ? "Updating ...." : "Update"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
