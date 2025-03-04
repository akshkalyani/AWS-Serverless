import axiosInstance from './axiosInstance';

interface BookWorkoutParams {
    coachId: string;
    date: string;
    timeSlot: string;
}

const bookWorkout = async (params: BookWorkoutParams, token: string | undefined | null) => {
    try {
        console.log('Booking workout with params', params, token);
        const response = await axiosInstance.post("/workouts", params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Booked workout with response', response);
        return response.data;
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