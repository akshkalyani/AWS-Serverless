
import axiosInstance from './axiosInstance';

interface CoachProfile {
    id: number;
}

const getCoachSlots = async (id: number | undefined, date: string): Promise<CoachProfile | undefined> => {
    console.log("inside coachprofile");
    try {
        // const response = await axios.get<CoachProfile>(
        // "https://5f7xk10419.execute-api.eu-north-1.amazonaws.com/energyx/coach/profile?coach_id=1"
        // );
        // console.log(id, date)
        const response = await axiosInstance.get(
            `/coaches/${id}/available-slots/${date}`
        );
        console.log("response in service", response)
        return response.data;
    } catch (error) {
        console.error('Failed to fetch coach profile:', error);
        return undefined;
    }
};

export default getCoachSlots;