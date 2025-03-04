import formatDate1 from "../helpers/formatDate1";
import axiosInstance from "./axiosInstance";

interface filterWorkoutParams {
    activity: string,
    time: string,
    date: string,
    coachEmail: string
}

const filterWorkout = async (obj: filterWorkoutParams) => {
    console.log(obj);
    const convertedDate = formatDate1(obj.date);
    console.log(convertedDate);
    try {
        const response = await axiosInstance.get(`/api/v1/client/workout/available?activity=${obj.activity}&time=${obj.time}&date=${convertedDate}&coachEmail=${obj.coachEmail}`);
        // const response = await axiosInstance.get(`/api/v1/client/workouts/available?activity=${obj.activity}&time=${obj.time}&date=${obj.date}&coachName=${obj.coachName}`);
        return { error: false, data: response.data.coaches };
    } catch (e: any) {
        console.log(e);
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