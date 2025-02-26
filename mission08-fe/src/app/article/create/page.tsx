"use client";

import { SubmitProvider } from "@/contexts/SubmitContext";
import Button from "@/components/button/ButtonSubmit";
import Input from "@/components/inputGroup/Input";
import Textarea from "@/components/inputGroup/Textarea";
import createArticleAction from "@/lib/actions/create-article.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateArticle() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createArticleAction,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      router.push("/article");
    } else {
      alert(state.message);
    }
  }, [state, router]);

  return (
    <SubmitProvider fields={["title", "content"]}>
      <form action={formAction} className="py-4 px-6 mb-36">
        <section className="w-full flex items-center justify-between mb-8">
          <h1 className="text-gray-800 font-bold text-xl">게시글 작성</h1>
          <Button>{isPending ? "로딩중..." : "등록"}</Button>
        </section>

        <div className="w-full flex flex-col gap-6">
          <Input type="text" name="title" />
          <Textarea name="content" />
        </div>
      </form>
    </SubmitProvider>
  );
}
