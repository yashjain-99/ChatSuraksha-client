import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthProvider";
import axios from "../api/axios";

const useAuth = (body, isFromRegister, setLoading) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const endpoint = isFromRegister ? "register" : "login";
  const url = `/auth/${endpoint}`;
  const { setAuth } = useAuthContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (body.email && body.password) {
          const response = await axios.post(url, JSON.stringify(body), {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });

          if (response.status !== 200) {
            const errorData = response.data;
            throw new Error(errorData.error);
          }

          const resData = response.data;

          if (!isFromRegister) {
            setAuth({ accessToken: resData.token, userId: resData.userId });
          }

          setData(resData);
          setError(null);
          setLoading(false);
        }
      } catch (error) {
        setError(error?.response?.data?.error || "An error occurred.");
        setLoading(false);
      }
    };

    fetchData();
  }, [body, isFromRegister]);

  return { data, error };
};

export default useAuth;
