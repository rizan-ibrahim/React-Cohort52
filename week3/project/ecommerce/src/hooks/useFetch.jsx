import { useEffect, useState } from "react";

const useFetch = (fetchFunction, params = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchFunction(params);
      setData(result);
    } catch (err) {
      setError("Fetch error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
