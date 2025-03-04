import { Grid, Pagination, Box, Typography } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard.tsx";
import { useEffect, useState } from "react";
import { fetchBookedWorkouts } from "../services/workoutService.ts";
import SkeletonWorkoutPage from "../components/Skeleton/SkeletonWorkoutPage.tsx";
import { enqueueSnackbar } from "notistack";
const Workouts: React.FC = () => {
  const itemsPerPage = 8;
  const totalItems = 8;
  const [page, setPage] = useState<number>(1);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = localStorage.getItem("authToken") || "";
  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchBookedWorkouts(token);
        setWorkouts(response);
      } catch (error) {
        console.error("Error fetching workouts:", error);
        enqueueSnackbar("Error fetching workouts", { variant: "error" });
        setWorkouts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, []);
  const components = (workouts || []).map((workout, index) => (
    <WorkoutCard key={index} workout={workout} />
  ));

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedComponents = (components || []).slice(startIndex, endIndex);

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  return (
    <>
      {isLoading ? (
        <Grid
          container
          spacing={6}
          sx={{
            width: "100%",
            pl: 5,
            mb: 2,
          }}
        >
          <SkeletonWorkoutPage />
        </Grid>
      ) : (
        <>
          <Grid
            container
            spacing={6}
            sx={{
              width: "100%",
              pl: 5,
              mb: 2,
            }}
          >
            {(workouts || []).length > 0 ? (
              displayedComponents
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  p: 2,
                }}
              >
                <Typography variant="h6">No workouts found</Typography>
              </Box>
            )}
          </Grid>

          {/* Pagination controls */}
          {(workouts || []).length > 6 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Pagination
                count={Math.ceil(totalItems / itemsPerPage)} // Total number of pages
                page={page}
                onChange={handleChange}
                color="primary"
                size="large"
              />
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Workouts;
