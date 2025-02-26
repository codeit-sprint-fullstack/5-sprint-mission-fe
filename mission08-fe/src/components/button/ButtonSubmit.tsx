import { ReactNode } from "react";
import Button from "./ButtonRectangle";
import { useSubmitState } from "@/contexts/SubmitContext";

export default function ButtonSubmit({ children }: { children: ReactNode }) {
  const { submitState } = useSubmitState();
  const isActive = Object.values(submitState).every((value) => value === true);

  return (
    <Button isActive={isActive} type="submit">
      {children}
    </Button>
  );
}
