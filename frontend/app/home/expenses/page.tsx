import ExpensesHeader from "./component/ExpensesHeader";
import ExpensesFilterBar from "./component/ExpensesFilterBar";
import ExpensesResult from "./component/ExpensesResult";
import ExpensesTable from "./component/ExpensesTable";

export default function page() {
  return (
    <div
        className="px-7 pt-8 pb-10 "
    >
      <ExpensesHeader />
      <ExpensesFilterBar />
      <ExpensesResult />
      <ExpensesTable />
    </div>
  )
}
