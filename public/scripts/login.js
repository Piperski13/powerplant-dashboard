window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const error = urlParams.get("error");
  if (error === "login") {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const msg = document.querySelector(".invalid-msg");

    username.classList.add("username-error");
    password.classList.add("password-error");
    msg.classList.remove("hidden");
  }
};

document.getElementById("login-form-js").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const loginAuthObject = {
    username,
    password,
  };

  loginPostAuth(loginAuthObject);
});

async function loginPostAuth(loginAuthObject) {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginAuthObject),
    });

    if (response.ok) {
      window.location.href = "/View/recordsView.html";
    } else if (response.status === 403) {
      window.location.href = "/?error=login";
    } else {
      console.error(`Unexpected response: ${response.status}`);
    }
  } catch (error) {
    console.error(`Catch error login: ${error}`);
  }
}
