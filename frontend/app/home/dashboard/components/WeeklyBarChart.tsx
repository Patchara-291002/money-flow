import { formatDayLabel } from "@/lib/date";

export default function WeeklyBarChart() {
  const apiData = [
    { date: "2026-08-05", total: 320 },
    { date: "2026-08-06", total: 870 },
    { date: "2026-08-07", total: 1450 },
    { date: "2026-08-08", total: 620 },
    // { date: "2026-08-09", total: 990 },
    // { date: "2026-08-10", total: 1800 },
    // { date: "2026-08-11", total: 540 },
  ];

  const MAX_HEIGHT = 150;

  const bars = apiData.map((item) => ({
  label: formatDayLabel(item.date),
  value: item.total,
}))

  const maxValue = Math.max(...bars.map((bar) => bar.value));

  return (
    <div className="bg-background-card border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <p className="text-foreground font-semibold">รายจ่ายล่าสุด</p>
        <p className="text-foreground-muted font-semibold">บาท</p>
      </div>
      <div
        className="grid grid-cols-7 gap-4 mt-4 mb-4"
        style={{ height: `${MAX_HEIGHT}px` }}
      >
        {bars.map((bar) => {
          const heightPercent = (bar.value / maxValue) * MAX_HEIGHT;
          return (
            <div
              key={bar.label}
              className="flex flex-col items-center gap-2 flex-1 h-full justify-end"
            >
              <div
                className="w-full max-w-8.5 rounded-t-lg rounded-b-sm bg-linear-to-b from-primary to-[#2f9e4a]"
                style={{ height: `${heightPercent}%` }}
              />
              <span className="text-xs text-foreground-muted">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
