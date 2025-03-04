import axios from 'axios';

const BASE_URL = "https://gymapp-run4team1-dotnet-dev.shared.edp-dev.cloudmentor.academy";

export const fetchWorkouts = async (data: any) => {
  try { 
    const response = await axios.get(
      `${BASE_URL}/workouts/available/?sport=${data.activity}&time=${data.time}&date=${data.date}&coach=${data.coach}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error;
  }
};

export const fetchBookedWorkouts = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/workouts/booked`, {
      headers: {
        Authorization: `Bearer ${token}`,
    },
  });
    return response.data;
  } catch (error) {
    console.error("Error fetching booked workouts:", error);
    throw error;
  }
};

export const fetchUserWorkouts = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/workouts/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
    },
  });
    return response.data;
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    throw error;
  }
};

export const cancelWorkout = async (workoutId: string, token: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/workouts/booked/${workoutId}`, {
        // Add any necessary body data here if required by your API
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error cancelling workout:", error);
    throw error;
  }
};

export const finishWorkout = async (comment: string, rating: number,coachId: string, workoutId: string,  token: string) => {
  console.log("Finishing workout:", coachId, comment, rating, workoutId, token);
  try {
    const response = await axios.post(`${BASE_URL}/feedbacks`, {
      coachId: coachId,
      comment: comment,
      rating: rating.toString(),
      workoutId: workoutId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error finishing workout:", error);
    throw error;
  }
};
