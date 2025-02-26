const MAX = 30;

export default function titleFormatter(title: string): string {
  return title.length > MAX ? title.slice(0, MAX) + "..." : title;
}
