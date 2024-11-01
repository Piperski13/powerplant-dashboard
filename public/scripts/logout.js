document.getElementById("logout-js").addEventListener("click", (e) => {
  e.preventDefault();

  logoutFunction();
});

document.getElementById("add-record-js").addEventListener("click", (e) => {
  e.preventDefault();

  redirectAddPage();
});

async function logoutFunction() {
  try {
    const response = await fetch("/login/logout", {
      method: "GET",
      credentials: "include", // Ensures cookies are sent with the request
    });
    if (response.ok) {
      window.location.href = "/"; // Redirect to index.html after logout
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error(error);
  }
}
async function redirectAddPage() {
  try {
    const response = await fetch("/addRecordPage", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "/addRecordPage";
    } else if (response.status === 401) {
      window.location.href = "/";
    } else {
      console.error("Unexpected response:", response.status);
    }
  } catch (error) {
    console.error(`Error Catch: ${error}`);
  }
}
