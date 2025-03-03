import Head from "next/head";
import Button from "@/components/Button";
import Input from "@/components/input/Input";
import Textarea from "@/components/input/Textarea";
import { useForm, Controller } from "react-hook-form";
import { getArticleDetail, updateArticle } from "@/lib/api";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    const data = await getArticleDetail({ articleId: id });

    return {
      props: {
        article: {
          id: data.id,
          title: data.title,
          content: data.content,
        },
      },
    };
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return {
      props: { article: null },
    };
  }
}

function EditArticle({ article }) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
    },
    mode: "onChange",
  });

  const buttonStatus = isValid ? "active" : "disabled";

  const onSubmit = async (data) => {
    try {
      await updateArticle(article.id, {
        title: data.title,
        content: data.content,
      });
      router.push(`/board/${article.id}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      // 에러 처리 (예: 알림 표시)
    }
  };

  return (
    <>
      <Head>
        <title>판다마켓 | 중고 거래 플랫폼 - 게시글 수정하기</title>
      </Head>
      <main className="flex flex-col flex-grow gap-[24px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-[700] text-gray-800">
              게시글 수정하기
            </h1>
            <Button type="submit" status={buttonStatus}>
              수정
            </Button>
          </div>
          <ul className="flex flex-col gap-[16px]">
            <li>
              <Controller
                control={control}
                name="title"
                defaultValue={article.title}
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
              {errors.title && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.title.message}
                </p>
              )}
            </li>
            <li>
              <Controller
                control={control}
                name="content"
                defaultValue={article.content}
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
              {errors.content && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.content.message}
                </p>
              )}
            </li>
          </ul>
        </form>
      </main>
    </>
  );
}

export default EditArticle;
