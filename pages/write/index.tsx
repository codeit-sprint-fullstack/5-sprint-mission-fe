import styles from "@/styles/bulletinBoard.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";

export default function BulletinBoard() {
  return (
    <>
      <Header />

      <div>
        <div>
          <p>게시글 쓰기</p>
          <div>등록</div>
        </div>
        <div>
          <p>*제목</p>
          <input type="text" />
        </div>
        <div>
          {" "}
          <p>*내용</p>
          <input type="text" />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
