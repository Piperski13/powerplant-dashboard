const inputs = document.getElementById("inputs");

inputs.addEventListener("input", function (e) {
  const target = e.target;
  const val = target.value;

  if (val != "") {
    const next = target.nextElementSibling;
    if (next) {
      next.focus();
    }
  }
});

inputs.addEventListener("keyup", function (e) {
  const target = e.target;
  const key = e.key.toLowerCase();

  if (key == "backspace" || key == "delete") {
    target.value = "";
    const prev = target.previousElementSibling;
    if (prev) {
      prev.focus();
    }
    return;
  }
});

inputs.addEventListener("paste", function (e) {
  e.preventDefault();

  const pastedData = e.clipboardData.getData("text").trim();
  const inputElements = inputs.querySelectorAll("input");

  inputElements.forEach((input, index) => {
    input.value = pastedData[index] || "";
  });

  const lastFilled =
    inputElements[Math.min(pastedData.length, inputElements.length) - 1];
  if (lastFilled) lastFilled.focus();
});
