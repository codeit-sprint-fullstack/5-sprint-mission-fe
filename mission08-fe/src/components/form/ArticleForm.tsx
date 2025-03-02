"use client";

import Button from "@/components/button/ButtonSubmit";
import Input from "@/components/inputGroup/Input";
import Textarea from "@/components/inputGroup/Textarea";
import createArticleAction from "@/lib/actions/create-article.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubmitContextFactory from "@/contexts/submit-context-factory";
import { useQueryClient } from "@tanstack/react-query";
import editArticleAction from "@/lib/actions/edit-article.action";
import type { Article } from "@/types";

// 동적 Context 생성
const { SubmitProvider, useSubmitState } = new SubmitContextFactory([
  "title",
  "content",
]).createContext();

interface ArticleFormProps {
  action: "create" | "edit";
  article?: Article;
}

export default function ArticleForm({ action, article }: ArticleFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isCreate = action === "create";
  const serverAction = isCreate ? createArticleAction : editArticleAction;
  const [state, formAction, isPending] = useActionState(serverAction, null);

  const { title = "", content = "" } = article || {};

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      // 게시글 작성 및 수정 성공 시
      queryClient.invalidateQueries({ queryKey: ["articles"] }); // 캐시 초기화 (SWR이라서 캐싱되어 있어서 업데이트가 따로 안됨)
      router.replace("/article"); // 게시글 목록으로 이동 후 뒤로가기 방지가 안되네...? 나중에 다시 보기
    } else {
      // 게시글 작성 실패 시
      alert(`게시글 작성: ${state.message}`);
    }
  }, [state, router, queryClient]);

  return (
    <SubmitProvider>
      <form action={formAction} className="py-4 px-6 mb-36">
        {article && (
          <input
            name="article"
            value={JSON.stringify(article)}
            hidden
            readOnly
          />
        )}

        <section className="w-full flex items-center justify-between mb-8">
          <h1 className="text-gray-800 font-bold text-xl">
            게시글 {isCreate ? "작성" : "수정"}
          </h1>
          <Button useSubmitState={useSubmitState}>
            {isPending ? "작성중" : "등록"}
          </Button>
        </section>

        <div className="w-full flex flex-col gap-6">
          <Input
            type="text"
            name="title"
            useSubmitState={useSubmitState}
            initValue={title}
          />
          <Textarea
            name="content"
            useSubmitState={useSubmitState}
            initValue={content}
          />
        </div>
      </form>
    </SubmitProvider>
  );
}
