import { useEffect, useState } from "react";

const useAuth = (
  { email, password, firstName, lastName, profilePicture },
  isFromRegister
) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const baseUrl = "https://chat-suraksha-api.onrender.com/api/auth";
  const endpoint = isFromRegister ? "register" : "login";
  const url = `${baseUrl}/${endpoint}`;
  const fullName = `${firstName}${lastName ? " " + lastName : ""}`;
  const body = isFromRegister
    ? { email, password, fullName, profilePicture }
    : { email, password };

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
          setError(null); // Clear any previous error.
          setLoading(false); // Set loading back to false.
        })
        .catch((error) => {
          setError(error.message || "An error occurred.");
          setLoading(false); // Set loading back to false.
        });
    }
  }, [email, password, firstName, lastName, profilePicture, isFromRegister]);

  return { data, loading, error };
};

export default useAuth;
