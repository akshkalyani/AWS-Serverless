import Arrow from "../assets/Arrow.png";
import CustomDropdown from "../components/CustomDropdown";
import { useEffect, useState } from "react";
import { CoachBackendInterface, CoachInterface } from "../helpers/Data";
import { activityArr, timeArr } from "../helpers/Data";
import formatDateTime from "../helpers/formatDate";
import Calendar from "../components/Calendar";
import ArrowUp from "../assets/icons/ArrowUp";
import ArrowDown from "../assets/icons/ArrowDown";
import Button from "../components/Button";
import filterWorkout from "../services/filterWorkout";
import { CircularProgress, LinearProgress } from "@mui/material";
import NotAvailable from "../assets/icons/NotAvailable";
import Cross from "../assets/icons/Cross";
import avatar from "../assets/Avatar.png";
import Star from "../assets/icons/Star";
import Dumbell from "../assets/icons/Dumbell";
import Clock from "../assets/icons/Clock";
import CalenderIcon from "../assets/icons/CalenderIcon";
import CoachCard from "../components/CoachCard";
import { useNavigate } from "react-router-dom";
import bookWorkout from "../services/bookWorkout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchCoaches } from "../services/coachesService";
import { useThemeContext } from "../context/ThemeContextProvider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import SkeletonHomeCard from "../components/Skeleton/SkeletonHomePage";
import formatDate1 from "../helpers/formatDate1";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [sport, setSport] = useState<string>(activityArr[0]);
  const [time, setTime] = useState<string>(timeArr[0]);
  const [coach, setCoach] = useState<string>(timeArr[0]);
  const [workoutLoad, setWorkoutLoad] = useState<boolean>(false);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();

  // Get the date in the format "2024, December 18"
  // const formattedDate = today.toLocaleDateString("en-US", {
  //   year: "numeric",   // Full year (e.g., 2024)
  //   month: "long",     // Full month name (e.g., December)
  //   day: "numeric",    // Day (e.g., 18)
  // });

  // Rearrange to "2024, December 18" (with a comma between year and month)
  const finalFormattedDate = `${today.getFullYear()}, ${today.toLocaleString(
    "en-US",
    { month: "long" }
  )} ${today.getDate()}`;

  const [date, setDate] = useState<string>(finalFormattedDate);
  const [resultArr, setResultArr] = useState<CoachInterface[] | null>(null);
  const [blurDialog, setBlurDialog] = useState<boolean>(false);
  const [bookingLoad, setBookingLoad] = useState<boolean>(false);
  const [selectedCoach, setSelectedCoach] = useState<CoachInterface>();
  const [allCoaches, setAllCoaches] = useState<CoachBackendInterface[]>([]);
  const [filterCoaches, setFilterCoaches] = useState<string[]>(["All"]);
  const [coachId, setCoachId] = useState<string>("");
  // const [coachName, setCoachName] = useState<string>("");
  const [isloading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetchCoaches();
      setIsloading(false);
      setFilterCoaches([
        "All",
        ...response.map((coach: CoachBackendInterface) => `${coach.fname} ${coach.lname}`),
      ]);
      setAllCoaches(response);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (coach) {
      const selectedCoach = allCoaches.find((item: CoachBackendInterface) => `${item.fname} ${item.lname}` === coach);
      setCoachId(selectedCoach?.email || "");
      // setCoachName(selectedCoach?.fname+' '+selectedCoach?.lname || "");
    }
  }, [coach]);

  const onSubmit = async () => {
    setWorkoutLoad(true);
    const response = await filterWorkout({ activity: sport, time: time.split(" ")[0], date, coachEmail: coachId });
    if (response.error) {
      console.log("");
    } else {
      console.log(response.data, "hello");
      setResultArr(response.data);
    }
    setWorkoutLoad(false);
    // setResultArr(coachData);
    console.log(response);
  };

  const user = useSelector((state: RootState) => state.user);
  const bookingWorkout = async () => {
    setBookingLoad(true);
    const temp = formatDate1(date);
    console.log(
      {
        coachEmail: selectedCoach?.coachEmail || "",
        date: `${temp}T${time.split(" ")[0]}:00Z`,
        workoutType: sport || "",
      },
      localStorage.getItem("authToken")
    );
    const response = await bookWorkout(
      {
        coachEmail: selectedCoach?.coachEmail || "",
        date: `${temp}T${time.split(" ")[0]}:00Z`,
        workoutType: sport.toUpperCase() || "",
      },
      localStorage.getItem("authToken")
    );
    setBookingLoad(true);

    if (response.error) {
      console.log("Error booking workout:", response.message);
      enqueueSnackbar(
        `Booking failed: ${response.message}`, // Show error message
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
    } else {
      enqueueSnackbar("Booked Workout!", {
        // Show success message
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      navigate("/workouts");
      console.log(response.data, "Booked Workout");
      setResultArr(response.data);
    }
    setBookingLoad(false);
    console.log(response);
  };
  const { mode } = useThemeContext();

  if (isloading) {
    return (
      <div className="h-[70vh] w-[100vw] flex justify-center items-center">
        <CircularProgress/>
      </div>
    )
  }
  return (
    <div
      className=" min-h-[100vh]"
      onClick={(e) => {
        e.stopPropagation();
        setOpenCalendar(false);
      }}
    >
      <Dialog
        open={blurDialog}
        onClose={() => setBlurDialog(false)}
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: "10px",
          },
        }}
        fullWidth
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <span>
              {user.firstName
                ? "Confirm your booking"
                : "Log in to book workout"}
            </span>
            <div
              className="cursor-pointer"
              onClick={() => setBlurDialog(false)}
            >
              <Cross />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          {user.firstName ? (
            <>
              <div className="text-[#323A3A] font-normal my-1 text-[0.8rem]">
                Please double-check your workout details.
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between my-6">
                <div className="flex gap-1 max-w-[67%]">
                  <img src={avatar} className="w-[4.5rem] h-[4.5rem]" />
                  <div className="text-[#4B5563] flex flex-col justify-between max-h-[4.5rem]">
                    <div>
                      <div className=" font-semibold text-[0.95rem]">
                        {`${selectedCoach?.coachName}`}
                      </div>
                      <div className=" font-light text-[0.75rem]">
                        {selectedCoach?.summary.split(".")[0]}
                      </div>
                    </div>
                    <div className="flex gap-1 font-light text-[0.8rem]">
                      {selectedCoach?.rating}
                      <Star />
                    </div>
                  </div>
                </div>
                <div className="text-[0.8rem] space-y-1.5">
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <Dumbell /> <span className=" font-semibold">Type:</span>
                    {selectedCoach?.expertise}
                  </div>
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <Clock />
                    <span className=" font-semibold">Time:</span>
                    {time}
                  </div>
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <CalenderIcon />{" "}
                    <span className=" font-semibold">Date:</span>
                    {formatDateTime(selectedCoach?.date || date)}
                  </div>
                </div>
              </div>
              <div className="mt-16">
                <Button
                text={
                  bookingLoad ? <CircularProgress size={"20px"} /> : "Confirm"
                }
                onSubmit={() => bookingWorkout()}
              /></div>
            </>
          ) : (
            <>
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
                    onSubmit={() => navigate("/login")}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* <TabBar />
      <SubHeader /> */}

      <div className={`text-${mode === "dark" ? "white" : "#323A3A"} font-lexend font-semibold text-[1.3rem] sm:text-[2.7rem] sm:leading-[72px] my-6 px-2 sm:px-8`}>
        <div className="flex gap-2 sm:gap-4">
          Achieve your{" "}
          <div className="flex flex-col items-start sm:gap-1">
            fitness goals!{" "}
            <span className="bg-[#9EF300] h-[3px] w-full inline-block"></span>
          </div>
        </div>
        <div className="flex">
          Find a workout and book today.
          <img src={Arrow} alt="arrow"></img>
        </div>
      </div>

      <div className={`text-${mode === "dark" ? "white" : "#323A3A"} my-5 sm:my-12  px-2 sm:px-8 font-lexend`}>
        <div>BOOK A WORKOUT</div>
        <div className="grid sm:grid-cols-5 items-center gap-3 py-2">
          <CustomDropdown
            label="Type of sport"
            menuItems={activityArr}
            setOuterTarget={setSport}
          />
          <div
            className="relative cursor-pointer mt-3"
            onClick={(e) => {
              e.stopPropagation();
              setOpenCalendar(!openCalendar);
            }}
          >
            <div className=" border-[1.5px] border-[#cbcbcb] rounded-sm p-[1rem]">
              <label
                className={`absolute left-4 -top-3 px-2 font-light text-[0.8rem] ${mode === "dark"
                  ? "text-white bg-[#121212]"
                  : "text-[#4B5563] bg-white"
                  }`}
              >
                Date
              </label>
              <div className="flex justify-between">
                <p
                  className={`text-${mode === "dark" ? "white" : "#323A3A"
                    } font-normal text-[14px]`}
                >
                  {date.split(",")[1]}
                </p>
                {openCalendar ? (
                  <ArrowUp color={mode === "dark" ? "white" : "#323232"} />
                ) : (
                  <ArrowDown color={mode === "dark" ? "white" : "#323232"} />
                )}
              </div>
            </div>
            {openCalendar && (
              <div className="absolute z-[10]">
                <Calendar setDate={setDate} date={date} />
              </div>
            )}
          </div>
          <CustomDropdown
            label="Time"
            menuItems={timeArr}
            setOuterTarget={setTime}
          />
          <CustomDropdown
            label="Coach"
            menuItems={filterCoaches}
            setOuterTarget={setCoach}
          />
          <Button
            text={
              workoutLoad ? <CircularProgress size={"20px"} /> : "Find Workout"
            }
            onSubmit={() => onSubmit()}
          />
        </div>
      </div>
      {resultArr ? (
        resultArr.length > 0 ? (
          <div className="px-2 sm:px-8 my-10 space-y-6">
            <div className={`font-lexend text-${mode === "dark" ? "white" : "#323A3A"}`}>
              AVAILABLE WORKOUTS{" "}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 ">
              {resultArr.map((item: any) => (
                <CoachCard
                  imgUrl={item.profilePicture}
                  name={`${item.coachName}`}
                  title={item.summary.split(".")[0]}
                  rating={item.ratings}
                  summary={item.description.split(".")[0]}
                  type={item.expertise}
                  time={time}
                  date={date}
                  timeArr={item.availableSlots}
                  coachId={item.coachEmail}
                  onSubmit={() => {
                    setSelectedCoach(item);
                    setBlurDialog(true);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <NotAvailable />
          </div>
        )
      ) : null}
    </div>
  );
};

export default HomePage;
