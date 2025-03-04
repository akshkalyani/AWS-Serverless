import React, { useEffect, useState } from "react";
import ShowFeedbackList from "../components/ShowFeedbackList";
import FeedbackPagination from "../components/FeedbackPagination";
import ProfileCalendar from "../components/ProfileCalendar";
import getCoachProfileById from "../services/getCoachProfileById";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import avatar from "../assets/SignUpImage.svg";
import bookWorkout from "../services/bookWorkout";
import { CircularProgress } from "@mui/material";
import Star from "../assets/icons/Star";
import Clock from "../assets/icons/Clock";
import CalenderIcon from "../assets/icons/CalenderIcon";
import Cross from "../assets/icons/Cross";
import Dumbell from "../assets/icons/Dumbell";
import BlurDialog from "../components/BlurDialog"
import Button from "../components/Button";
import { useSelector } from "react-redux";
import SuccessFaliureDialog from "../components/SuccessFailureDialog";
import { RootState } from "../redux/store";
import Pdf from "../assets/icons/PDF.svg";

interface Feedback {
  date: string;
  clientName: string;
  imageURL: string;
  rating: string;
  text: string;
}

interface Slot {
  time: string[];
}

interface Slots {
  [key: string]: Slot;
}

interface Booking {
  date: string;
  duration: string;
  time: string;
  type: string;
}

// interface CoachProfile {
//   email: string;
//   about: string;
//   certificates: string[];
//   coachId: number;
//   firstName: string;
//   lastName: string;
//   profilePicture: string;
//   ratings: number;
//   specialization: string;
//   summary: string;
//   title: string;
//   workoutDescription: string;
//   feedbacks: Feedback[];
//   slots: Slots;
//   bookings: Booking[];
// }
interface CoachProfile {
  email: string;
  about: string;
  certificates: { [key: string]: string }; // Changed from string[] to object
  coachId?: number; // Made optional since it's not in the response
  firstName: string;
  lastName: string;
  profilePicture: string;
  ratings: number;
  specialization: string[]; // Changed to string[] array
  summary: string;
  title: string;
  workoutDescription?: string; // Made optional since it's not in the response
  feedbacks: Feedback[];
  slots: Slots;
  bookings: Booking[];
}

const CoachProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 3;
  const [coachProfile, setCoachProfile] = useState<CoachProfile | undefined>();
  const [error, setError] = useState<string>("");
  const [searchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: error,
  });
  const [blurDialog, setBlurDialog] = useState<boolean>(false);
  const [bookingLoad, setBookingLoad] = useState<boolean>(false);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("");
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null
  );
  const client = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoachProfile = async () => {
      try {
        const coachId = searchParams.get("id");
        if (coachId) {
          const data: any = await getCoachProfileById(coachId);
          console.log(data, "hello");
          setCoachProfile(data.data);
          const firstSlotDate = Object.keys(data?.slots || {})[0];
          if (firstSlotDate) {
            const formattedDate = dayjs(firstSlotDate)
              .format("MMMM D YYYY")
              .replace(",", "");
            setSelectedDate(formattedDate);
          }
        } else {
          setError("Coach ID not provided");
        }
      } catch {
        setError("Failed to fetch coach profile");
      }
    };

    fetchCoachProfile();
  }, [searchParams]);

  const handleBookWorkout = async () => {
    setBookingLoad(true);
    const request = {
      coachId: coachProfile?.email || "",
      date: dayjs(`${selectedDate}`, "MMMM D YYYY").format("YYYY-MM-DD"),
      // workoutType: coachProfile?.specialization || "",
      timeSlot: selectedSlotTime,
    };
    console.log("request object going into bookworkout", request);
    console.log("coachprofile details", coachProfile);

    const response = await bookWorkout(request, token);

    if (response.error) {
      setDialog({
        message: "Something went wrong!!! Try again later",
        status: false,
      });
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
      setBlurDialog(false);
    } else {
      navigate("/clientworkouts?success=true");
    }
    setBookingLoad(false);
  };

  if (!coachProfile) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  const lastIndex = currentPage * feedbacksPerPage;
  const firstIndex = lastIndex - feedbacksPerPage;
  const currentFeedbacks = coachProfile.feedbacks.slice(firstIndex, lastIndex);

  const convertTimeFormat = (timeString: string) => {
    const temp = timeString.split("-");
    return temp[0];
  };

  return (
    <>
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setOpen}
        open={open}
      />
      {blurDialog && (
        <BlurDialog width="530px">
          {client && client.firstName ? (
            <>
              <div className="flex justify-between ">
                <div>
                  <div className="font-semibold text-[1.3rem]">
                    Confirm your booking
                  </div>
                  <div className="text-[#323A3A] font-normal my-1 text-[0.8rem]">
                    Please double-check your workout details.
                  </div>
                </div>
                <div
                  className="cursor-pointer py-3"
                  onClick={() => setBlurDialog(false)}
                >
                  <Cross />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between my-6">
                <div className="flex gap-3">
                  <img
                    src={coachProfile?.profilePicture || avatar}
                    className="w-[4.5rem] h-[4.5rem] rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = avatar;
                    }}
                  />
                  <div className="text-[#4B5563] flex flex-col justify-between max-h-[4.5rem]">
                    <div>
                      <div className=" font-semibold text-[0.95rem]">
                        {`${coachProfile?.firstName} ${coachProfile?.lastName}`}
                      </div>
                      <div className=" font-light text-[0.75rem]">
                        {coachProfile?.title}
                      </div>
                    </div>
                    <div className="flex gap-1 font-light text-[0.8rem]">
                      {coachProfile?.ratings}
                      <Star />
                    </div>
                  </div>
                </div>
                <div className="text-[0.8rem] space-y-1.5">
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <Dumbell /> <span className=" font-semibold">Type:</span>
                    {coachProfile?.specialization}
                  </div>
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <Clock />
                    <span className=" font-semibold">Time:</span>
                    {`1h`}
                  </div>
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <CalenderIcon />{" "}
                    <span className=" font-semibold">Date:</span>
                    {`${dayjs(selectedDate, "MMMM D YYYY").format(
                      "MMM D"
                    )},${convertTimeFormat(selectedSlotTime)}`}
                  </div>
                </div>
              </div>
              <Button
                text={
                  bookingLoad ? <CircularProgress size={"20px"} /> : "Confirm"
                }
                onSubmit={handleBookWorkout}
              />
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-[1.3rem]">
                  Log in to book workout
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setBlurDialog(false)}
                >
                  <Cross />
                </div>
              </div>
              <div className="text-[#323A3A] font-normal my-[1.3rem] text-[0.8rem]">
                You must be logged in to book a workout. Please log in to access
                available slots and book your session.
              </div>
              <div className="flex justify-end">
                <div className="w-[50%] flex gap-4">
                  <Button
                    padding={true}
                    text="Cancel"
                    border={true}
                    backroundColor="transparent"
                    onSubmit={() => setBlurDialog(false)}
                  />
                  <Button
                    padding={true}
                    text="Log In"
                    onSubmit={() => navigate("/signin")}
                  />
                </div>
              </div>
            </>
          )}
        </BlurDialog>
      )}
      <div className=" px-6 flex gap-1 py-1">
        <span
          className="font-lexend font-normal cursor-pointer"
          onClick={() => navigate("/coaches")}
        >
          Coaches
        </span>
        <span>{`>`}</span>
        <span>{`${coachProfile.firstName} ${coachProfile.lastName}`}</span>
      </div>
      <div
        id="maindiv"
        className="flex w-full h-full overflow-hidden font-lexend flex-col sm:flex-row"
      >
        <div
          id="profilediv"
          className="flex w-full sm:w-1/3 md:w-1/4 lg:w-1/5 bg-white flex-col text-black p-5 min-w-[360px]"
        >
          <img
            className="rounded-t-lg"
            src={coachProfile.profilePicture}
            alt="coach-profile-img"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = avatar;
            }}
          />
          <div className="flex flex-col p-2 gap-2">
            <div className="flex justify-between gap-10">
              <div>
                <h1 className="font-[500] text-xl">{`${coachProfile.firstName} ${coachProfile.lastName}`}</h1>
                <p className="text-gray-600 text-sm">{coachProfile.title}</p>
              </div>
              <div>{coachProfile.ratings}⭐</div>
            </div>
            <div className="max-h-[500px] flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                <h3 className="font-[500]">About coach</h3>
                <p className="text-gray-600 leading-[20px]">
                  {coachProfile.about}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-[500]">Specialization</h3>
                <div className="flex flex-wrap gap-2 p-2">
                  <span className="bg-gray-200 px-2 py-1 rounded-md text-gray-600">
                    {coachProfile.specialization}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-[500]">Certificates</h3>
                <div className="flex flex-wrap gap-4">
                  {Object.keys(coachProfile.certificates).map((certName, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 px-2 rounded-md text-sm flex gap-1 text-gray-800 underline decoration-solid"
                    >
                      <img src={Pdf} alt="pdf-img" /> {certName}
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="pt-2">
                <Button
                  text="Book workout"
                  onSubmit={() => setBlurDialog(true)}
                />
                <Button
                  text="Repeat previous workout"
                  border={true}
                  backroundColor="transparent"
                  onSubmit={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div
          id="slotnrdiv"
          className="flex flex-col w-full sm:w-2/3 md:w-3/4 lg:w-4/5 overflow-hidden p-5 font-lexend max-[375px]:mt-[3rem]"
        >
          <div>
            <div>SCHEDULE</div>
            <div
              id="firsthalfdiv"
              className="flex flex-col sm:flex-row max-md:flex-col"
            >
              <div className="flex-1">
                <ProfileCalendar
                  setDate={setSelectedDate}
                  date={selectedDate}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="w-full h-[4em] flex justify-around items-center">
                  <span className="text-[#323A3A]">
                    {dayjs(selectedDate, "MMMM D YYYY").format("MMM D")}
                  </span>
                  <span className="text-[#909090]">
                    {coachProfile.slots[
                      dayjs(selectedDate, "MMMM D YYYY").format("YYYY-MM-DD")
                    ]?.time.length || 0}{" "}
                    slots available
                  </span>
                </div>
                <hr className="m-1" />
                <div className="max-h-[15em] overflow-auto">
                  {coachProfile.slots[
                    dayjs(selectedDate, "MMMM D YYYY").format("YYYY-MM-DD")
                  ]?.time.map((time, i) => (
                    <div
                      className={`flex justify-center items-center w-full text-center h-[4em] mt-2 py-4 bg-[#F6FFE5] cursor-pointer ${selectedSlotIndex === i
                        ? "border-2 border-[#9ef300]"
                        : ""
                        }`}
                      key={i}
                      onClick={() => {
                        setSelectedSlotTime(time);
                        setSelectedSlotIndex(i);
                      }}
                    >
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Button
              text="Book workout"
              onSubmit={() => setBlurDialog(true)}
            />
            <Button
              text="Repeat previous workout"
              border={true}
              backroundColor="transparent"
              onSubmit={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>

          <div className="mt-5 font-lexend">
            <h1>UPCOMING WORKOUTS</h1>
            {coachProfile.bookings.length > 0 ? (
              coachProfile.bookings.map((booking) => {
                return (
                  <div className="mt-2 flex">
                    <div className="w-[1.5%] bg-blue-400 rounded-l-lg"></div>
                    <div className="flex px-5 py-5 w-full bg-blue-200 bg-opacity-5 justify-between">
                      <div className="flex gap-5 p-2">
                        <h1
                          className="font-500
                     text-gray-900"
                        >
                          {booking.type}
                        </h1>
                        <span className="text-gray-700">
                          {dayjs(
                            booking.date,
                            "YYYY MM DD"
                          ).format("MMM D")}
                          {" , "}
                          {booking.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        🕒 {booking.duration}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-2 text-gray-500">
                No upcoming workouts scheduled.
              </div>
            )}
          </div>
          <div className="mt-5">
            <h1>FEEDBACK</h1>
            <div id="secondhalfdiv" className="mt-2 flex justify-evenly">
              <ShowFeedbackList currentFeedbacks={currentFeedbacks} />
            </div>
            <div className="pt-2">
              <div className="py-9 flex justify-center">
                <FeedbackPagination
                  totalFeedbacks={coachProfile.feedbacks.length}
                  feedbacksPerPage={feedbacksPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfile;
