import React, { useState, MouseEvent } from "react";
import {
  styled,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Tabs,
  Button,
  Tab,
  Grid,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ProfileTooltip from "./ProfileTooltip";
import { useThemeContext } from "../context/ThemeContextProvider";
import { useLocation } from "react-router-dom";
import AlertComp from "./Alert";
import { useReducer } from "react"; // Import type
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageSelector from "./languageSelector";

// Define props for the component
interface CustomAppBarProps {
  positioning?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  logo: string; // URL for the logo image
  height?: string; // Height of the AppBar
}

// Styled AppBar component with TypeScript support
const AppBar = styled(MuiAppBar)<{ color: string; height?: string }>(
  ({ color, height }) => ({
    backgroundColor: color,
    height: height,
  })
);

// Add reducer types and state
type NavigationState = {
  activeTab: number;
};

type NavigationAction = {
  type: "SET_TAB";
  payload: number;
};

// Add reducer function
const navigationReducer = (
  state: NavigationState,
  action: NavigationAction
): NavigationState => {
  switch (action.type) {
    case "SET_TAB":
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

const CustomAppBar: React.FC<CustomAppBarProps> = React.memo(
  ({ positioning = "fixed", logo, height = "4rem" }) => {
    const location = useLocation();
    const userData = useSelector((state: RootState) => state.user);
    const isAuthenticated = !!localStorage.getItem("authToken");
    const [open, setOpen] = React.useState(false);
    const handleOpenLanguageSelector = () => setOpen(true);

    // Create a function to get initial tab based on current route
    const getInitialTab = () => {
      const currentPath = location.pathname;

      // Define routes and their corresponding tab indices
      if (isAuthenticated) {
        if (userData.role === "Client") {
          switch (currentPath) {
            case "/home":
              return 0;
            case "/workouts":
              return 1;
            case "/coaches":
              return 2;
            case "/my-account":
              return 3;
            default:
              return 0; // Default to home for clients
          }
        } else {
          // Updated logic for non-client roles
          switch (currentPath) {
            case "/workouts":
              return 0; // Default to workouts if the role isn't client // Redirect to workouts if home or coaches is accessed
            default:
              return 0; // Default to workouts for any other path
          }
        }
      } else {
        switch (currentPath) {
          case "/home":
            return 0;
          case "/coaches":
            return 1;
          default:
            return 0;
        }
      }
    };

    // Initialize reducer with current route's tab
    const [state, dispatch] = useReducer(navigationReducer, {
      activeTab: getInitialTab(),
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { toggleTheme, mode } = useThemeContext();

    // Add effect to sync tab with route on hard refresh
    React.useEffect(() => {
      const currentTab = getInitialTab();
      if (state.activeTab !== currentTab) {
        dispatch({ type: "SET_TAB", payload: currentTab });
      }
    }, [location.pathname]);

    // Handle avatar (profile) icon click
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    // Close the tooltip
    const handleClose = () => {
      setAnchorEl(null);
    };

    // Handle tab change and navigation
    const handleTabChange = (
      _event: React.SyntheticEvent,
      newValue: number
    ) => {
      dispatch({ type: "SET_TAB", payload: newValue });
    };

    return (
      <Grid container>
        <Grid item xs={12}>
          <AppBar
            position={positioning}
            color={mode === "light" ? "default" : "primary"}
            height={height}
          >
            <Toolbar>
              {/* Logo */}
              <Box sx={{ p: { xs: 0, md: 4 } }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    height: "2rem", // Consistent heightAvat
                    filter: mode === "dark" ? "invert(1)" : "none",
                  }}
                />
              </Box>

              {/* Tabs */}
              <Tabs
                value={state.activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{ flexGrow: 1 }}
              >
                {(userData.role === "Client" || !isAuthenticated) && (
                  <Tab
                    component={Link}
                    to="/home"
                    label="Home"
                    sx={{ fontSize: "1.1rem" }}
                  />
                )}
                {isAuthenticated && (
                  <Tab
                    component={Link}
                    to="/workouts"
                    label="Workouts"
                    sx={{ fontSize: "1.1rem" }}
                  />
                )}
                {(userData.role === "Client" || !isAuthenticated) && (
                  <Tab
                    component={Link}
                    to="/coaches"
                    label="Coaches"
                    sx={{ fontSize: "1.1rem" }}
                  />
                )}
              </Tabs>

              {/* Theme Toggle Button */}
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={toggleTheme}
                data-testid="theme-toggle"
              >
                {mode === "light" ? (
                  <Brightness7Icon fontSize="large" />
                ) : (
                  <Brightness4Icon fontSize="large" />
                )}
              </IconButton>
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={handleOpenLanguageSelector}
              >
                <TranslateIcon fontSize="large" />
              </IconButton>

              {/* Profile Avatar */}
              {isAuthenticated ? (
                <IconButton
                  onClick={handleClick}
                  sx={{ color: "primary.main" }}
                  data-testid="profile-button"
                >
                  <Avatar
                    data-testid="profile-avatar"
                    sx={{
                      bgcolor: "primary.main",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {userData.firstName.charAt(0)}
                  </Avatar>
                </IconButton>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Toolbar>

            {/* Profile Tooltip */}
            <ProfileTooltip
              handleClose={handleClose}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              setAnchorEl={setAnchorEl}
            />
          </AppBar>

          {/* Add Toolbar Spacer Here */}
          <Toolbar />
        </Grid>

        {/* Alert Component */}
        <Grid item xs={12}>
          {/* <AlertComp /> */}
          {location.pathname !== "/coaches" &&
            location.pathname !== "/coachProfile" && <AlertComp />}
        </Grid>
        <LanguageSelector open={open} setOpen={setOpen} />
      </Grid>
    );
  }
);

export default CustomAppBar;
