"use client";

import type { Article, PK } from "@/types";
import { useActionState, useEffect } from "react";
import Textarea from "@/components/inputGroup/Textarea";
import Button from "@/components/button/ButtonSubmit";
import createArticleCommentAction from "@/lib/actions/create-article-comment.action";
import SubmitContextFactory from "@/contexts/submit-context-factory";

// 동적 Context 생성
const { SubmitProvider, useSubmitState } = new SubmitContextFactory([
  "comment",
]).createContext();

export default function CommentCreateForm({
  articleId,
}: {
  articleId: PK<Article>;
}) {
  const [state, formAction, isPending] = useActionState(
    createArticleCommentAction,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (!state.status && state.message !== "") {
      alert(`댓글 작성: ${state.message}`);
    }
  }, [state]);

  return (
    <SubmitProvider>
      <form action={formAction} className="my-8">
        <input name="articleId" value={articleId} hidden readOnly />
        <Textarea
          name="comment"
          useSubmitState={useSubmitState}
          state={state}
        />
        <div className="flex justify-end mt-4">
          <Button useSubmitState={useSubmitState}>
            {isPending ? "작성중" : "등록"}
          </Button>
        </div>
      </form>
    </SubmitProvider>
  );
}
