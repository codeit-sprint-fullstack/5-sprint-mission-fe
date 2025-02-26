"use client";

import Button from "@/components/button/ButtonRectangle";
import Link from "next/link";
import Filter from "@/components/shared/Filter";
import Search from "@/components/shared/Search";
import type { Article, Query } from "@/types";
import PostItem from "./ArticleItem";
import { fetchData } from "@/lib/apis/service.ts";
import { useEffect, useState } from "react";

interface FetchCursorData {
  hasNextPage: boolean;
  nextCursor: string;
  postList: Article[];
}

// 로컬 스토리지 나중에 생각하기

export default function ArticleList() {
  const [postList, setPostList] = useState<Article[]>([]);
  const [query, setQuery] = useState<Query>({
    keyword: "",
    sortBy: "latest",
    cursorId: undefined,
  });
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetchData<FetchCursorData>(
        "/article",
        { next: { revalidate: 3 } },
        query
      );

      if (!data) {
        return setPostList([]);
      }

      if (query.cursorId) {
        setPostList((prev) => [...prev, ...data.postList]);
      } else {
        setPostList(data.postList);
      }

      setHasNextPage(data.hasNextPage);
      setNextCursor(data.nextCursor);
    };

    fetchPosts();
  }, [query]);

  const loadMorePosts = () => {
    if (hasNextPage) {
      setQuery((prev) => ({ ...prev, cursorId: nextCursor }));
    }
  };

  return (
    <>
      <section className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-gray-800 font-bold text-xl">게시글</h1>
        <Link href="/article/create">
          <Button isActive={true}>글쓰기</Button>
        </Link>
      </section>

      <section className="flex gap-4 mb-4 md:mb-6">
        <Search
          onSearch={(keyword) =>
            setQuery((prev) => ({ ...prev, keyword, cursorId: undefined }))
          }
        />
        <Filter
          sortBy={query.sortBy}
          onSort={(sortBy) =>
            setQuery((prev) => ({ ...prev, sortBy, cursorId: undefined }))
          }
        />
      </section>

      {postList.length < 1 && <div>게시글이 없습니다.</div>}

      {postList.length > 0 && (
        <section className="flex flex-col gap-6">
          {postList.map((post) => (
            <Link href={`/article/${post.id}`} key={post.id}>
              <PostItem key={post.id} post={post} />
            </Link>
          ))}
        </section>
      )}

      {/* 더보기 버튼 */}
      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button isActive={true} onClick={loadMorePosts}>
            더 보기
          </Button>
        </div>
      )}
    </>
  );
}
