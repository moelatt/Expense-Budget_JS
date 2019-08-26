class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  // submit budget
  submitBudgetForm(){
    const value = this.budgetInput.value;
    if(value === '' || value < 0){
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p> value cannot be empty or negative</p>`;
      const self = this;
      // disappear 3 seconds later
      setTimeout(() => {
        this.budgetFeedback.classList.remove('showItem');
      }, 3000);
    }
    else{
      // Pass the budget input value to budget amount 
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance(value);
    }
  }

  showBalance(budgetValue){
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    // const balance = budgetValue - expense;
    // console.log(total, balance); // same total and balance value
    this.balanceAmount.textContent = total;
    
    if(total < 0){
      this.balance.classList.remove('showGreen', 'showBlack','showWhite');
      this.balance.classList.add('showRed');
    }
    else if(total > 0){
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }
    else{ // total is eqaul to 0
      this.balance.classList.remove('showRed', 'shoeGreen');
      this.balance.classList.add('showBlack');
    }
  }
  // submit expense form
  submitExpenseForm(){
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if(expenseValue === '' || amountValue === '' || amountValue < 0){
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = '<p>values cannot be empty or negative';

      setTimeout(() => {
        this.expenseFeedback.classList.remove('showItem');
      }, 3000);
    }
    else{
      let amount = parseInt(amountValue)
      this.expenseAmount.textContent = amount;
      this.expenseInput.value = '';
      this.amountInput.value = '';
      // let all value and item to array
      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      // show balance
      this.showBalance();
    }
  }
  // add Expense
  addExpense(expense){
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
    <div class="expense-lable">
                <div class="expense-item d-flex justify-content-between align-items-baseline">

                <h6 class="expense-title mb-0 text-uppercase result-item">- ${expense.title}</h6>
                <h5 class="expense-amount mb-0 result-item">$ ${expense.amount}</h5>

                <div class="expense-icons list-item">

                <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="delete-icon" data-id="${expense.id}">
                <i class="fas fa-trash"></i>
                </a>
                </div>
                </div>

            </div>`;
    this.expenseList.appendChild(div);
    

  }
  // total Expense / add all expense by using array 
  totalExpense(){
    let total = 0;
    if(this.itemList.length > 0){
      total = this.itemList.reduce((acc,curr)=>{
        acc = acc + curr.amount;
        return acc;
      }, 0)
    }
    this.expenseAmount.textContent = total;
    return total;
  }
  // edit expense
  editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement.parentElement;
    console.log(parent);
    // remove from dom
    this.expenseList.removeChild(parent);
    // remove from the list
    let expense = this.itemList.filter(function(item) {
      return item.id === id;
    })
    // show value
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    // remove from the list
    let templist = this.itemList.filter(function(item){
      return item.id !== id;
    })
    this.itemList = templist;
    this.showBalance();
  }
  // delete expense
  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement.parentElement;
    console.log(parent);
    // remove from dom
    this.expenseList.removeChild(parent);
    let templist = this.itemList.filter(function(item){
      return item.id !== id;
    })
    this.itemList = templist;
    this.showBalance();
  }
} // end of class

function eventListenters(){
const budgetForm = document.getElementById('budget-form');
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// new instance of UI class
const ui = new UI();

// budget form submit
budgetForm.addEventListener('submit', function(event){
  event.preventDefault();
  ui.submitBudgetForm();

})

// expense form submit
expenseForm.addEventListener('submit', function(event){
  event.preventDefault();
  ui.submitExpenseForm();
  
})

// expense list submit
expenseList.addEventListener("click", function(event){
  if(event.target.parentElement.classList.contains('edit-icon')){
    ui.editExpense(event.target.parentElement);
  }
  else if(event.target.parentElement.classList.contains('delete-icon')){
    ui.deleteExpense(event.target.parentElement);
  }
})
}



document.addEventListener('DOMContentLoaded', function(){
  eventListenters();
})
