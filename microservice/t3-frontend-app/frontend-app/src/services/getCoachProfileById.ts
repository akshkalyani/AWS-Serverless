
import axiosInstance from './axiosInstance';

interface CoachProfile {
  email: string;
}

const getCoachProfileById = async (email): Promise<CoachProfile | undefined> => {
  console.log("inside coachprofile");
    try {
      const response = await axiosInstance.get<CoachProfile>(
        `/api/v1/coach/details/complete?coachEmail=${email}`
        // /api/v1/coach/details/complete?coachEmail=alexrodriguez.fitness%40gmail.com
      );
      // const response = await axiosInstance.get<CoachProfile>(
      //   `/coaches/${id}`
      // );
      console.log("response in service",response)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch coach profile:', error);
      return undefined;
    }
  };

export default getCoachProfileById;