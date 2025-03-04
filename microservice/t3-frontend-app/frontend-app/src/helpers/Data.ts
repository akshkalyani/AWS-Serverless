const activityArr: string[] = [
    'Yoga',
    'Climbing',
    'Strength training',
    'Cross-fit',
    'Cardio Training',
    'Rehabilitation'
];

const targetList: string[] = [
    "Lose weight",
    "Gain weight",
    "Improve Flexibility",
    "General Fitness",
    "Build Muscle",
    "Rehabilitation/Recovery"
];

const timeArr = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "13:00 PM",
    "14:00 PM",
    "15:00 PM",
    "16:00 PM",
    "17:00 PM",
    "18:00 PM"
];

const timeArr2: string[] = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
]
const coachArr = [
    "All",
    "John",
    "Sarah",
    "Michael"
]
const coachData = [
    {
        firstName: "Kristin",
        lastName: "Watson",
        title: "Certified Personal Yoga Trainer",
        ratings: 4.96, // Changed to number
        summary:
            "A Yoga Expert dedicated to crafting personalized workout plans that align with your goals.",
        specialization: "Yoga", // Changed from type to specialization
        duration: "1h", // Changed from time to duration
        date: "2026-11-15T10:00:00Z",
        timeArr: ["10:00 AM", "11:00 AM", "12:00 PM"],
        coachId: "1",
    },
    {
        firstName: "Jacob",
        lastName: "Cooper",
        title: "Strength and Conditioning Specialist",
        ratings: 4.88, // Changed to number
        summary:
            "Focused on helping you build strength and endurance through proven techniques and strategies.",
        specialization: "Strength Training", // Changed from type to specialization
        duration: "1.5h", // Changed from time to duration
        date: "2026-11-16T08:00:00Z",
        timeArr: ["8:00 AM", "9:30 AM", "11:00 AM"],
        coachId: "2",
    },
    {
        firstName: "Sophia",
        lastName: "Smith",
        title: "Certified Pilates Instructor",
        ratings: 4.92, // Changed to number
        summary:
            "Specializing in Pilates to improve your flexibility, balance, and core strength.",
        specialization: "Pilates", // Changed from type to specialization
        duration: "45m", // Changed from time to duration
        date: "2026-06-17T07:30:00Z",
        timeArr: ["7:30 AM", "8:15 AM", "9:00 AM"],
        coachId: "3",
    },
];

const client = {
    firstName: "Aksh",
    lastName: "Kalyani",
    email: "test@test.com"
};

export { activityArr, targetList, client, timeArr, timeArr2, coachArr, coachData };

export interface CoachInterface {
    id: string;
    sport: string;
    date: string;
    time: string;
    coachName: CoachBackendInterface;
    availableSlots: string[];
    coachEmail: string;
    profilePicture: string;
    summary: string;
    expertise: string;
    description: string;
    rating: string

}

export interface CoachBackendInterface {
    id: string;
    fname: string;
    lname: string;
    email: string;
    profilePicture: string;
    specialization: string;
    shortSummary: string;
    ratings: number;
    tittle: string;
}