import React from "react";
import CustomAppBar from "../components/Appbar.tsx";
import { Grid } from "@mui/material";
import logoImg from "../assets/Logo.svg";
import { Outlet } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <Grid
      container
      spacing={6}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid item xs={12} md={12} lg={12}>
        <CustomAppBar positioning="fixed" logo={logoImg} height={"5rem"} />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default MainPage;
