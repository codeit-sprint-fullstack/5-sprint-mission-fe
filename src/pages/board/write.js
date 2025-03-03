import Head from "next/head";
import Button from "@/components/Button";
import Input from "@/components/input/Input";
import Textarea from "@/components/input/Textarea";
import { createArticle } from "@/lib/api";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

function WriteArticle() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const buttonStatus = isValid ? "active" : "disabled";

  const onSubmit = async (data) => {
    try {
      const requestData = {
        title: data.title,
        content: data.content,
      };
      const articleId = await createArticle(requestData);
      router.push(`/board/${articleId}`);
    } catch (error) {
      console.error("게시글 생성 실패:", error);
    }
  };

  return (
    <>
      <Head>
        <title>판다마켓 | 중고 거래 플랫폼 - 게시글 쓰기</title>
      </Head>
      <main className="flex flex-col flex-grow gap-[24px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-[700] text-gray-800">
              게시글 쓰기
            </h1>
            <Button type="submit" status={buttonStatus}>
              등록
            </Button>
          </div>
          <ul className="flex flex-col gap-[16px]">
            <li>
              <Controller
                control={control}
                name="title"
                rules={{
                  required: "제목은 필수 입력값입니다",
                }}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    label="*제목"
                    id="title"
                    placeholder="제목을 입력해주세요"
                    value={value}
                    onChange={onChange}
                    {...field}
                  />
                )}
              />
            </li>
            <li>
              <Controller
                control={control}
                name="content"
                rules={{
                  required: "내용은 필수 입력값입니다",
                }}
                render={({ field: { value, onChange, ...field } }) => (
                  <Textarea
                    label="*내용"
                    id="content"
                    placeholder="내용을 입력해주세요"
                    size="large"
                    value={value}
                    onChange={onChange}
                    {...field}
                  />
                )}
              />
            </li>
          </ul>
        </form>
      </main>
    </>
  );
}

export default WriteArticle;
