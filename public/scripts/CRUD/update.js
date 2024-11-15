// Code bellow is code that fills out form with previous data
const urlParams = new URLSearchParams(window.location.search);
const recordId = urlParams.get("id");

let oldPlant;

window.onload = async () => {
  try {
    const response = await fetch(`/records/record/${recordId}`);
    if (!response.ok) throw new Error("Failed to fetch record");
    const records = await response.json();

    const record = records[0];

    oldPlant = record.sifravrstepogona;

    Object.keys(record).forEach((key) => {
      if (key === "id") return;

      const input = document.querySelector(`#${key}`);

      if (input) {
        if (input.type === "date") {
          const date = new Date(record[key]); // Convert the ISO string to a Date object
          const formattedDate = date.toISOString().split("T")[0]; // Extract 'YYYY-MM-DD'
          input.value = formattedDate;
        } else if (input.tagName === "SELECT") {
          input.value = record[key];
        } else {
          input.value = record[key]; // record[key] === value of key -> (key)nazivelektrane: 'JKP'
        }
      }
    });
  } catch (error) {
    console.error(`Error cought at update.js: ${error}`);
  }
};
//Code bellow is the code that updates the record
document
  .getElementById("create-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/records/record/${recordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObject),
      });

      if (response.ok) {
        const data = await response.json();
        const sifravrstepogona = data.sifravrstepogona;
        console.log(data);
        console.log(sifravrstepogona);
        console.log(oldPlant);

        await fetch("/api/increment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sifravrstepogona }),
        });
        await fetch("/api/decrement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sifravrstepogona: oldPlant }),
        });
        window.location.href = "View/recordsView.html";
      } else if (response.status === 401) {
        window.location.href = "/";
      } else if (response.status === 400) {
        const data = await response.json();

        const label = document.querySelector(".sifravrstepogona-js");
        const select = document.querySelector(".sifravrstepogona-select-js");
        label.innerHTML = data.message;

        label.classList.add("invalid-msg");
        select.classList.add("dropdown-limit");
      } else {
        console.error("Unexpected response:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  });
