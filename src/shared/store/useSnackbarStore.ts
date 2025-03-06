import { createStore } from "./zustand/createStore";

interface SnackbarState {
  isSnackbarOpened: boolean;
  SnackbarMessage: string;
  openSnackbar: (message: string) => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = createStore<SnackbarState>((set) => ({
  isSnackbarOpened: false,
  SnackbarMessage: "",
  openSnackbar: (message: string) =>
    set({
      isSnackbarOpened: true,
      SnackbarMessage: message,
    }),
  closeSnackbar: () =>
    set({
      isSnackbarOpened: false,
      SnackbarMessage: "",
    }),
}));
