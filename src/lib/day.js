import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export function fromNow(time) {
  return dayjs(time).fromNow();
}

export function formatTime(time, format = "YYYY.MM.DD h:mm A") {
  return dayjs(time).format(format);
}

export function formatDay(time, format = "YYYY.MM.DD") {
  return dayjs(time).format(format);
}
