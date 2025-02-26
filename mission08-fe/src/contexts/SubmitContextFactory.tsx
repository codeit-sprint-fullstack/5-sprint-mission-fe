import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

type Fields = string[];
type SubmitState = Record<string, boolean>;

export interface SubmitContext {
  submitState: SubmitState;
  setSubmitState: Dispatch<SetStateAction<SubmitState>>;
}

// SubmitContextFactory 클래스를 사용하여 Context를 동적으로 생성합니다.
export default class SubmitContextFactory {
  fields: Fields;

  constructor(fields: Fields) {
    this.fields = fields;
  }

  createContext() {
    const context = createContext<SubmitContext | undefined>(undefined);

    // SubmitProvider 컴포넌트 생성
    const SubmitProvider = ({ children }: { children: React.ReactNode }) => {
      const initialState = this.fields.reduce(
        (acc, field) => ({ ...acc, [field]: false }),
        {} as SubmitState
      );
      const [submitState, setSubmitState] = useState<SubmitState>(initialState);

      return (
        <context.Provider value={{ submitState, setSubmitState }}>
          {children}
        </context.Provider>
      );
    };

    // useSubmitState 훅 생성
    const useSubmitState = () => {
      const contextValue = useContext(context);
      if (!contextValue) {
        throw new Error("useSubmitState must be used within a SubmitProvider");
      }
      return contextValue;
    };

    return { SubmitProvider, useSubmitState };
  }
}
