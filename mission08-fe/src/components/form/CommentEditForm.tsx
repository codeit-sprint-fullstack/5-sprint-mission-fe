import type { PK, ArticleComment, Article } from "@/types";
import { useActionState, useEffect } from "react";
import editArticleCommentAction from "@/lib/actions/edit-article-comment.action";
import Textarea from "../inputGroup/Textarea";
import Button from "@/components/button/ButtonSubmit";
import SubmitContextFactory from "@/contexts/submit-context-factory";

// 동적 Context 생성
const { SubmitProvider, useSubmitState } = new SubmitContextFactory([
  "comment",
]).createContext();

interface CommentEditFormProps {
  originComment: string;
  articleId: PK<Article>;
  commentId: PK<ArticleComment>;
  onDone: () => void;
}

export default function ArticleCommentEditForm({
  originComment,
  articleId,
  commentId,
  onDone,
}: CommentEditFormProps) {
  const [state, formAction, isPending] = useActionState(
    editArticleCommentAction,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (!state.status && state.message !== "") {
      alert(`댓글 수정: ${state.message}`);
    }

    if (state.status) {
      onDone(); // 댓글 수정이 성공하면 수정 모드 끄기
    }
  }, [state, onDone]);

  return (
    <SubmitProvider>
      <form action={formAction} className="my-8">
        <input name="originComment" value={originComment} hidden readOnly />
        <input name="commentId" value={commentId} hidden readOnly />
        <input name="articleId" value={articleId} hidden readOnly />
        <Textarea
          name="comment"
          useSubmitState={useSubmitState}
          initValue={originComment}
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
