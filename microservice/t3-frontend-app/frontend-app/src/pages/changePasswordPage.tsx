import {
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import usePasswordUser from "../hooks/usePasswordUser";
import { enqueueSnackbar } from "notistack";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"], // path of error
  });

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { updatePasswordUser } = usePasswordUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // useEffect(() => {
  //   if (userData.password) {
  //     setValue("oldPassword", userData.password);
  //   }
  // }, [userData.password, setValue]);

  const onSubmit = async (data: FormData) => {
    const newData: { old_password: string, new_password: string, confirm_new_password: string } = {
      old_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_new_password: data.confirmPassword
    };

    try {
      await updatePasswordUser(newData);
      dispatch(setUser({ ...userData, password: newData.newPassword }));
      enqueueSnackbar("Password updated successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (error) {
      console.error("Error updating password:", error);
      enqueueSnackbar("Error updating password:", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{
              width: "100%",
              maxWidth: "700px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="normal"
                  // type="password"
                  required
                  fullWidth
                  id="oldPassword"
                  label="Current Password"
                  // value={userData.password}
                  type={showPassword ? "text" : "password"}
                  autoComplete="oldPassword"
                  {...register("oldPassword")}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      mb: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="normal"
                  type={showPassword2 ? "text" : "password"}
                  id="newPassword"
                  label="New Password"
                  placeholder="Enter your password"
                  {...register("newPassword")}
                  error={!!errors.newPassword}
                  helperText={
                    errors.newPassword
                      ? errors.newPassword.message
                      : "At least one capital letter required"
                  }
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword2(!showPassword2)}
                          edge="end"
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="normal"
                  type={showPassword1 ? "text" : "password"}
                  id="confirmPassword"
                  label="Confirm New Password"
                  placeholder="Enter your password"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.message
                      : "At least one capital letter required"
                  }
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword1(!showPassword1)}
                          edge="end"
                        >
                          {showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="outlined"
                disabled={!isValid}
                sx={{
                  borderRadius: "10px",
                  width: { xs: "100%", md: "auto" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
//translate("Aditya","en")
export default ChangePassword;
