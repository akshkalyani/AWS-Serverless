function formatDate1(dateString: string) {
    // Parse the input date string
    const year = dateString.split(', ')[0];
    const [monthName, day] = dateString.split(', ')[1].split(" ");

    // Create an array with month names for lookup
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get the month index (0-based)
    const monthIndex = months.indexOf(monthName);

    // Pad day and month to ensure two digits
    const month = String(monthIndex + 1).padStart(2, '0');
    const dayFormatted = String(day).padStart(2, '0');

    // Return the formatted date
    return `${year}-${month}-${dayFormatted}`;
}

export default formatDate1;