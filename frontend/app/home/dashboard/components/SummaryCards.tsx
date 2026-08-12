interface SummaryCardProps {
  icon: string;
  label: string;
  value: string;
  sub: string;
  color: string;
}

export default function SummaryCards() {
  const SummaryCard = ({
    icon,
    label,
    value,
    sub,
    color,
  }: SummaryCardProps) => {
    const colorMap: Record<string, { icon: string; border: string; text: string }> = {
      primary: {
        icon: "bg-primary-bg text-primary",
        border: "border-primary/25",
        text: "text-foreground",
      },
      danger: {
        icon: "bg-danger-bg text-danger",
        border: "border-danger/25",
        text: "text-danger",
      },
      warning: {
        icon: "bg-warning-bg text-warning",
        border: "border-warning/25",
        text: "text-warning-foreground",
      },
      info: {
        icon: "bg-info-bg text-info",
        border: "border-info/25",
        text: "text-info-foreground",
      },
      purple: {
        icon: "bg-purple-bg text-purple",
        border: "border-purple/25",
        text: "text-purple-foreground",
      },
    };
    return (
      <div
        className={`bg-background-card ${colorMap[color].border} border rounded-2xl p-4.5 flex flex-col gap-3.5`}
      >
        {/* Label + Icon */}
        <div className="flex items-center gap-2 text-foreground-muted text-xs">
          <span
            className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center text-sm ${colorMap[color].icon}`}
          >
            {icon}
          </span>
          {label}
        </div>
        {/* Value */}
        <p
          className={`font-(family-name:--font-dm-serif) text-3xl tracking-tight ${colorMap[color].text}`}
        >
          {value}
        </p>
        {/* Sub */}
        <p className="text-xs text-foreground-muted">{sub}</p>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        icon="฿"
        label="รายจ่ายทั้งหมด"
        value="฿18,420"
        sub="47 รายการ"
        color="primary"
      />
      <SummaryCard
        icon="↗"
        label="เทียบเดือนก่อน"
        value="+฿2,100"
        sub="มากกว่า 12.9%"
        color="danger"
      />
      <SummaryCard
        icon="🍜"
        label="หมวดใช้มากสุด"
        value="อาหาร & เครื่องดื่ม"
        sub="฿6,840 · 37% ของทั้งหมด"
        color="warning"
      />
      <SummaryCard
        icon="∅"
        label="เฉลี่ยต่อวัน"
        value="฿614"
        sub="จาก 30 วัน"
        color="info"
      />
    </div>
  );
}
