export function formatTime(timestamp: string) {
  const currentTime = new Date();
  const messageTime = new Date(timestamp);
  const timeDifference = currentTime.getTime() - messageTime.getTime();
  const minuteDifference = Math.floor(timeDifference / (1000 * 60));
  const hourDifference = Math.floor(minuteDifference / 60);
  const dayDifference = Math.floor(hourDifference / 24);
  const weekDifference = Math.floor(dayDifference / 7);
  const monthDifference = Math.floor(dayDifference / 30);

  if (minuteDifference < 1) {
    return "Just now";
  } else if (minuteDifference < 60) {
    return `${minuteDifference} min${minuteDifference !== 1 ? "s" : ""} ago`;
  } else if (hourDifference < 24) {
    return `${hourDifference} hour${hourDifference !== 1 ? "s" : ""} ago`;
  } else if (dayDifference < 7) {
    return `${dayDifference} day${dayDifference !== 1 ? "s" : ""} ago`;
  } else if (weekDifference < 4) {
    return `${weekDifference} week${weekDifference !== 1 ? "s" : ""} ago`;
  } else {
    return `${monthDifference} month${monthDifference !== 1 ? "s" : ""} ago`;
  }
}
