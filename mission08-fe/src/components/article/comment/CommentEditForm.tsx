interface CommentEditFormProps {
  articleId: string;
  onDone: () => void;
}

export default function CommentEditForm({
  articleId,
  onDone,
}: CommentEditFormProps) {
  return <p>저는 댓글 수정할 폼입니다</p>;
}
