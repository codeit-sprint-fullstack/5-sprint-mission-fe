// todo: react-hook-form 사용 할 때와 안 할 때의 차이 비교해보기
// todo: isLoading 처리 필요

import Textarea from "@/components/input/Textarea";
import Button from "@/components/Button";

import { useCreateComment } from "@/lib/queries/articles";
import { useForm, Controller } from "react-hook-form";

export default function CreateCommentSection({ articleId }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      content: "",
    },
    mode: "onChange",
  });

  const buttonStatus = isDirty && isValid ? "active" : "disabled";

  const { mutate: createComment, isLoading } = useCreateComment({ articleId });

  const onSubmit = (data) => {
    createComment(
      { content: data.content },
      {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          console.error("댓글 작성 실패", error);
          alert("댓글 작성에 실패했습니다.");
        },
      }
    );
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[16px]"
      >
        <Controller
          control={control}
          name="content"
          rules={{
            required: "댓글을 입력해주세요.",
          }}
          render={({ field: { value, onChange, ...field } }) => (
            <Textarea
              label="댓글달기"
              id="content"
              placeholder="댓글을 입력해주세요."
              value={value}
              onChange={onChange}
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          status={isLoading ? "disabled" : buttonStatus}
          classNames="ml-auto"
        >
          등록
        </Button>
      </form>
    </section>
  );
}
