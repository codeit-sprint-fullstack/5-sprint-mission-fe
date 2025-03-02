import { useQuery } from "@tanstack/react-query";

interface Post {
  content: string;
}
function Test() {
  const BASE_URL = "https://learn.codeit.kr/api/codestudit";

  async function getPosts() {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers : {
        "Authorization" : "ABC",
      }
    });
    return await response.json();
  }

  const result = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 10,
  });

  if (result.isPending) return <div>로딩중...</div>;

  return (
    <div>
      {result.data?.results &&
        result.data.results.map((post: Post) => (
          <div>{JSON.stringify(post.content)}</div>
        ))}
    </div>
  );
}
export default Test;
