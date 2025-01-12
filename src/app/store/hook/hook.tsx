export const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: unknown[]) => {
    clearTimeout(timeout); // 이전 타이머 취소
    timeout = setTimeout(() => {
      func(...args); // 지정된 시간 후에 함수 호출
    }, delay);
  };
};
