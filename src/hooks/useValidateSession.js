import axios from "axios";
import { config } from "../constants";

const validateSession = async (setAuth) => {
  const metadata = localStorage.getItem("metadata");
  if (!metadata) return false;
  const url = `${config.url}/api/validate`;

  try {
    const res = await axios.post(url, metadata, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.status == 200 && res.data) {
      localStorage.setItem("metadata", JSON.stringify(res.data));
      setAuth(res.data.token);
      return true;
    }
    if (res.status !== 200) {
      return false;
    }
  } catch (error) {
    console.error("Error validating session:", error);
    return false;
  }
};

export default validateSession;
