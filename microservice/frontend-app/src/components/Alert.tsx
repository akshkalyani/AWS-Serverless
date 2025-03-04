import { Alert, Typography } from "@mui/material";
import BaseImage from "../assets/Base.png";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";

const AlertComp = () => {
  const userData = useSelector((state: RootState) => state.user);
  const pathname = useLocation();
  return (
    <Alert
      variant="filled"
      icon={false}
      sx={{
        backgroundImage: `url(${BaseImage})`, // Add your image path here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          justifyContent: "center",
          alignItems: "start",
          fontFamily: "lexend",
          p: 4,
        }}
      >
        {pathname.pathname.includes("my-account") ? "General Information" : `Hello${
        
          userData.firstName
            ? `, ${userData.firstName} ${userData.lastName}!`
            : "!"
        }`}
      </Typography>
    </Alert>
  );
};

export default AlertComp;
