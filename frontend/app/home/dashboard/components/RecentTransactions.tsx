'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {getExpenses, Expense} from "@/lib/api/expense"
import { formatCurrency } from "@/lib/format";

export default function RecentTransactions() {

  const { data: session } = useSession();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.backendToken) return;

    getExpenses(session.backendToken)
      .then((data) => setExpenses(data.slice(0, 5)))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [session?.backendToken]);

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
      {expenses.map((e) => (
        <div key={e.id} className="flex items-center justify-between mt-3">
          <div>
            <p className="text-foreground text-sm">{e.merchant}</p>
            <p className="text-xs text-[#a3a89f]">{e.category.name}</p>
          </div>
          <p className="text-foreground text-sm font-semibold">
            ฿{formatCurrency(e.amount)}
          </p>
        </div>
      ))}
    </div>
  )
}
