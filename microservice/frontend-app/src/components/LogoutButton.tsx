import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { persistor } from "../redux/store";
import { clearUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
interface LogoutProps {
  padding: number | string | [number, number, number, number];
  handleClose?: () => void;
  setAnchorEl?: (element: HTMLElement | null) => void;
  width?: string;
}

const Logout: React.FC<LogoutProps> = ({
  padding,
  handleClose: externalHandleClose,
  setAnchorEl,
  width,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = (): void => {
    localStorage.clear();
    dispatch(clearUser());
    persistor.purge();
    navigate("/home");
    window.location.reload();
    externalHandleClose?.();
    setAnchorEl?.(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: padding,
        width: width ? width : "100%",
      }}
      onClick={handleClose}
    >
      <Button
        variant="outlined"
        fullWidth
        color="error"
        sx={{ borderRadius: "10px" }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default Logout;
