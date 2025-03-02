"use client";

import { Button } from "./Button";
import SearchBar from "./SearchBar";
import SortSelection from "./SortSelection";
import BoardListItem from "./BoardListItem";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPosts, Post } from "@/services/postServices";

export default function BoardSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-10 mx-auto max-w-[1200px] px-4 sm:px-6 pb-10">
      <TitleArea />
      <SearchArea />
      <BoardListArea posts={posts} />
    </div>
  );
}

// 제목
function TitleArea() {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xl font-bold">게시글</p>
      <Link href="/board/form">
        <Button name="글쓰기" />
      </Link>
    </div>
  );
}

// 검색
function SearchArea() {
  return (
    <div className="flex gap-2">
      <SearchBar />
      <SortSelection />
    </div>
  );
}

// 게시글
function BoardListArea({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <BoardListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
