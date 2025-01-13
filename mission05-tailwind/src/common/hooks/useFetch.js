import { useState, useEffect } from "react";

export default function useFetch(fetchFunction, params) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStartTime, setLoadingStartTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStartTime(Date.now()); // 로딩 시작 시간 기록
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchFunction(params);
        setData(result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        const loadingEndTime = Date.now(); // 로딩 종료 시간 기록

        // skeleton을 일정시간 보여주기 위한 작업
        // 소요된 시간 계산
        const loadingDuration = loadingEndTime - loadingStartTime;
        console.log("loadingDuration: ", loadingDuration);
        if (loadingDuration < 2000) {
          // 2000ms 이하일 경우 추가 대기
          setTimeout(() => {
            setIsLoading(false);
          }, 2000 - loadingDuration);
        } else {
          setIsLoading(false); // 로딩 완료
        }
      }
    };

    fetchData();
  }, [JSON.stringify(params)]); // params를 직렬화하여 의존성 배열로 추가

  return { data, isLoading, error };
}
