import * as React from "react";
import {
  Grid,
  Typography,
  CardMedia,
  Button,
  CardContent,
  Box,
  Card,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";

// Define the props interface
interface CoachesCardProps {
  name: string;
  image: string;
  description: string;
  shortSummary: string;
  ratings: number;
  id: string;
}

// CoachesCard component
const CoachesCard: React.FC<CoachesCardProps> = ({
  name,
  image,
  description,
  shortSummary,
  ratings,
  id,
}) => {
  const navigate = useNavigate();

  // Handle booking navigation
  const handleBookWorkout = () => {
    navigate(`/coachProfile?id=${id}`);
  };
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      lg={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          borderRadius: "16px",
          height: "100%",
          width: { xs: "100%", sm: "90%", md: "100%", lg: "80%" },
          maxWidth: { xs: "100%", sm: "400px", md: "400px", lg: "400px" },
          margin: "0 auto",
          display: "flex",    // Add this
          flexDirection: "column",
        }}
      >
        {/* Media Section */}
        <Suspense fallback={<Box sx={{ height: 240 }} />}>
          <CardMedia
            sx={{ height: 240 }}
            image={`/Images/${image}.svg`}
            title={name}
            component="img"
            alt={name}
          />
        </Suspense>
        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography gutterBottom variant="h6">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Typography>{ratings}</Typography>
            <Rating name="read-only" value={1} max={1} readOnly />
          </Box>

          <Box sx={{ pt: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {shortSummary}
            </Typography>
          </Box>
        </CardContent>

        {/* Card Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: [0, 2],
            gap: 2,
            mb: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: "auto",
          }}
        >
          <Button
            variant="contained"
            size="medium"
            fullWidth
            onClick={handleBookWorkout}
            sx={{
              fontFamily: "Lexend, Arial, sans-serif",
              textTransform: "none",

            }}
          >
            Book Workout
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default CoachesCard;
