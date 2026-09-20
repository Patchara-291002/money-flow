

export default function ExpensesHeadder() {
  return (
    <div
        className="flex justify-between"
      >
        <p
            className="font-bold text-2xl"
        >
            รายการทั้งหมด
        </p>
        <button
            
            className="w-32.5 h-9 text-sm font-medium bg-background-subtle rounded-[10px] text-foreground/80 border border-border-light shadow-sm cursor-pointer"
        >
            ↓ Export ▾
        </button>
      </div>
  )
}
