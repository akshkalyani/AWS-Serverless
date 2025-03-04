import React, { useEffect, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs, { Dayjs } from "dayjs";
import { useThemeContext } from "../context/ThemeContextProvider"; // Import the context

// Define the props for the custom header
interface CustomCalendarHeaderProps {
  currentMonth: Dayjs;
  onMonthChange: (date: Dayjs, slideDirection: "left" | "right") => void; // Updated to accept both arguments
  mode: string;
}

// Custom header component
const CustomCalendarHeader: React.FC<CustomCalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
  mode,
}) => {
  const handlePrevious = () => {
    onMonthChange(currentMonth.subtract(1, "month"), "left"); // Pass the slide direction ("left")
  };

  const handleNext = () => {
    onMonthChange(currentMonth.add(1, "month"), "right"); // Pass the slide direction ("right")
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #ddd",
        padding: "10px",
        color: mode === "dark" ? "#E0E0E0" : "#323A3A",
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        aria-label="Previous Month"
      >
        <ArrowBackIosIcon sx={{ color: "#323A3A", fontSize: "medium" }} />
      </IconButton>
      <Typography
        sx={{ fontWeight: "medium", color: "#323A3A", fontSize: "1rem" }}
      >
        {currentMonth.format("MMMM YYYY")}
      </Typography>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next Month"
      >
        <ArrowForwardIosIcon sx={{ color: "#323A3A", fontSize: "medium" }} />
      </IconButton>
    </Box>
  );
};

interface CalendarProps {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: string;
}

// Calendar component
const Calendar: React.FC<CalendarProps> = ({ setDate, date }) => {
  const { mode } = useThemeContext(); // Get the current theme mode

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const date = newDate.date();
      const month = newDate.format("MMMM");
      const year = newDate.year();

      setDate(`${year}, ${month} ${date}`);
    }
  };

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const today = dayjs(); // Get today's date

  useEffect(() => {
    if (date) {
      const parsedDate = dayjs(date, "YYYY, MMMM D");
      setSelectedDate(parsedDate.isValid() ? parsedDate : null);
    }
  }, [date]);

  const handleMonthChange = (date: Dayjs, slideDirection: "left" | "right") => {
    // Handle the month change logic here
    // You can update the state or perform other actions based on the date and slide direction
    console.log(`Month changed to ${date.format("MMMM YYYY")} with slide direction: ${slideDirection}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        showDaysOutsideCurrentMonth
        sx={{
          backgroundColor: mode === "dark" ? "#424242" : "white", // Adjust background color
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "0px 20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "370px",
          height: "295px",
          ".MuiDayCalendar-weekContainer": {
            justifyContent: "space-between",
          },
          ".MuiDayCalendar-header": {
            justifyContent: "space-between",
          },
          ".MuiPickersDay-root": {
            fontFamily: "'Lexend', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: mode === "dark" ? "#E0E0E0" : "#323A3A",
          },
          ".MuiPickersDay-root.MuiPickersDay-dayOutsideMonth": {
            color: mode === "dark" ? "#B7B6B6" : "#B7B6B6",
          },
          ".MuiPickersDay-root:hover": {
            backgroundColor: "#F6FFE5",
            color: "#323A3A",
          },
          ".MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#F6FFE5",
            color: "#323A3A",
            borderRadius: "50%",
            border: "1px solid #9EF300",
            width: "40px",
            "&:hover": {
              backgroundColor: "#F6FFE5",
              color: "#323A3A",
            },
          },
          "& .MuiPickersDay-root.Mui-selected.Mui-focusVisible": {
            backgroundColor: "#F6FFE5",
            color: "#323A3A",
          },
          ".MuiTypography-root": {
            color: mode === "dark" ? "#E0E0E0" : "#323A3A",
          },
        }}
        dayOfWeekFormatter={(day) =>
          day.format("dddd").substring(0, 3).toUpperCase()
        }
        slots={{
          calendarHeader: (props) => (
            <CustomCalendarHeader
              currentMonth={props.currentMonth!}
              onMonthChange={handleMonthChange} // Pass the handler function here
              mode={mode}
            />
          ),
        }}
        // Disable dates before today
        shouldDisableDate={(date) => date.isBefore(today, "day")} 
      />
    </LocalizationProvider>
  );
};

export default Calendar;
