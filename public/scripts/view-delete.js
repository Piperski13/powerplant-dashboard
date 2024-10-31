document.addEventListener("DOMContentLoaded", () => {
  fetchRecords();
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
  try {
    const response = await fetch(`/records/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.status === 401) {
      window.location.href = "/";
    } else if (response.ok) {
      console.log("Record deleted successfully");
      fetchRecords();
    } else {
      console.error("Error deleting record");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
