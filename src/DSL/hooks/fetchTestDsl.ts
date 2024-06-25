import { useEffect, useState } from "react";

export const useFetchTestDsl = () => {
  const [dsl, setdsl] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/testdsl");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setdsl(data.dsl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
  }, []);
  return { dsl };
};
