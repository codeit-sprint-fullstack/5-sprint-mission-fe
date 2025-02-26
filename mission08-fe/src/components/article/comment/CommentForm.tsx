"use client";

import Textarea from "@/components/inputGroup/Textarea";
import Button from "@/components/button/ButtonSubmit";
import { useActionState, useEffect } from "react";
import CreateArticleCommentAction from "@/lib/actions/create-article-comment.action";
import type { Article, PK } from "@/types";
import SubmitContextFactory from "@/contexts/SubmitContextFactory";

// 동적 Context 생성
const { SubmitProvider, useSubmitState } = new SubmitContextFactory([
  "comment",
]).createContext();

export default function CommentForm({ articleId }: { articleId: PK<Article> }) {
  const [state, formAction, isPending] = useActionState(
    CreateArticleCommentAction,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (!state.status && state.message !== "") {
      alert(state.message);
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
