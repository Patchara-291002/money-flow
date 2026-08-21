

export default function RecentTransactions() {
  return (
    <div
        className="bg-background-card border border-border rounded-2xl py-5 px-5.5 mt-4"
    >
      <div
        className="flex items-center justify-between"
      >
        <p
            className="text-foreground text-base font-semibold"
        >
            รายการล่าสุด
        </p>
        <button
            className="text-primary font-semibold text-xs cursor-pointer"
        >
            ดูทั้งหมด →
        </button>
      </div>
    </div>
  )
}
