import { useLoaderData } from "react-router-dom"
import { deleteItem, fetchData } from "../helpers"
import Table from "../components/Table"
import { toast } from "react-toastify"

export function expensesLoader(){
    const expenses=fetchData("expenses")
    return {expenses}
}
//action
export async function expensesAction({request}){
    const data=await request.formData()
    const{_action, ...values}=Object.fromEntries(data)
      //when user clicks "delete expense"
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key:"expenses",
        id:values.expenseId
      })
     
      return toast.success("Expense deleted!")
    } catch (e) {
      throw new Error("There was a problem creating your expense.")
    }
  }
}
const ExpensesPage = () => {
    const {expenses}=useLoaderData()
  return (
    <div className="grid-lg">
        <h1>All Expenses</h1>
        {
            expenses && expenses.length > 0 
            ?(
                <div className="grid-md">
                    <h2>
                        Recent Expense <small>({expenses.length}) total</small>
                        <Table expenses={expenses}/>
                    </h2>
                </div>

            ):(<p>No Expenses to show</p>)
            
        }
       

    </div>
  )
}

export default ExpensesPage