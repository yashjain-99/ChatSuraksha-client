import Form from "../components/form";
import { useState } from "react";
const Login = () => {
  return (
    <div className="login-container">
      <Form isFromRegister={false} />
    </div>
  );
};

export default Login;
