import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  BulletinBoardList,
  BulletinBoard,
} from "@/core/bulletinBoardApiService";
import styles from "@/styles/bulletinBoardAll.module.css";

export const BulletinBoardAll = () => {
  const [boards, setBoards] = useState<BulletinBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // 데이터 로드 함수
  const loadMore = async (cursor?: string) => {
    try {
      const response = await BulletinBoardList.GetAll({ cursor, limit: 5 });
      setBoards((prev) => [...prev, ...response.data]);
      setNextCursor(response.nextCursor);
      setHasMore(response.nextCursor !== null);
    } catch (err) {
      console.error(
        "데이터 로드 실패:",
        err instanceof Error ? err.message : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && !loading && hasMore) {
        setLoading(true);
        loadMore(nextCursor!);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, nextCursor]);

  if (loading && boards.length === 0)
    return <div className={styles.loading}>로딩 중...</div>;

  return (
    <div id={styles.container}>
      {boards.map((board) => (
        <div id={styles.content_box} key={board.id}>
          <div id={styles.top_content}>
            <h3 id={styles.title}>{board.title}</h3>
            <Image
              src={board.img || "/assets/default_img.svg"}
              alt={board.img ? "상품 이미지" : "기본 이미지"}
              width={72}
              height={72}
              id={styles.thumbnail}
            />
          </div>
          <div id={styles.bottom_content}>
            <div id={styles.bottom_content_left}>
              <Image
                src={board.user.profileImg || "/assets/basic_img.svg"}
                alt={
                  board.user.profileImg ? "프로필 이미지" : "기본 프로필 이미지"
                }
                width={24}
                height={24}
                id={styles.thumbnail}
              />
              <div id={styles.nickname}>{board.user.nickName}</div>
              <time id={styles.date}>{board.updatedAt}</time>
            </div>
            <div id={styles.bottom_content_right}>
              <Image
                src="/assets/ic_heart.svg"
                alt="좋아요 아이콘"
                width={16}
                height={16}
              />
              <span id={styles.like_count}>{board.like}</span>
            </div>
          </div>
        </div>
      ))}

      {loading && <div className={styles.loading}>더 불러오는 중...</div>}
      {!hasMore && (
        <div className={styles.end}>모든 게시글을 불러왔습니다.</div>
      )}
    </div>
  );
};
