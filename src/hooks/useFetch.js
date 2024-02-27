import { useEffect, useState } from "react";
import { config } from "../constants";
import axios from "axios";

const BASE_URL = `${config.url}/api`;

const useFetch = ({ endpoint, id, setPercentCompleted = () => {} }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `${BASE_URL}${endpoint}${id ? `/${id}` : ""}`;

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

export const getConversation = (
  userId,
  otherUserId,
  setConversations,
  setLoading
) => {
  const endpoint = "/conversations";
  const url = `${BASE_URL}${endpoint}`;
  try {
    axios
      .get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        params: {
          userId,
          otherUserId,
        },
      })
      .then((response) => {
        setConversations(response.data.conversations);
        setLoading(false);
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};

export const getInbox = (
  userId,
  setConversationInbox,
  setLoading,
  setPercentCompleted
) => {
  const { data: inbox, loading } = useFetch({
    endpoint: "/inbox",
    id: userId,
    setPercentCompleted,
  });
  console.log(inbox);
  useEffect(() => {
    if (!loading) {
      setConversationInbox(inbox.inbox);
      setLoading(false);
    }
  }, [inbox, loading]);
};

export default useFetch;
