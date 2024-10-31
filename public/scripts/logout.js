document.getElementById("logout-js").addEventListener("click", (e) => {
  e.preventDefault();

  logoutFunction();
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
