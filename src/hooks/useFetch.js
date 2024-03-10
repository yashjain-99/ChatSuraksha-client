import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";

const useFetch = ({ endpoint, id, setPercentCompleted = () => {} }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `${endpoint}${id ? `/${id}` : ""}`;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      axiosPrivate
        .get(url, {
          onDownloadProgress: function (progressEvent) {
            setPercentCompleted(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
          navigate("/login");
        });
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export const getConversation = (
  userId,
  otherUserId,
  setConversations,
  setLoading
) => {
  const axiosPrivate = useAxiosPrivate();
  const endpoint = "/conversations";
  axiosPrivate
    .get(endpoint, {
      params: {
        userId,
        otherUserId,
      },
    })
    .then((response) => {
      setConversations(response.data.conversations);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
      navigate("/login");
    });
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
  useEffect(() => {
    if (!loading) {
      setConversationInbox(inbox.inbox);
      setLoading(false);
    }
  }, [inbox, loading]);
};

export default useFetch;

// Depreciated: Use later when using pagination
// export const getAllConversations = (
//   userId,
//   setConversations,
//   setLoading,
//   setPercentCompleted
// ) => {
//   const { data: conversations, loading } = useFetch({
//     endpoint: "/conversations",
//     id: userId,
//     setPercentCompleted,
//   });
//   useEffect(() => {
//     if (!loading) {
//       setConversations(conversations);
//       setLoading(false);
//     }
//   }, [conversations, loading]);
// };
