import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useValidate from "../hooks/useValidateFormData";
import FormBackground from "./form-background";
import useFormattedUserInput from "../hooks/useFormattedUserInput";
import Loader from "./loader";
import toast from "react-hot-toast";

const Form = ({ isFromRegister = false }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: metadata, error: metadataError } = useAuth(
    data,
    isFromRegister,
    setLoading
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else if (metadataError) {
      toast.error(metadataError);
      console.log(metadataError);
    } else if (metadata) {
      toast("Good to Go!", {
        icon: "🚀",
      });
      if (isFromRegister) {
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [loading, metadataError, metadata]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const formDataJson = Object.fromEntries(formData);
    const { error, isValid } = useValidate(formDataJson, isFromRegister);
    if (!isValid) {
      toast.error(error);
      setLoading(false);
      return;
    }
    const formattedUserInput = useFormattedUserInput(
      formDataJson,
      isFromRegister
    );
    setData(formattedUserInput);
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("metadata", JSON.stringify(metadata));
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <FormBackground />
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="header">{isFromRegister ? "Sign up" : "Sign in"}</h1>
        {isFromRegister && (
          <div className="form-header">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              required
            />
            <input type="text" name="lastName" placeholder="Last name" />
          </div>
        )}
        <div className="form-body">
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {isFromRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          )}
        </div>
        <div className="form-footer">
          <button type="submit">{isFromRegister ? "Register" : "Login"}</button>
          {isFromRegister ? (
            <span>
              Already have an account, <Link to="/login">Sign in</Link>
            </span>
          ) : (
            <span>
              Don't have an account, <Link to="/signup">Register</Link>
            </span>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
