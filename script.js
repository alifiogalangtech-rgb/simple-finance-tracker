const form = document.getElementById("transactionForm");
const list = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function render() {
  list.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.date} - ${item.description} : $${item.amount} (${item.type})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      transactions.splice(index, 1);
      saveData();
      render();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);

    if (item.type === "income") totalIncome += item.amount;
    else totalExpense += item.amount;
  });

  document.getElementById("totalIncome").textContent = totalIncome;
  document.getElementById("totalExpense").textContent = totalExpense;
  document.getElementById("balance").textContent = totalIncome - totalExpense;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    date: date.value,
    description: description.value,
    amount: Number(amount.value),
    type: type.value
  };

  transactions.push(data);
  saveData();
  render();
  form.reset();
});

render();
