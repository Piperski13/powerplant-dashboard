document
  .getElementById("create-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/records/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObject),
      });

      if (response.ok ) {
        window.location.href = "View/recordsView.html";
      }
      else if (response.status === 401){
        window.location.href = "/";
      }
      else{
        console.error("Unexpected response:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  });
