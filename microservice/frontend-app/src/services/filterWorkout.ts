import axiosInstance from "./axiosInstance";

interface filterWorkoutParams {
    sport: string,
    time: string,
    date: string,
    coach: string
}

const filterWorkout = async (obj: filterWorkoutParams) => {
    try {
        const response = await axiosInstance.get(`/workouts/available?sport=${obj.sport}&time=${obj.time}&date=${obj.date}&coach=${obj.coach}`);
        return { error: false, data: response.data };
    } catch (e: any) {
        if
            (e.response.data.message.includes("No available workouts")) {
            return { error: false, data: [] };
        }
        else {
            return { error: true, message: e.response.data.message };
        }
    }
};

export default filterWorkout;