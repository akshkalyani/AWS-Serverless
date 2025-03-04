import * as React from "react";
import {
  Grid,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  Box,
  Chip,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WorkoutDialog from "./WorkoutDialog";
import WorkoutFeedback from "./WorkoutFeedback";

type EventStatus =
  | "SCHEDULED"
  | "WAITING_FOR_FEEDBACK"
  | "FEEDBACK_SUBMITTED"
  | "FINISHED"
  | "CANCELLED";

type WorkoutAction =
  | { type: "FINISH_WORKOUT" }
  | { type: "CANCEL_WORKOUT" }
  | { type: "LEAVE_FEEDBACK" }
  | { type: "OPEN_DIALOG"; payload: "cancel" | "finish" }
  | { type: "CLOSE_DIALOG" };

interface WorkoutState {
  status: EventStatus;
  openDialog: boolean;
  dialogType: "cancel" | "finish" | null;
}

function workoutReducer(
  state: WorkoutState,
  action: WorkoutAction
): WorkoutState {
  switch (action.type) {
    case "FINISH_WORKOUT":
      return { ...state, status: "FINISHED", openDialog: false };
    case "CANCEL_WORKOUT":
      return { ...state, status: "CANCELLED", openDialog: false };
    case "LEAVE_FEEDBACK":
      return { ...state, status: "WAITING_FOR_FEEDBACK" };
    case "OPEN_DIALOG":
      return { ...state, openDialog: true, dialogType: action.payload };
    case "CLOSE_DIALOG":
      return { ...state, openDialog: false, dialogType: null };
    default:
      return state;
  }
}

const WorkoutCard: React.FC<{ workout: any }> = ({ workout }) => {
  console.log(workout.status);
  const [state, dispatch] = React.useReducer(workoutReducer, {
    status: workout.status,
    openDialog: false,
    dialogType: null,
  });
  const [feedbackDialogOpen, setFeedbackDialogOpen] = React.useState(false);

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Card
          sx={{
            borderRadius: "16px",
            p: 1,
            minHeight: "220px", // Set a minimum height to maintain consistency
            minWidth: "664px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6" fontWeight={"bold"}>
                {workout.sport}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Chip
                label={
                  state.status === "SCHEDULED"
                    ? "Schedule"
                    : state.status === "WAITING_FOR_FEEDBACK"
                    ? "Waiting for feedback"
                    : state.status === "FEEDBACK_SUBMITTED" ||
                      state.status === "FINISHED"
                    ? "Finished"
                    : "Canceled"
                }
                sx={{
                  backgroundColor:
                    state.status === "SCHEDULED"
                      ? "#009ECC"
                      : state.status === "WAITING_FOR_FEEDBACK"
                      ? "#6C6F80"
                      : state.status === "FEEDBACK_SUBMITTED"
                      ? "#FDD63B"
                      : state.status === "FINISHED"
                      ? "#FDD63B"
                      : "#FF4242",
                  color: "#fff",
                  height: "32px", // Increase height
                  "& .MuiChip-label": {
                    fontSize: "0.95rem", // Increase font size
                    padding: "0 12px", // Add more horizontal padding
                    fontWeight: "bold",
                  },
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ pt: 1, pb: 2 }}>
              {workout.Summary}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "left", width: "50%" }}>
              <EventAvailableIcon
                fontSize="medium"
                sx={{
                  color: "grey.500",
                }}
              />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {workout.date}
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              pb: 2,
              pr: 2,
              minHeight: "68px",
              alignItems: "center",
            }}
          >
            {state.status === "SCHEDULED" ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "white",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    border: "1px solid black",
                  }}
                  onClick={() =>
                    dispatch({ type: "OPEN_DIALOG", payload: "cancel" })
                  }
                >
                  Cancel Workout
                </Button>
              </>
            ) : state.status === "WAITING_FOR_FEEDBACK" ? (
              <Button
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid black",
                }}
                onClick={() => setFeedbackDialogOpen(true)}
              >
                Leave Feedback
              </Button>
            ) : null}
          </CardActions>
        </Card>
      </Grid>

      <WorkoutDialog
        coachId={workout.coachId}
        userName={workout.userName}
        open={state.openDialog}
        dialogType={state.dialogType}
        onClose={() => dispatch({ type: "CLOSE_DIALOG" })}
        workoutId={workout.workoutId}
        onFinishWorkout={() => {
          dispatch({ type: "FINISH_WORKOUT" });
          dispatch({ type: "OPEN_DIALOG", payload: "finish" });
          dispatch({ type: "LEAVE_FEEDBACK" });
        }}
        onCancelWorkout={() => dispatch({ type: "CANCEL_WORKOUT" })}
      />

      <WorkoutFeedback
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        onSubmit={(feedback) => {
          console.log("Feedback submitted:", feedback);
          dispatch({ type: "FINISH_WORKOUT" });
          setFeedbackDialogOpen(false);
        }}
        coachName={workout.coachName}
        workoutId={workout.workoutId}
        coachId={workout.coachId}
        userName={workout.userName}
      />
    </>
  );
};

export default WorkoutCard;
