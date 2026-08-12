import { formatCurrency } from "@/lib/format";

interface CategoryData {
  category: string;
  total: number;
  color: string;
  percentage: string;
}

export default function CategoryBreakdown() {
  const apiData = [
    {
      category: "อาหาร & เครื่องดื่ม",
      total: 6280,
      color: "rgb(75, 219, 106)",
    },
    { category: "ช้อปปิ้ง", total: 4200, color: "rgb(133, 183, 235)" },
    { category: "เดินทาง", total: 3180, color: "rgb(239, 159, 39)" },
    { category: "Subscription", total: 1900, color: "rgb(175, 169, 236)" },
    { category: "อื่น ๆ", total: 2300, color: "rgb(136, 135, 128)" },
  ];

  const totalSum = apiData.reduce((sum, item) => sum + item.total, 0);
  const percentageData = apiData.map((item) => ({
    ...item,
    percentage: ((item.total / totalSum) * 100).toFixed(2),
  }));
  console.log("percentageData", percentageData);

  const listItemProps = (item: CategoryData) => {
    return (
      <div
        className="flex flex-col gap-1.5"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <span
              className={`w-2.25 h-2.25 rounded-full inline-block`}
              style={{ backgroundColor: item.color }}
            />
            <p className="text-foreground">{item.category}</p>
          </div>
          <p className="text-sm text-foreground">
            {"฿ " + formatCurrency(item.total)}
          </p>
        </div>
        <span
            className="relative h-1.5 rounded-full bg-background-subtle block"
        >
            <span
                className="absolute h-1.5 rounded-full"
                style={{ backgroundColor: item.color, width: `${item.percentage}%` }}
            />
        </span>
      </div>
    );
  };

  return (
    <div className="bg-background-card border border-border rounded-2xl p-5">
      <p className="text-foreground text-xs font-semibold mb-4.5">หมวดหมู่</p>
      {percentageData.map((item) => (
        <div key={item.category} className="mb-3 last:mb-0">
          {listItemProps(item)}
        </div>
      ))}
    </div>
  );
}
