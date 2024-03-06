import { useState, useEffect } from "react";

export default function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function startFetching() {
      if (url) {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.json();
        if (!ignore) {
          setData(data);
        }
      }
    }
    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
