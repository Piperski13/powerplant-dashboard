//Es6 for client date formating

export function formatSimpleMessengerTime(isoTimestamp) {
  const messageDate = new Date(isoTimestamp);
  const now = new Date();
  const hoursElapsed = (now - messageDate) / (1000 * 60 * 60);

  if (hoursElapsed < 24) {
    // Less than 24 hours old: Show time only
    return messageDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  } else {
    // Older than 24 hours: Show the full date
    return messageDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
