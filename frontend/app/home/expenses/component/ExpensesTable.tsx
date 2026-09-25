'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getExpenses, Expense } from "@/lib/api/expense"
import { formatDateToThai } from "@/lib/format";

const PAGE_SIZE = 10

export default function ExpensesTable() {

    const { data: session } = useSession();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const page = Math.max(1, Number(searchParams.get('page')) || 1);

    const goToPage = (nextPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(nextPage));
        router.push(`${pathname}?${params}`);
    };

    useEffect(() => {
        if (totalPages > 0 && page > totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', String(totalPages));
            router.replace(`${pathname}?${params}`);
        }
    }, [page, totalPages, searchParams, router, pathname]);

    useEffect(() => {
        if (!session?.backendToken) return;
        let ignore = false;

        getExpenses(session.backendToken, { page, pageSize: PAGE_SIZE })
            .then((data) => {
                if (ignore) return;
                setExpenses(data.expenses);
                setTotal(data.total);
                setTotalPages(data.totalPages);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [session?.backendToken, page]);

    useEffect(() => {
        console.log(expenses)
    }, [expenses])

    return (
        <>
            <div
                className="overflow-x-scroll scrollbar-thin-custom mt-3 pb-0.5"
            >
                <div
                    className="min-w-7xl bg-background-card border border-border-light  rounded-[14px] overflow-hidden"
                >
                    <table
                        className="w-full table-fixed"
                    >
                        <thead>
                            <tr
                                className="h-10 bg-background"
                            >
                                <th
                                    className="max-w-60 text-xs font-medium text-left text-foreground-muted pl-5"
                                >
                                    ร้านค้า
                                </th>
                                <th
                                    className="w-50 text-xs font-medium text-left text-foreground-muted"
                                >
                                    หมวดหมู่
                                </th>
                                <th
                                    className="w-35 text-xs font-medium text-left text-foreground-muted"
                                >
                                    วันที่
                                </th>
                                <th
                                    className="w-60 text-xs font-medium text-left text-foreground-muted"
                                >
                                    หมายเหตุ
                                </th>
                                <th
                                    className="w-37.5 text-xs font-medium text-left text-foreground-muted"
                                >
                                    จำนวนเงิน

                                </th>
                                <th
                                    className="w-30 text-xs font-medium text-foreground-muted text-right pr-5"
                                >
                                    แก้ไข
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((e) => (
                                <tr
                                    key={e.id}
                                    className="h-15"
                                >
                                    <td
                                        className="pl-5 text-sm font-semibold"
                                    >
                                        {e.merchant}
                                    </td>
                                    <td
                                        className=""
                                    >
                                        <span
                                            className={`inline-flex items-center px-2.5 h-6 text-xs font-semibold rounded-full`}
                                            style={{
                                                color: e.category.color ?? undefined,
                                                background: `${e.category.color}33`
                                            }}
                                        >
                                            {e.category.name}
                                        </span>
                                    </td>
                                    <td
                                        className="text-xs text-foreground-muted"
                                    >
                                        {formatDateToThai(e.date)}
                                    </td>
                                    <td
                                        className="text-xs text-[#F2F5F2CC]"
                                    >
                                        {e.note || "-"}
                                    </td>
                                    <td
                                        className="text-sm text-[#EF5350] font-bold"
                                    >
                                        {`-$${e.amount}`}
                                    </td>
                                    <td
                                        className="pr-5"
                                    >
                                        <div
                                            className="flex justify-end gap-2"
                                        >
                                            <button
                                                className="flex w-7 h-7 justify-center items-center bg-background rounded-lg text-sm text-foreground-muted"
                                            >
                                                ✎
                                            </button>
                                            <button
                                                className="flex w-7 h-7 justify-center items-center bg-background rounded-lg text-sm text-[rgba(239,83,80,0.7)]"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                className="flex items-center justify-between mt-3 text-xs text-foreground-muted"
            >
                <span>
                    {total === 0
                        ? "ไม่มีรายการ"
                        : `รายการที่ ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)} จาก ${total} รายการ`}
                </span>
                <div
                    className="flex items-center gap-2"
                >
                    <button
                        type="button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page <= 1}
                        className="h-8 w-8 rounded-lg bg-background-card border border-border-light cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        ←
                    </button>
                    <span>หน้า {page} จาก {Math.max(totalPages, 1)}</span>
                    <button
                        type="button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page >= totalPages}
                        className="h-8 w-8 rounded-lg bg-background-card border border-border-light cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        →
                    </button>
                </div>
            </div>
        </>
    )
}
