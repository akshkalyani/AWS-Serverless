import axiosInstance from './axiosInstance';

interface BookWorkoutParams {
    coachEmail: string;
    date: string;
    workoutType: string;
}

const bookWorkout = async (params: BookWorkoutParams, token: string | undefined | null) => {
    try {
        console.log('Booking workout with params', params);
        const response = await axiosInstance.post("/api/v1/client/workout/book", params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Booked workout with response', response);
        return { error: false };
    } catch (e: any) {
        console.error('Error booking workout:', e.response.data);
        if (
            e.response.data.Message.includes(
                "Already reserved."
            )) {
            return { error: true, message: e.response.data.Message };
        }
        else if (e.response.data.Message.includes(
            "The incoming token has expired"
        )) {
            return { error: true, message: "Session timed out" };
        }

        return { error: true, message: "Something went wrong!!! Try again later" };
    }
};

export default bookWorkout;