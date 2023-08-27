import ExpenseItem from "./ExpenseItem"

const Table = ({ expenses, showBudget=true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
           {
            ["Name", "Amount", "Date",showBudget ? "Category" :""].map((val,index)=>(
                <th key={index}>{val}</th>

            ))
           }
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={expense.id}>
                <ExpenseItem expense={expense} showBudget={showBudget}/>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Table