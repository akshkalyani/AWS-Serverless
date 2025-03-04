import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  Grid,
  Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useUpdateUser from "../hooks/useUpdateUser";
import { enqueueSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { setUser, UserState } from "../redux/userSlice";

type FormData = {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  target: string;
  preferredActivity: string;
  profileImage?: File;
};

const schema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  target: z.string().min(1, "Target is required"),
  preferredActivity: z.string().min(1, "Preferable Activity is required"),
});

function GeneralInformation() {
  const userData = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();
  const { update } = useUpdateUser();
  const [previewImage, setPreviewImage] = useState<string>(
    "/images/profile.png"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      target: userData.target,
      preferredActivity: userData.preferredActivity,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await update(data);
      dispatch(
        setUser({
          ...data,
          email: userData.email,
          role: userData.role,
          selectedLanguage: userData.selectedLanguage,
        })
      );
      enqueueSnackbar("User updated successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      enqueueSnackbar("Error updating user:", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
  const target = watch("target");
  const preferredActivity = watch("preferredActivity");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar src={previewImage} sx={{ width: "40px", height: "40px" }} />
            <input
              accept="image/*"
              type="file"
              id="profile-image-upload"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="profile-image-upload">
              <Button component="span">Edit</Button>
            </label>
          </Box>

          <Box sx={{ ml: 1, mb: 4 }}>
            <Typography variant="h6" fontSize="16px">
              {userData.firstName} {userData.lastName} ({userData.role})
            </Typography>
            <Typography variant="body1" fontSize="16px" fontWeight="300">
              {userData.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} sx={{ mt: -4 }}>
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
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoComplete="firstName"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="lastName"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    mb: 4,
                  }}
                />
              </Grid>
            </Grid>

            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mb: 6,
              }}
            >
              <InputLabel id="yourTargetLabel">Your Target</InputLabel>
              <Select
                labelId="yourTargetLabel"
                id="yourTarget"
                value={target || ""}
                label="Your Target"
                {...register("target")}
              >
                <MenuItem value="LOSE WEIGHT">Lose weight</MenuItem>
                <MenuItem value="GAIN WEIGHT">Gain weight</MenuItem>
                <MenuItem value="IMPROVE FLEXIBILITY">
                  Improve flexibility
                </MenuItem>
                <MenuItem value="GENERAL FITNESS">General fitness</MenuItem>
                <MenuItem value="BUILD MUSCLE">Build Muscle</MenuItem>
                <MenuItem value="REHABILATION_RECOVERY">
                  Rehabilitation/Recovery
                </MenuItem>
              </Select>
              {errors.target && (
                <Typography color="error">{errors.target.message}</Typography>
              )}
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mb: 2,
              }}
            >
              <InputLabel id="activity">Preferable Activity</InputLabel>
              <Select
                labelId="activity"
                id="activity"
                value={preferredActivity || ""}
                label="Preferable Activity"
                {...register("preferredActivity")}
              >
                <MenuItem value="YOGA">Yoga</MenuItem>
                <MenuItem value="CLIMBING">Climbing</MenuItem>
                <MenuItem value="STRENGTH TRAINING">Strength training</MenuItem>
                <MenuItem value="CROSSFIT">Cross-fit</MenuItem>
                <MenuItem value="CARDIO TRAINING">Cardio Training</MenuItem>
                <MenuItem value="REHABILATION">Rehabilitation</MenuItem>
              </Select>
              {errors.preferredActivity && (
                <Typography color="error">
                  {errors.preferredActivity.message}
                </Typography>
              )}
            </FormControl>
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
export default GeneralInformation;
