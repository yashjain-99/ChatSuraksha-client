import Form from "../components/form";
import { motion, useIsPresent } from "framer-motion";

const Login = () => {
  const isPresent = useIsPresent();
  return (
    <div className="login-container">
      <Form isFromRegister={false} />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </div>
  );
};

export default Login;
