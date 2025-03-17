import styles from "@/styles/items.module.css";
import { ArticleSell } from "@/components/ArticleSell";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";

export default function Items() {
  return (
    <>
      <Header />
      <div className={styles.contentContainer}>
        <ArticleSell />
      </div>
      {/* <Footer /> */}
    </>
  );
}
