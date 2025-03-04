import React, { useEffect, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs, { Dayjs } from "dayjs";

interface CustomCalendarHeaderProps {
  currentMonth: Dayjs;
  onMonthChange: Function;
}

const CustomCalendarHeader: React.FC<CustomCalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
}) => {
  const handlePrevious = () => {
    onMonthChange(currentMonth.subtract(1, "month"));
  };

  const handleNext = () => {
    onMonthChange(currentMonth.add(1, "month"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        aria-label="Previous Month"
        sx={{ color: "#323A3A" }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "medium" }} />
      </IconButton>
      <Typography
        sx={{ fontWeight: "medium", color: "#323A3A", fontSize: "1rem" }}
      >
        {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next Month"
          sx={{ color: "#323A3A", marginLeft: "0.5rem" }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "medium" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

interface CalendarProps {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: string;
}

const ProfileCalendar: React.FC<CalendarProps> = ({ setDate, date }) => {
  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("MMMM D YYYY").replace(",", "");
      setDate(formattedDate);
    }
  };

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Set the current date
  const today = dayjs();
  const lastOfMonth = today.endOf("month");

  useEffect(() => {
    if (date) {
      const parsedDate = dayjs(date, "MMMM D YYYY");
      setSelectedDate(parsedDate.isValid() ? parsedDate : null);
    }
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        showDaysOutsideCurrentMonth
        // Restrict the date range to only the current month
        minDate={today}
        maxDate={lastOfMonth}
        sx={{
          backgroundColor: "white",
          border: "none",
          borderRadius: "0px",
          padding: "3px 2rem",
          boxShadow: "none",
          width: "100%",
          height: "auto",
          ".MuiDayCalendar-weekContainer": {
            justifyContent: "space-between",
            padding: "0px 0.5rem",
          },
          ".MuiDayCalendar-header": {
            justifyContent: "space-between",
            padding: "0px 0.5rem",
          },
          ".MuiPickersDay-root": {
            fontFamily: "'Lexend', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "#323A3A",
          },
          ".MuiPickersDay-root.MuiPickersDay-dayOutsideMonth": {
            color: "#B7B6B6", // Make days outside the current month look different
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
        }}
        dayOfWeekFormatter={(day) =>
          day.format("dddd").substring(0, 3).toUpperCase()
        }
        slots={{
          calendarHeader: (props) => (
            <CustomCalendarHeader
              currentMonth={props.currentMonth!}
              onMonthChange={props.onMonthChange!}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default ProfileCalendar;
