import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ISO6391 from "iso-639-1";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice"; // Import the updateUser action
import { RootState } from "../redux/store"; // Import the RootState type
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface LanguageSelectorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  open,
  setOpen,
}) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const userData = useSelector((state: RootState) => state.user);
  const [language, setLanguage] = React.useState<string>(
    userData.selectedLanguage || "en"
  ); // Set default to user's selected language or 'en'
  console.log(userData.selectedLanguage);
  // Handle language selection
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  // Handle closing of the dialog
  const handleOk = () => {
    dispatch(updateUser({ ...userData, selectedLanguage: language })); // Spread existing user data
    setOpen(false);
  };
  const handleClose = (_: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Box>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Select Language
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "grey.500" : "white",
              marginLeft: "auto",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl
              sx={{
                mt: 1,
                minWidth: "552px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            >
              <InputLabel id="language-select-label">Language</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                onChange={handleChange}
                defaultValue={userData.selectedLanguage}
                input={<OutlinedInput label="Language" />}
                sx={{ height: 56 }}
              >
                {ISO6391.getAllCodes().map((code) => (
                  <MenuItem key={code} value={code}>
                    {ISO6391.getName(code)} ({code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleOk}
            disabled={!language}
            size="large"
            sx={{ fontWeight: "bold", borderRadius: "8px" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LanguageSelector;
