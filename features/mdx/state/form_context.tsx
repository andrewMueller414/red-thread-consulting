"use client";
import { ReactNode, createContext, useReducer, useContext } from "react";

export interface MdxFormState {
  mdxSourceId: string | null;
}

const defaultInitialValues: MdxFormState = {
  mdxSourceId: null,
};

export const MdxFormContext = createContext<MdxFormState>(defaultInitialValues);

type MdxFormContextActions = { type: "setMdxSourceId"; payload: string | null };

export const MdxFormDispatchContext = createContext<
  React.Dispatch<MdxFormContextActions>
>(null!);

export const useMdxFormContext = () => useContext(MdxFormContext);
export const useMdxFormDispatch = () => useContext(MdxFormDispatchContext);

export const MdxFormContextReducer = (
  state: MdxFormState,
  action: MdxFormContextActions,
): MdxFormState => {
  switch (action.type) {
    case "setMdxSourceId":
      return {
        ...state,
        mdxSourceId: action.payload,
      };
    default: {
      return state;
    }
  }
};

MdxFormContextReducer.displayName = "MdxFormContextReducer";

interface MdxFormProviderProps {
  children: ReactNode;
  initialValues?: Partial<MdxFormState>;
}

export const MdxFormProvider = ({
  children,
  initialValues,
}: MdxFormProviderProps) => {
  const [state, dispatch] = useReducer(
    MdxFormContextReducer,
    initialValues
      ? { ...initialValues, ...defaultInitialValues }
      : defaultInitialValues,
  );

  return (
    <MdxFormContext.Provider value={state}>
      <MdxFormDispatchContext.Provider value={dispatch}>
        {children}
      </MdxFormDispatchContext.Provider>
    </MdxFormContext.Provider>
  );
};
