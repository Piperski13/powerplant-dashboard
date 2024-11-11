async function fetchUserData() {
  try {
    const response = await fetch("/user-data", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const userData = await response.json();

      const welcomeElement = document.getElementById("welcome-js");
      if (welcomeElement) {
        welcomeElement.innerHTML = `Welcome, ${userData.username}`;
      }
    
      const loggedUserElement = document.getElementById("logged-user-js");
      if (loggedUserElement) {
        loggedUserElement.innerHTML = `${userData.username} ${userData.username}`;
      }
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
fetchUserData();
