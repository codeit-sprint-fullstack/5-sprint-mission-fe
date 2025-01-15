import { useLayoutEffect, useState } from "react";

export const useMediaQuery = () => {
  const [media, setMedia] = useState(() => {
    const width = window.innerWidth;
    if (width > 1200) return "pc";
    if (width > 743) return "tablet";
    return "mobile";
  });

  useLayoutEffect(() => {
    const updateMedia = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setMedia("pc");
      } else if (width > 743) {
        setMedia("tablet");
      } else {
        setMedia("mobile");
      }
    };

    updateMedia();

    window.addEventListener("resize", updateMedia);

    return () => {
      window.removeEventListener("resize", updateMedia);
    };
  }, []);

  return media;
};
