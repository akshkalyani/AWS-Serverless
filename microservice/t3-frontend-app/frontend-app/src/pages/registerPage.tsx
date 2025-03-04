import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Link,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "../components/Image.tsx";
import useRegisterUser from "../hooks/useRegisterUser";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

// Define a schema using Zod for validation
const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .regex(/^\S*$/, "Password must not contain spaces")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
  target: z.string().min(1, "Target is required"),
  preferableActivity: z.string().min(1, "Activity is required"),
});

// Define the TypeScript interface for form data based on the schema
type RegisterFormData = z.infer<typeof schema>;

function RegisterPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Destructure the useForm hook with zodResolver and schema validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { registerUser } = useRegisterUser(); // Get the function from the hook

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await registerUser({
        ...data,
        preferredActivity: data.preferableActivity,
      });

      // Show success message
      enqueueSnackbar("Account has been created successfully! 😀", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });

      // Navigate after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      enqueueSnackbar(
        error.response?.data?.message ||
          "We're experiencing technical difficulties. Please try again later.",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
    }
  };

  const target = watch("target");
  const preferableActivity = watch("preferableActivity");

  return (
    <Grid
      container
      spacing={6}
      sx={{
        height: {
          xs: "auto",
          md: "100vh",
        },
        mt: {
          xs: 4,
          md: 0,
          lg: 0,
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pb: { xs: 4 },
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "496px",
            p: 3,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            component="h1"
            variant="body1"
            align="left"
            width="100%"
            sx={{ fontWeight: "300" }}
          >
            LET'S GET YOU STARTED
          </Typography>

          <Typography
            component="h1"
            variant="h5"
            align="left"
            sx={{
              fontWeight: "500",
            }}
            width="100%"
          >
            Create an Account
          </Typography>
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            {" "}
            <TextField
              margin="normal"
              id="firstName"
              label="First Name"
              autoComplete="given-name"
              placeholder="Enter your first name"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={
                errors.firstName ? errors.firstName.message : "e.g. Jonson"
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              margin="normal"
              id="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              autoComplete="family-name"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={
                errors.lastName ? errors.lastName.message : "e.g. Doe"
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Box>

          <TextField
            margin="normal"
            id="email"
            label="Email Address"
            placeholder="Enter your email"
            {...register("email")}
            error={!!errors.email}
            helperText={
              errors.email ? errors.email.message : "e.g. username@domain.com"
            }
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            margin="normal"
            type="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            {...register("password")}
            error={!!errors.password}
            helperText={
              errors.password
                ? errors.password.message
                : "At least one capital letter required"
            }
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <Divider sx={{ width: "100%", my: 2 }} />

          <FormControl
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
              mb: { lg: 2, md: 2, xs: 2, sm: 2 },
            }}
          >
            <InputLabel id="yourTargetLabel">Target</InputLabel>
            <Select
              labelId="yourTargetLabel"
              id="yourTarget"
              value={target || "Lose weight"}
              label="Target"
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
            <InputLabel id="preferableActivity">Activity</InputLabel>
            <Select
              labelId="activity"
              id="activity"
              value={preferableActivity || "Yoga"}
              label="Activity"
              {...register("preferableActivity")}
            >
              <MenuItem value="YOGA">Yoga</MenuItem>
              <MenuItem value="CLIMBING">Climbing</MenuItem>
              <MenuItem value="STRENGTH TRAINING">Strength training</MenuItem>
              <MenuItem value="CROSSFIT">Cross-fit</MenuItem>
              <MenuItem value="CARDIO TRAINING">Cardio Training</MenuItem>
              <MenuItem value="REHABILATION">Rehabilitation</MenuItem>
            </Select>
            {errors.preferableActivity && (
              <Typography color="error">
                {errors.preferableActivity.message}
              </Typography>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mb: { lg: 2, md: 0, xs: 2, sm: 2 },
              borderRadius: "6px",
              height: "3rem",
              textTransform: "none",
            }}
            disabled={!isValid}
          >
            Create An Account
          </Button>
          <Grid item xs={12} md={12}>
            <Typography>
              Already have an account?{" "}
              <Link
                href="/login"
                variant="body2"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                  textDecorationColor: (theme) =>
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                }}
              >
                LOGIN HERE
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Grid>
      <Image />
    </Grid>
  );
}

export default RegisterPage;
