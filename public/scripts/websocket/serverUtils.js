//CommonJS for the controller formating

function formatSimpleMessengerTime(isoTimestamp) {
  const messageDate = new Date(isoTimestamp);
  const now = new Date();
  const hoursElapsed = (now - messageDate) / (1000 * 60 * 60);

  if (hoursElapsed < 24) {
    return messageDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  } else {
    return messageDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

module.exports = {
  formatSimpleMessengerTime,
};
