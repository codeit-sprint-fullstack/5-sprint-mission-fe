"use client";

import Button from "@/components/button/ButtonSubmit";
import Input from "@/components/inputGroup/Input";
import Textarea from "@/components/inputGroup/Textarea";
import createArticleAction from "@/lib/actions/create-article.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubmitContextFactory from "@/contexts/SubmitContextFactory";
import { useQueryClient } from "@tanstack/react-query";

// 동적 Context 생성
const { SubmitProvider, useSubmitState } = new SubmitContextFactory([
  "title",
  "content",
]).createContext();

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createArticleAction,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      // 게시글 작성 성공 시
      queryClient.invalidateQueries({ queryKey: ["articles"] }); // 캐시 초기화 (SWR이라서 캐싱되어 있어서 업데이트가 따로 안됨)
      router.push("/article");
    } else {
      // 게시글 작성 실패 시
      alert(state.message);
    }
  }, [state, router, queryClient]);

  return (
    <SubmitProvider>
      <form action={formAction} className="py-4 px-6 mb-36">
        <section className="w-full flex items-center justify-between mb-8">
          <h1 className="text-gray-800 font-bold text-xl">게시글 작성</h1>
          <Button useSubmitState={useSubmitState}>
            {isPending ? "작성중" : "등록"}
          </Button>
        </section>

        <div className="w-full flex flex-col gap-6">
          <Input type="text" name="title" useSubmitState={useSubmitState} />
          <Textarea name="content" useSubmitState={useSubmitState} />
        </div>
      </form>
    </SubmitProvider>
  );
}
