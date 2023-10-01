import { useEffect, useState } from "react";

const useFetch = ({ endpoint, id }) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const baseUrl = "https://chat-suraksha-api.onrender.com/api";
  const url = `${baseUrl}${endpoint}${id ? `/${id}` : ""}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setloading(false);
      });
  }, [url]);

  return { data, loading };
};

export const useInitialSetup = () => {
  const { data: metadata, loading: metadataLoading } = useFetch({
    endpoint: "/metadata",
  });
  const { data: inbox, loading: inboxLoading } = useFetch({
    endpoint: "/inbox",
  });
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (!metadataLoading && !inboxLoading) {
      setAllLoaded(true);
    }
  }, [metadataLoading, inboxLoading]);

  return { metadata, inbox, allLoaded };
};

export const getAllConversations = (userId, setConversations, setLoading) => {
  const { data: conversations, loading } = useFetch({
    endpoint: "/conversations",
    id: userId,
  });
  useEffect(() => {
    if (!loading) {
      setConversations(conversations);
      setLoading(false);
    }
  }, [conversations, loading]);
};

export default useFetch;
