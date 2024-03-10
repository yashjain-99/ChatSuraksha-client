import axios from "../api/axios";
import { useAuthContext } from "../contexts/AuthProvider";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuthContext();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
      params: {
        userId: auth.userId,
      },
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
