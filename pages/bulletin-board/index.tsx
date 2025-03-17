import styles from "@/styles/bulletinBoard.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import { BulletinBoardBest } from "@/components/BulletinBoardBest";
import { BulletinBoardAll } from "@/components/BulletinBoardAll";

export default function BulletinBoard() {
  return (
    <>
      <Header />
      <div id={styles.bulletin_board}>
        <div id={styles.bulletin_board_box}>
          <div id={styles.best_box}>
            <p>베스트 게시글</p>
            <div>
              <BulletinBoardBest />
            </div>
          </div>

          <div>
            <div id={styles.writing_box}>
              <p>게시글</p>
              <Link href={"/"}>
                <p>글쓰기</p>
              </Link>
            </div>
            <div id={styles.search_box}>
              <div id={styles.search_content_box}>
                <Image
                  src={"/assets/ic_search.svg"}
                  alt={"mainPandaImg"}
                  width={24}
                  height={24}
                ></Image>
                <input
                  id={styles.input}
                  type="text"
                  placeholder="검색할 상품을 입력해주세요"
                />
              </div>
              <select name="" id={styles.select}>
                <option value="">최신순</option>
                <option value="">좋아요순</option>
              </select>
            </div>
            {/* 페이지네이션 커서로 해보기 */}
            <div>
              <BulletinBoardAll />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
