import { useEffect, useState } from "react";
import { config } from "../constants";
import axios from "axios";

const useFetch = ({ endpoint, id, setPercentCompleted }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = `${config.url}/api`;
  const url = `${baseUrl}${endpoint}${id ? `/${id}` : ""}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(url, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            onDownloadProgress: function (progressEvent) {
              setPercentCompleted(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            },
          })
          .then((response) => {
            setData(response.data);
            setLoading(false);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export const getAllConversations = (
  userId,
  setConversations,
  setLoading,
  setPercentCompleted
) => {
  const { data: conversations, loading } = useFetch({
    endpoint: "/conversations",
    id: userId,
    setPercentCompleted,
  });
  useEffect(() => {
    if (!loading) {
      setConversations(conversations);
      setLoading(false);
    }
  }, [conversations, loading]);
};

export default useFetch;
