

export default function ExpensesFilterBar() {
    return (
        <div
            className="w-full min-h-12 flex flex-wrap items-center gap-2 bg-background-subtle mt-5  py-2 px-3 rounded-lg border border-border-light"
        >
            <input
                type="text"
                placeholder="🔍  ค้นหา..."
                className="w-60 h-8 bg-background text-xs px-2.5 rounded-lg border border-border-light active:outline-none focus:outline-none"
            />
            <button
                className="w-19.5 h-8 text-xs bg-background rounded-lg text-foreground/80 border border-border-light cursor-pointer"
            >
                📅 วันนี้ ▾
            </button>
            <button
                className="w-19.5 h-8 text-xs bg-background rounded-lg text-foreground/80 border border-border-light cursor-pointer"
            >
                หมวดหมู่  ▾
            </button>
            <button
                className="w-19.5 h-8 text-xs bg-background rounded-lg text-foreground/80 border border-border-light cursor-pointer"
            >
                ช่วงราคา  ▾
            </button>
            <button
                className="w-19.5 h-8 text-xs bg-background rounded-lg text-foreground/80 border border-border-light cursor-pointer"
            >
                ล่าสุด ↓  ▾
            </button>
            <button
                className="w-19.5 h-8 ml-auto text-xs text-foreground-muted cursor-pointer whitespace-nowrap"
            >
               × ล้างตัวกรอง
            </button>
        </div>
    )
}
