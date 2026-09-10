const inputs = document.querySelectorAll("#inputs .otp-input");

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    // Keep only the first character entered.
    input.value = input.value.slice(0, 1);

    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
      if (!input.value && index > 0) {
        inputs[index - 1].focus();
      }

      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputs[index - 1].focus();
    }

    if (event.key === "ArrowRight" && index < inputs.length - 1) {
      event.preventDefault();
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("paste", (event) => {
    event.preventDefault();

    const pastedData = event.clipboardData.getData("text").trim();

    const characters = pastedData.slice(0, inputs.length).split("");

    characters.forEach((character, offset) => {
      const targetIndex = index + offset;

      if (targetIndex < inputs.length) {
        inputs[targetIndex].value = character;
      }
    });

    const lastIndex = Math.min(index + characters.length, inputs.length - 1);

    inputs[lastIndex].focus();
  });
});
