import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  BulletinBoardList,
  BulletinBoard,
} from "@/core/bulletinBoardApiService";
import styles from "@/styles/bulletinBoardBest.module.css";

export const BulletinBoardBest = () => {
  const [boards, setBoards] = useState<BulletinBoard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect 시작");
    BulletinBoardList.TopLike()
      .then((data) => {
        setBoards(data);
      })
      .catch((err: any) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div id={styles.container}>
      {boards.map((board, idx) => (
        <div id={styles.content_box} key={idx}>
          <div id={styles.top_content}>
            <Image
              src={"/assets/img_badge.svg"}
              alt={"베스트이미지"}
              width={102}
              height={30}
            ></Image>
          </div>
          <div id={styles.main_content}>
            <div>{board.title}</div>
            <Image
              src={board.img || "/assets/default_img.svg"}
              alt={
                board.img === "default_img" ? "Default Image" : "상품 이미지"
              }
              width={72}
              height={72}
            />
          </div>

          <div id={styles.bottom_content}>
            <div id={styles.bottom_content_left}>
              <div>{board.user.nickName}</div>
              <div id={styles.bottom_content_left_like}>
                <Image
                  src={"/assets/ic_heart.svg"}
                  alt={"headerPandaImg"}
                  width={16}
                  height={16}
                ></Image>
                <div>{board.like}</div>
              </div>
            </div>
            <div>{board.updatedAt}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
