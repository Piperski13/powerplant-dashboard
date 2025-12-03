const dateInput = document.getElementById("datumpustanjaurad_input");

if (!dateInput.value) {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  dateInput.value = formattedDate;
}
