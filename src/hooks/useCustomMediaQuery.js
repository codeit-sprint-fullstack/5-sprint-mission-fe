import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

function useCustomMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  const match = useMediaQuery({ query });

  useEffect(() => {
    setMatches(match);
  }, [match]);

  return matches;
}

export default useCustomMediaQuery;
