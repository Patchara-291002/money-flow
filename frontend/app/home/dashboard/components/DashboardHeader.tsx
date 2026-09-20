export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.75">
        <p className="text-2xl font-bold text-foreground">ภาพรวมเดือนนี้</p>
        <p className="text-sm text-foreground-muted">{"มิถุนายน 2569"}</p>
      </div>
      <div>
        <button className="flex items-center gap-1.75 bg-primary h-10 rounded-[11px] px-4.5">
          <p className="text-sm text-primary-foreground">เพิ่มรายการ</p>
        </button>
      </div>
    </div>
  );
}
