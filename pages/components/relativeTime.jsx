import { useEffect, useState } from "react";

export default function RelativeTime({ timestamp }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateRelativeTime = () => {
      const now = new Date();
      const past = new Date(timestamp);
      const diff = Math.floor((now - past) / 1000); // 초 단위 차이 계산

      if (diff < 60) setTimeAgo(`${diff}초 전`);
      else if (diff < 3600) setTimeAgo(`${Math.floor(diff / 60)}분 전`);
      else if (diff < 86400) setTimeAgo(`${Math.floor(diff / 3600)}시간 전`);
      else if (diff < 604800) setTimeAgo(`${Math.floor(diff / 86400)}일 전`);
      else setTimeAgo(new Date(timestamp).toLocaleDateString());
    };

    updateRelativeTime();
    const interval = setInterval(updateRelativeTime, 60000); // 1분마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [timestamp]);

  return <span>{timeAgo}</span>;
}
