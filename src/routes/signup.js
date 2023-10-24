import Form from "../components/form";
import { motion, useIsPresent } from "framer-motion";

const Signup = () => {
  const isPresent = useIsPresent();

  return (
    <div className="login-container">
      <Form isFromRegister={true} />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: 0,
          transition: { duration: 0.8, ease: "circOut" },
        }}
        exit={{ scaleX: 1, transition: { duration: 0.8, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </div>
  );
};

export default Signup;
