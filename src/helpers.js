export const waitSomeTime = () => new Promise(res => setTimeout(res, Math.random() * 800))


// colors
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`
}

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// create budget
export const createBudget = ({
  name, amount
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,//+ is for converting the string "amount" to number or use NUmber()
    color: generateRandomColor()
  }
  //if already Budgets existed then dont create any budget just simply return 
    //empty "[]" instead of showing null or undefined
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem("budgets",
    JSON.stringify([...existingBudgets, newItem]))
}

// create expense
export const createExpense = ({
  name, amount, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }
   //if already Expenses existed then dont create any budget just simply return 
    //empty "[]" instead of showing undefined or null
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key,id }) => {
  const existingData=fetchData(key)
  if(id){
    const newData=existingData.filter((item)=>item.id!==id)
    return localStorage.setItem(key,JSON.stringify(newData))
  }
  return localStorage.removeItem(key)
  
}



//total spent by budget
export const calculateSpentByBudget=(budgetId)=>{
  const expenses=fetchData("expenses") ?? []
  const budgetSpent=expenses.reduce((acc,expense)=>{
    //check if expense id is equal to budget id we passed in
    //if they not matched simply return the initial value of accumulator(0)
    if(expense.budgetId !==budgetId) return acc

    //else add the current amount(acc) to your expense amount
    return acc+=expense.amount

  },0)//0 is the initial value of accumulator
  return budgetSpent

}


//Format currency
//undefined indicate the default browser location settings from where the user
//access the application
export const formatCurrency=(amt)=>{
  return amt.toLocaleString(undefined, {
    style:"currency",
    currency:"INR"
  })
}

//formatting percentage
export const formatPercentage=(amt)=>{
  return amt.toLocaleString(undefined,{
    style:"percent",
    minimumFractionDigits:0
  })

}
//format date "createdAT" declared above
export const formatDateToLocaleString=(epoch)=>{
 return new Date(epoch).toLocaleDateString()
}

