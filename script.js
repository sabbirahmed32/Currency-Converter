document.addEventListener("DOMContentLoaded", () => {

  let fromCurrency = document.getElementById("fromCurrency");
  let toCurrency = document.getElementById("toCurrency");
  let amountInput = document.getElementById("amount");
  let result = document.getElementById("result");
  let currencies = ["USD", "BDT", "EUR", "PKR", "INR", "AUD"];

  currencies.forEach(currency => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  });

  fromCurrency.value = "USD";
  toCurrency.value = "BDT";

  convertBtn.addEventListener("click", () => {
    let amount = amountInput.value;
    let from = fromCurrency.value;
    let to = toCurrency.value;

    if (amount === "" || amount <= 0) {
      result.innerText = "Please enter a valid amount";
      return;
    }

    result.innerText = "Converting...";

    fetch(`https://open.er-api.com/v6/latest/${from}`)
      .then(res => res.json())
      .then(data => {
        if (!data.rates || !data.rates[to]) {
          result.innerText = "Conversion failed";
          return;
        }

        let rate = data.rates[to];
        let converted = amount * rate;
        result.innerText = `Converted Amount: ${converted.toFixed(2)} ${to}`;
      })
      .catch(() => {
        result.innerText = "Error fetching data";
      });
  });

});
