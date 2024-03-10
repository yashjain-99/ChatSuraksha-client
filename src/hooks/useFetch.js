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
      try {
        const response = await axiosPrivate.get(url, {
          onDownloadProgress: function (progressEvent) {
            setPercentCompleted(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        navigate("/login");
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
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
