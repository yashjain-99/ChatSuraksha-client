import { useEffect, useState } from "react";
import { config } from "../constants";
const useAuth = (body, isFromRegister) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const baseUrl = `${config.url}/auth`;
  const endpoint = isFromRegister ? "register" : "login";
  const url = `${baseUrl}/${endpoint}`;

  useEffect(() => {
    if (body.email && body.password) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
          }
          return res.json();
        })
        .then((resData) => {
          if (!isFromRegister) localStorage.setItem("token", resData.token);
          setData(resData);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message || "An error occurred.");
          setLoading(false);
        });
    }
  }, [body, isFromRegister]);

  return { data, loading, error };
};

export default useAuth;
