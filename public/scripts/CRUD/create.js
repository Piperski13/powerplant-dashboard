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
        const data = await response.json();
        const sifravrstepogona = data.sifravrstepogona

        await fetch('/plants/increment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sifravrstepogona }),
        });
        window.location.href = "View/recordsView.html";
      }
      else if (response.status === 401){
        window.location.href = "/";
      }
      else if (response.status === 400){
        const data = await response.json();

        const label = document.querySelector('.sifravrstepogona-js');
        const select = document.querySelector('.sifravrstepogona-select-js');
        label.innerHTML = data.message;

        label.classList.add("invalid-msg");
        select.classList.add("dropdown-limit");
      }
      else{
        console.error("Unexpected response:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  });