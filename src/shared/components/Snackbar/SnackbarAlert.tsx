"use client";

import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { Alert, Snackbar } from "@mui/material";
import { colorChips } from "../../styles/colorChips";

/**
 * 스낵바 컴포넌트
 * @description 전역 상태로 메시지를 전달받아 상태변경에 따라 스낵바 노출
 * @returns 스낵바 컴포넌트
 */
export const SnackbarAlert = () => {
  const { isSnackbarOpened, SnackbarMessage, closeSnackbar } =
    useSnackbarStore();

  return (
    <Snackbar
      open={isSnackbarOpened}
      autoHideDuration={1500}
      onClose={() => closeSnackbar()}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: 10000, mt: "100px" }}
    >
      <Alert icon={false} severity="success" sx={snackbarStyle}>
        {SnackbarMessage}
      </Alert>
    </Snackbar>
  );
};

const snackbarStyle = {
  width: "fit-content",
  minWidth: "300px",
  maxWidth: "335px",
  height: "fit-content",
  minHeight: "54px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colorChips.primary100,
  color: colorChips.white,
  "& .MuiAlert-icon": {
    color: colorChips.white,
  },
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "150%",
  padding: "15px 10px",
  borderRadius: "12px",
  textAlign: "center",
} as const;
