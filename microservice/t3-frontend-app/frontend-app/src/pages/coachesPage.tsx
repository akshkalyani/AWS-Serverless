import React, { useState } from "react";
import { Grid, Pagination, Box, Typography } from "@mui/material";
import CoachesCard from "../components/CoachesCard";
import useFetchCoaches from "../hooks/useFetchCoaches";
import SkeletonCoachPage from "../components/Skeleton/SkeletonCoachPage";

interface Coach {
  id: string;
  email: number;
  fname: string;
  lname: string;
  profilePicture?: string;
  description: string;
  expertise: string;
  rating: number;
}

const Coaches: React.FC = () => {
  const { data: coaches, loading } = useFetchCoaches();
  console.log(coaches);

  const coachesData = (coaches || []).map((coach: Coach, index: number) => ({
    id: coach.email,
    name: coach.fname + " " + coach.lname || "",
    image: "image" + ((index + 1) % 9),
    description: coach.expertise || "",
    shortSummary: coach.description.split(".")[0] || "",
    ratings: coach.rating || 0,
  }));

  const itemsPerPage = coachesData.length >= 8 ? 8 : coachesData.length; // Number of items per page
  const [page, setPage] = useState(1); // Current page

  // Calculate total pages
  const totalPages = Math.ceil(coachesData.length / itemsPerPage);

  const currentPageData = coachesData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return loading ? (
    <SkeletonCoachPage />
  ) : (
    <Box>
      {coachesData.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          No coaches available at the moment
        </Typography>
      ) : (
        <>
          {/* Coaches Grid */}
          <Grid container spacing={2} sx={{ display: "flex" }}>
            {currentPageData.map((coach) => (
              <CoachesCard key={coach.id} {...coach} />
            ))}
          </Grid>

          {coachesData.length > 8 ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};

export default Coaches;
