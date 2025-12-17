//Es6 for client date formating

export function formatSimpleMessengerTime(isoTimestamp) {
  const messageDate = new Date(isoTimestamp);
  const now = new Date();
  const hoursElapsed = (now - messageDate) / (1000 * 60 * 60);

  // Reusable time format for both conditions
  const timeStr = messageDate.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (hoursElapsed < 12) {
    return timeStr;
  } else {
    // "de-CH" is a trick to get "DD.MM." format automatically
    const dateStr = messageDate.toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
    });

    // Combines the parts: "16.12. at 3:15 PM"
    return `${dateStr} at ${timeStr}`;
  }
}
