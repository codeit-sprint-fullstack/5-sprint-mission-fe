import { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./ButtonRectangle";
import type { SubmitContext } from "@/contexts/submit-context-factory";

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  useSubmitState: () => Pick<SubmitContext, "submitState">;
}

export default function ButtonSubmit({
  children,
  useSubmitState,
  ...props
}: ButtonSubmitProps) {
  const { submitState } = useSubmitState();
  const isActive = Object.values(submitState).every((value) => value === true);

  return (
    <Button isActive={isActive} type="submit" {...props}>
      {children}
    </Button>
  );
}
