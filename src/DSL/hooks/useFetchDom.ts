import { useEffect, useState } from "react";

export const useFetchDom = (activeDsl: string) => {
  const [dom, setdom] = useState<Response>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/renderdsl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(activeDsl),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = (await response.json()) as Response;
        setdom(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (activeDsl) {
      void fetchData();
    }
  }, [activeDsl]);
  return { dom };
};
