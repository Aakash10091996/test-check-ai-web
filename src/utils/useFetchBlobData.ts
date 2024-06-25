/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect } from "react";
import { getRandomLink } from "@/utils/DSLConstants";

// Adjust the type to accept string or undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFetchBlobData = (blobUrl?: any) => {
  const [data, setData] = useState<string | null>(null); // Expect data to be a string now
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!blobUrl) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(getRandomLink(blobUrl));
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        const textData = await response.text(); // Convert the blob to text
        setData(textData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [blobUrl]);

  return { data, loading, error };
};

export default useFetchBlobData;
