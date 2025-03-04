import * as React from "react";
import { z } from "zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Rating,
  TextField,
  Box,
  Avatar,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { finishWorkout } from "../services/workoutService";
import { enqueueSnackbar } from "notistack";
interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: { rating: number; comment?: string }) => void;
  userName: string;
  workoutId: string;
  coachId: string;
  coachName: string;
}

// Add Zod schema
const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(500, "Comment must not exceed 500 characters")
    .optional()
    .or(z.literal("")), // Allow empty string
});

const WorkoutFeedback: React.FC<FeedbackDialogProps> = ({
  open,
  onClose,
  onSubmit,
  userName,
  workoutId,
  coachId,
  coachName,
}) => {
  const [rating, setRating] = React.useState<number | null>(0);
  const [comment, setComment] = React.useState("");
  const [errors, setErrors] = React.useState<{
    rating?: string;
    comment?: string;
  }>({});
  const userData = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("authToken") || "";
  const handleSubmit = async () => {
    console.log("Submitting feedback...");
    try {
      const validatedData =
        userData.role == "Client"
          ? feedbackSchema.parse({ rating, comment })
          : feedbackSchema.parse({ rating: 1, comment: comment });
      console.log("Received Feedback Data:", validatedData);
      try {
        await finishWorkout(
          validatedData.comment || "",
          validatedData.rating,
          coachId,
          workoutId,
          token
        );
        onSubmit(validatedData);
        setRating(0);
        setComment("");
        setErrors({});
        onClose();
        enqueueSnackbar("Feedback submitted successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      } catch (error) {
        console.error("Error finishing workout:", error);
        enqueueSnackbar("Error finishing workout", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "16px", minWidth: "552px", maxWidth: "566px" },
      }}
    >
      <DialogTitle fontSize="24px">
        Workout Feedback
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContentText fontSize="14px">
          {userData.role == "Client"
            ? "Please rate your workout experience below"
            : "Please rate the Client's performance below"}
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Grid container spacing={6} sx={{ mb: 1 }}>
            <Grid item xs={7} md={7} sx={{ display: "flex" }}>
              <Grid item xs={3.2} md={3.2}>
                <Avatar
                  src={
                    userData.role == "Client"
                      ? "/Images/image1.svg"
                      : "/Images/image9.svg"
                  }
                  sx={{
                    width: userData.role == "Client" ? "90%" : "70px",
                    height: userData.role == "Client" ? "90%" : "70px",
                  }}
                ></Avatar>
              </Grid>
              <Grid
                item
                xs={8.8}
                md={8.8}
                sx={{
                  mt: userData.role == "Client" ? 0 : 1,
                  ml: userData.role == "Client" ? 0 : 1,
                }}
              >
                <Typography variant="body1" fontWeight={500} fontSize="18px">
                  {userData.role == "Client" ? coachName : userName}
                </Typography>

                <Typography variant="body2" fontWeight={300} fontSize="14px">
                  {userData.role == "Client"
                    ? "Certified personal yoga trainer"
                    : "Client"}
                </Typography>
                {userData.role == "Client" ? (
                  <>
                    <Typography
                      variant="body2"
                      fontWeight={300}
                      fontSize="14px"
                      marginTop={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      4.96
                      <StarIcon sx={{ fontSize: "large", color: "#FDD63B" }} />
                    </Typography>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={5}
              md={5}
              sx={{
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                fontSize="14px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <FitnessCenterIcon
                  sx={{
                    fontSize: "small",
                    color: "grey.500",
                  }}
                />
                Type :{" "}
                <Typography variant="body2" fontWeight={300} component="span">
                  Yoga
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                fontSize="14px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <QueryBuilderIcon
                  sx={{
                    fontSize: "small",
                    color: "grey.500",
                  }}
                />
                Time :{" "}
                <Typography variant="body2" fontWeight={300} component="span">
                  1h
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                fontSize="14px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <EventAvailableIcon
                  sx={{
                    fontSize: "small",
                    color: "grey.500",
                  }}
                />
                Date :{" "}
                <Typography variant="body2" fontWeight={300} component="span">
                  July 9th, 12:30 AM
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          {userData.role == "Client" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={rating}
                  onChange={(_, newValue) => {
                    setRating(newValue);
                    setErrors((prev) => ({ ...prev, rating: undefined }));
                  }}
                  size="large"
                  sx={{
                    "& .MuiRating-icon": {
                      marginRight: "10px",
                      borderRadius: "80px",
                      padding: "8px",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    },
                    "& .MuiRating-iconFilled": {
                      color: "#FDD63B",
                      "& svg": {
                        borderRadius: "50%",
                      },
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#D9D9D9",
                      "& svg": {
                        borderRadius: "50%",
                      },
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 300, fontSize: "14px" }}
                >
                  {rating}/5 stars
                </Typography>
              </Box>
              {errors.rating && (
                <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 1 }}>
                  {errors.rating}
                </Box>
              )}
            </Box>
          ) : (
            <></>
          )}
          <TextField
            label="Add your comments"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setErrors((prev) => ({ ...prev, comment: undefined }));
            }}
            fullWidth
            error={!!errors.comment}
            helperText={errors.comment}
            InputProps={{
              sx: { borderRadius: "8px" },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="primary"
          sx={{
            borderRadius: "8px",
            height: "56px",
            m: "16px",
            mt: 0,
          }}
          fullWidth
          variant="contained"
          disabled={userData.role == "Client" && !rating}
        >
          Submit Feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkoutFeedback;
