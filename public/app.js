document.addEventListener("DOMContentLoaded", () => {
  fetchRecords();
});

document
  .getElementById("create-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log(event);
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/records/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObject),
      });
    } catch (error) {
      console.error(error);
    }
    window.location.href = "View/recordsView.html";
  });

async function fetchRecords() {
  const response = await fetch("/records/");
  const data = await response.json();
  const recordsTable = document.getElementById("records-table");
  recordsTable.innerHTML = "";
  data.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${record.id}</td>
        <td>${record.nazivelektrane}</td>
        <td>${record.mesto}</td>
        <td>${record.adresa}</td>
        <td>${record.datumpustanjaurad}</td>
        <td>${record.sifravrstepogona}</td>
        <td><button onclick="deleteRecord(${record.id})">Delete</button></td>
    `;
    recordsTable.appendChild(row);
  });
}

async function deleteRecord(id) {
  await fetch(`/records/${id}`, {
    method: "DELETE",
  });
  fetchRecords();
}
