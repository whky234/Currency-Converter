let base_url =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_B7p3VDkefISuzEwRbtXNed78cb0ceyTKZ23OINA4";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
let fromCurrencySelect = document.querySelector(".from select");
let toCurrencySelect = document.querySelector(".to select");

// Populate the dropdowns with currency options
for (let select of dropdowns) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;

    if (select.name === "From" && code === "PKR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "USD") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

// Update the flag image based on the selected currency
const updateFlag = (element) => {
  let currCode = element.value;
  console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Handle conversion on button click
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amountInput = document.querySelector("input");
  let amountValue = amountInput.value;

  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amountInput.value = "1";
  }

  let fromCurrency = fromCurrencySelect.value;
  let toCurrency = toCurrencySelect.value;
  const URL = `${base_url}&base_currency=${fromCurrency}&currencies=${toCurrency}`;

  try {
    let res = await fetch(URL);
    let data = await res.json();
    console.log(data);
    let rate = data.data[toCurrency].value;
    let result = amountValue * rate;
    document.querySelector(
      ".msg"
    ).innerText = `Converted Amount: ${result.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    console.error("Error fetching conversion data:", error);
  }
});
