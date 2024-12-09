// DOM Elements
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');

let total = 0; // To store the total expenses

// Load expenses and total from localStorage if they exist
window.onload = function () {
  const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
  if (storedExpenses) {
    storedExpenses.forEach(expense => {
      addExpenseToList(expense.name, expense.amount);
    });
    total = parseFloat(localStorage.getItem('total')) || 0;
    totalAmount.textContent = total.toFixed(2);
  }
};

// Function to add an expense to the list
function addExpenseToList(name, amount) {
  const expenseItem = document.createElement('li');
  expenseItem.innerHTML = `${name}: Ksh ${amount.toFixed(2)} 
    <button onclick="removeExpense(this, ${amount})">Remove</button>`;

  // Append the new item to the list
  expenseList.appendChild(expenseItem);
}

// Function to add an expense
function addExpense() {
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense details");
    return;
  }

  // Add expense to the list
  addExpenseToList(name, amount);

  // Update total expenses
  total += amount;
  totalAmount.textContent = total.toFixed(2);

  // Save to localStorage
  const expenseData = {
    name: name,
    amount: amount
  };
  const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
  storedExpenses.push(expenseData);
  localStorage.setItem('expenses', JSON.stringify(storedExpenses));
  localStorage.setItem('total', total.toFixed(2));

  // Clear the input fields
  expenseName.value = '';
  expenseAmount.value = '';
}

// Function to remove an expense
function removeExpense(button, amount) {
  // Remove the list item
  const expenseItem = button.parentElement;
  expenseItem.remove();

  // Update the total
  total -= amount;
  totalAmount.textContent = total.toFixed(2);

  // Remove the expense from localStorage
  const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const updatedExpenses = storedExpenses.filter(expense => expense.amount !== amount);
  localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  localStorage.setItem('total', total.toFixed(2));
}

// Add event listener to the "Add Expense" button
addExpenseBtn.addEventListener('click', addExpense);

// Optional: Allow pressing "Enter" to add an expense
expenseName.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addExpense();
  }
});
expenseAmount.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addExpense();
  }
});
