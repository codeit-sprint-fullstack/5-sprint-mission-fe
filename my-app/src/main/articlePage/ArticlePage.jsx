import { useState } from "react";
import { ArticlePageBtnCreate } from "./articlePageBtnCreate/ArticlePageBtnCreate.jsx";
import "./articlePage.css";
export function ArticlePage({ currentPage, SetCurrentPage, totalCount }) {
  return (
    <div id="articlePage">
      <button className="buttonExtra">{"<"}</button>
      <ArticlePageBtnCreate
        currentPage={currentPage}
        SetCurrentPage={SetCurrentPage}
        totalCount={totalCount}
      />
      <button className="buttonExtra">{">"}</button>
    </div>
  );
}
