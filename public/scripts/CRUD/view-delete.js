document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetchRecords();
    await fetchTotalRecords();
    console.log("Both data fetched successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function redirectUpdate(updateId) {
  const id = updateId;
  window.location.href = `/updateRecord.html?id=${id}`;
}

async function fetchRecords() {
  const response = await fetch("/records/");
  const data = await response.json();
  const recordsTable = document.getElementById("records-table");
  recordsTable.innerHTML = "";
  data.forEach((record) => {

    const date = new Date(record.datumpustanjaurad); // Convert the ISO string to a Date object
    const formattedDate = date.toISOString().split("T")[0]; // Extract 'YYYY-MM-DD'

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${record.id}</td>
        <td>${record.nazivelektrane}</td>
        <td>${record.mesto}</td>
        <td>${record.adresa}</td>
        <td>${formattedDate}</td>
        <td>${record.sifravrstepogona}</td>
        <td><button class="update-record" onclick="redirectUpdate(${record.id})">Update</button></td>
        <td><button class="delete-record" onclick="deleteRecord(${record.id})">Delete</button></td>
    `;
    recordsTable.appendChild(row);
  });
}
async function fetchTotalRecords() {
  console.log("Fetching total records...");
  const response = await fetch("/records/type");
  if (!response.ok) {
    console.error("Error fetching /records/type:", response.statusText);
    return;
  }
  
  const data = await response.json();
  const result = data.map(item => ({ ukupanbrojelektrana: item.ukupanbrojelektrana }));

  const recordsTable = document.getElementById("types-table");
  recordsTable.innerHTML = "";

  result.forEach((record) => {
    const row = document.createElement("th");
    row.innerHTML = `
          <td>${record.ukupanbrojelektrana}</td>
      `;
    recordsTable.appendChild(row);
  });
}

async function deleteRecord(id) {
  try {
    const response = await fetch(`/records/record/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();
    const sifravrstepogona = data.sifravrstepogona;

    if (response.status === 401) {
      window.location.href = "/";
    } else if (response.ok) {
      const response = await fetch("/api/decrement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sifravrstepogona }),
      });

      console.log("Record deleted successfully");
      await fetchRecords();
      await fetchTotalRecords();
    } else {
      console.error("Error deleting record");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
