import styles from "@/styles/main.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";

export default function Main() {
  return (
    <>
      <Header />
      <div className="main">
        {/* <!-- 상단 이미지 --> */}
        <nav id={styles.main_nav_box}>
          <div id={styles.main_nav_content_box}>
            <div id="nav_top">
              <div id={styles.main_nav_text_box}>
                <p>일상의 모든 물건을</p>
                <p>거래해 보세요</p>
              </div>
              <Link href={"/items"}>
                <div id={styles.main_nav_link}>구경하러 가기</div>
              </Link>
            </div>
            <div id={styles.main_nav_img}>
              <Image
                src={"/assets/main-panda.svg"}
                alt={"mainPandaImg"}
                width={746}
                height={340}
                layout="responsive"
                sizes="(max-width: 743px) 100vw, (max-width: 1199px) 744px, 746px"
              ></Image>
            </div>
          </div>
        </nav>
        {/* <!-- 중간 머시기 --> */}
        <section id="middle_part">
          {/* <!-- 1번째 섹션 --> */}
          <div className="middle_part_section">
            <div className="middle_part_section_box">
              <Image
                src={"/assets/Img_home_01.svg"}
                alt={"mainSection1Img"}
                width={588}
                height={444}
              ></Image>
              <div id="section_1_text">
                <p>Hot item</p>
                <p>
                  인기 상품을
                  <br />
                  확인해 보세요
                </p>
                <p>
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다 마켓에서 확인해 보세요
                </p>
              </div>
            </div>
          </div>
          {/* <!-- 2번째 섹션 --> */}
          <div className="middle_part_section">
            <div
              id="middle_part_section_box_reverse"
              className="middle_part_section_box"
            >
              <Image
                src={"/assets/Img_home_02.svg"}
                alt={"mainSection2Img"}
                width={588}
                height={444}
              ></Image>
              <div id="section_2_text">
                <p>Search</p>
                <p>
                  구매를 원하는
                  <br />
                  상품을 검색하세요
                </p>
                <p>
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </p>
              </div>
            </div>
          </div>
          {/* <!-- 3번째 섹션 --> */}
          <div className="middle_part_section">
            <div className="middle_part_section_box">
              <Image
                src={"/assets/Img_home_03.svg"}
                alt={"mainSection3Img"}
                width={588}
                height={444}
              ></Image>
              <div id="section_3_text">
                <p>Register</p>
                <p>
                  판매를 원하는
                  <br />
                  상품을 등록하세요
                </p>
                <p>
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </div>
    </>
  );
}
