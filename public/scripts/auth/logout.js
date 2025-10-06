document.getElementById("logout-js").addEventListener("click", (e) => {
  e.preventDefault();

  logoutFunction();
});

document.getElementById("add-record-js").addEventListener("click", (e) => {
  e.preventDefault();

  redirectAddPage();
});

document.getElementById("view-records-js").addEventListener("click", (e) => {
  e.preventDefault();

  redirectViewPage();
});

// DROP DOWN LOGIC START
const userDropdown = document.querySelector(".user-dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
const logoutDiv = document.querySelector(".logout-style");

// Toggle the dropdown visibility on click
userDropdown.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevents click from closing immediately
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
  if (dropdownContent.style.display === "block") {
    logoutDiv.classList.add("active-background");
  }
});

// Close the dropdown if clicking outside of it
document.addEventListener("click", (e) => {
  if (!userDropdown.contains(e.target)) {
    dropdownContent.style.display = "none";
    logoutDiv.classList.remove("active-background");
  }
});
// DROP DOWN LOGIC END

async function logoutFunction() {
  try {
    const response = await fetch("/logout", {
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
async function redirectViewPage() {
  try {
    const response = await fetch("/recordsViewPage", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "/recordsViewPage";
    } else if (response.status === 401) {
      window.location.href = "/";
    } else {
      console.error("Unexpected response:", response.status);
    }
  } catch (error) {
    console.error(`Error Catch: ${error}`);
  }
}
