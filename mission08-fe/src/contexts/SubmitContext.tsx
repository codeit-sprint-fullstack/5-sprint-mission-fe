import { Name } from "@/constants";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type Fields = Partial<Name>;
type SubmitState = Record<Fields, boolean>;

// context
const SubmitContext = createContext<
  | {
      submitState: SubmitState;
      setSubmitState: Dispatch<SetStateAction<SubmitState>>;
    }
  | undefined
>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
  fields: Fields[];
}

// Provider 컴포넌트
export const SubmitProvider = ({ children, fields }: ErrorProviderProps) => {
  const initialState = fields.reduce(
    (acc, field) => ({ ...acc, [field]: false }),
    {} as SubmitState
  );
  const [submitState, setSubmitState] = useState<SubmitState>(initialState);

  return (
    <SubmitContext value={{ submitState, setSubmitState }}>
      {children}
    </SubmitContext>
  );
};

export const useSubmitState = () => {
  const context = useContext(SubmitContext);
  if (!context) {
    throw new Error("useErrorState must be used within an ErrorProvider");
  }
  return context;
};
