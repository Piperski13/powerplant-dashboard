async function redirectUpdate(updateId) {
  const id = updateId;
  window.location.href = `/updateRecord.html?id=${id}`;
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
      const response = await fetch("/plants/decrement", {
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
