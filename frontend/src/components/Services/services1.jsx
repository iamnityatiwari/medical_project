export const calculateSlotTime = (startTime, interval, queue) => {
    const [startHour, startMin] = startTime.split(":").map(Number);
    const totalMinutes = startHour * 60 + startMin + queue * interval;
  
    const hour = Math.floor(totalMinutes / 60);
    const min = totalMinutes % 60;
    const formattedHour = hour % 12 || 12;
    const ampm = hour >= 12 ? "PM" : "AM";
  
    return `${formattedHour}:${min.toString().padStart(2, "0")} ${ampm}`;
  };
  
 export const formatTime12Hour = (time24) => {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 to 12
    return `${hour}:${minute} ${ampm}`;
  };