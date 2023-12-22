let inputHistory = [];
let outputHistory = [];
let historyIndex = -1;

function initListeners() {
  const inputField = document.getElementById("inputValue");
  const fromSystemSelect = document.getElementById("fromSystem");

  fromSystemSelect.addEventListener("change", function () {
    validateInput();
    updateFromOptions();
  });

  inputField.addEventListener("input", function () {
    validateInput();
  });

  inputField.addEventListener("keydown", function (event) {
    disableInvalidInput(event);
  });
  
  const toSystemSelect = document.getElementById("toSystem");

toSystemSelect.addEventListener("change", function () {
  updateFromOptions();
  // Add any other relevant logic here
});
  
}

function disableInvalidInput(event) {
  const fromSystem = document.getElementById("fromSystem").value;

  switch (fromSystem) {
    case "binary":
      if (!/^[01]+$/.test(event.key)) {
        event.preventDefault();
      }
      break;
    case "decimal":
      if (!/^[0-9]+$/.test(event.key)) {
        event.preventDefault();
      }
      break;
    case "octal":
      if (!/^[0-7]+$/.test(event.key)) {
        event.preventDefault();
      }
      break;
    case "hexadecimal":
      if (!/^[0-9A-Fa-f]+$/.test(event.key)) {
        event.preventDefault();
      }
      break;
  }
}

function validateInput() {
  const fromSystem = document.getElementById("fromSystem").value;
  const inputField = document.getElementById("inputValue");

  switch (fromSystem) {
    case "binary":
      inputField.value = inputField.value.replace(/[^01]/g, "");
      break;
    case "decimal":
      inputField.value = inputField.value.replace(/[^0-9]/g, "");
      break;
    case "octal":
      inputField.value = inputField.value.replace(/[^0-7]/g, "");
      break;
    case "hexadecimal":
      inputField.value = inputField.value.replace(/[^0-9A-Fa-f]/g, "");
      break;
  }
}

function convert() {
  validateInput();

  const fromSystem = document.getElementById("fromSystem").value;
  const toSystem = document.getElementById("toSystem").value;
  const inputValue = document.getElementById("inputValue").value;

  let result = convertInput(fromSystem, inputValue);
  result = convertOutput(toSystem, result);

  document.getElementById("outputValue").value = result;

  // Save to history
  inputHistory.push(inputValue);
  outputHistory.push(result);
  historyIndex = inputHistory.length - 1;
}

function convertInput(fromSystem, inputValue) {
  switch (fromSystem) {
    case "binary":
      return /^[01]+$/.test(inputValue) ? parseInt(inputValue, 2) : "Invalid input!";
    case "decimal":
      return parseInt(inputValue, 10);
    case "octal":
      return parseInt(inputValue, 8);
    case "hexadecimal":
      return parseInt(inputValue, 16);
    default:
      return "Invalid input";
  }
}

function convertOutput(toSystem, result) {
  switch (toSystem) {
    case "binary":
      return result.toString(2);
    case "decimal":
      return result.toString(10);
    case "octal":
      return result.toString(8);
    case "hexadecimal":
      return result.toString(16);
    default:
      return "Invalid output";
  }
}

function reverse() {
  const fromSystem = document.getElementById("fromSystem").value;
  const toSystem = document.getElementById("toSystem").value;
  const inputValue = document.getElementById("inputValue").value;
  const outputValue = document.getElementById("outputValue").value;

  document.getElementById("fromSystem").value = toSystem;
  document.getElementById("toSystem").value = fromSystem;

  document.getElementById("inputValue").value = outputValue;
  document.getElementById("outputValue").value = inputValue;

  // Save to history
  inputHistory.push(inputValue);
  outputHistory.push(outputValue);
  historyIndex = inputHistory.length - 1;
  
  updateToOptions();
}

function reset() {
  document.getElementById("inputValue").value = "";
  document.getElementById("outputValue").value = "";

  // Reset history
  inputHistory = [];
  outputHistory = [];
  historyIndex = -1;
}

function backspace() {
  const inputValue = document.getElementById("inputValue").value;
  document.getElementById("inputValue").value = inputValue.slice(0, -1);
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    document.getElementById("inputValue").value = inputHistory[historyIndex];
    document.getElementById("outputValue").value = outputHistory[historyIndex];
  }
}

function redo() {
  if (historyIndex < inputHistory.length - 1) {
    historyIndex++;
    document.getElementById("inputValue").value = inputHistory[historyIndex];
    document.getElementById("outputValue").value = outputHistory[historyIndex];
  }
}

function appendValue(value) {
  const fromSystem = document.getElementById("fromSystem").value;

  if (fromSystem !== "hexadecimal" && /^[A-Za-z]$/.test(value)) {
    return;
  }

  if (fromSystem === "binary" && !/^[01]$/.test(value)) {
    return;
  }

  if (fromSystem === "octal" && !/^[0-7]$/.test(value)) {
    return;
  }

  if (fromSystem === "decimal" && !/^[0-9]$/.test(value)) {
    return;
  }

  document.getElementById("inputValue").value += value;
  convert();
}

function updateToOptions() {
  const fromSystem = document.getElementById("fromSystem").value;
  const toSystemSelect = document.getElementById("toSystem");
  const keypadButtons = document.querySelectorAll(".buttons");

  for (let i = 0; i < toSystemSelect.options.length; i++) {
    toSystemSelect.options[i].disabled = false;
  }

  const selectedToIndex = Array.from(toSystemSelect.options).findIndex(
    (option) => option.value === fromSystem
  );

  if (selectedToIndex !== -1) {
    toSystemSelect.options[selectedToIndex].disabled = true;
  }

  keypadButtons.forEach((button) => {
    const value = button.textContent;
    const isLetter = /^[A-Fa-f]$/.test(value);
    const isBinary = fromSystem === "binary" && !/^[01]$/.test(value);
    const isOctal = fromSystem === "octal" && !/^[0-7]$/.test(value);
    const isDecimal = fromSystem === "decimal" && !/^[0-9]$/.test(value);

    if ((isLetter && fromSystem !== "hexadecimal") || isBinary || isOctal || isDecimal) {
      button.classList.add("disabled-button");
    } else {
      button.classList.remove("disabled-button");
    }
  });
}

function updateFromOptions() {
  const fromSystemSelect = document.getElementById("fromSystem");
  const toSystem = document.getElementById("toSystem").value;

  for (let i = 0; i < fromSystemSelect.options.length; i++) {
    fromSystemSelect.options[i].disabled = false;
  }

  const selectedFromIndex = Array.from(fromSystemSelect.options).findIndex(
    (option) => option.value === toSystem
  );

  if (selectedFromIndex !== -1) {
    fromSystemSelect.options[selectedFromIndex].disabled = true;
  }
}

updateFromOptions();
updateToOptions();
initListeners();

