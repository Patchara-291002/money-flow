'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import DateField from "./DateField";
import { getCategories, Category } from "@/lib/api/category";
import { CreateExpenseInput, createExpense } from "@/lib/api/expense";
import { toDateString } from "@/lib/format";

type EntryFormModalProps = {
    onClose: () => void
}

type FormErrors = {
    merchant?: string
    categoryId?: string
    amount?: string
}

export default function EntryFormModal({ onClose }: EntryFormModalProps) {

    const [merchant, setMerchant] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    // Category
    const { data: session } = useSession();
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<string>("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.backendToken) return;

        getCategories(session.backendToken)
            .then((data) => setCategories(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));

    }, [session?.backendToken])

    // Date Picker
    const [selected, setSelected] = useState<Date>(new Date());

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)



    const validate = (): FormErrors => {
        const errors: FormErrors = {}
        if (!merchant.trim()) errors.merchant = "กรุณากรอกชื่อร้านค้า"
        if (!categoryId) errors.categoryId = "กรุณาเลือกหมวดหมู่"

        const amountNumber = Number(amount)
        if (!amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
            errors.amount = "กรุณากรอกจำนวนเงินที่มากกว่า 0"
        }
        return errors
    }

    const [submitted, setSubmitted] = useState(false)
    const errors = submitted ? validate() : {}

    const handleSubmit = async () => {

        if (!session?.backendToken) return

        setSubmitted(true)
        if (Object.keys(validate()).length > 0) return

        setIsSubmitting(true)
        setError(null)

        try {
            await createExpense(session.backendToken, {
                merchant: merchant.trim(),
                categoryId,
                amount: Number(amount),
                note: note.trim() || undefined,
                date: toDateString(selected),
            })
            onClose()
        } catch (err) {
            console.error(err)
            setError("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง")
        } finally {
            setIsSubmitting(false)
        }

    }

    useEffect(() => {
        console.log(categories)
    }, [categories])

    return (
        <div
            className="fixed inset-0 flex justify-center items-center w-full h-full z-20 bg-[rgba(0,0,0,0.62)] animate-[efFade_0.16s_ease-out] p-5"
        >
            <div
                className="w-[min(560px,100%)] max-h-[calc(100vh-40px)] overflow-hidden rounded-2xl bg-background-card shadow-4xl"
            >
                <div
                    className="flex flex-none justify-between items-center gap-3 pt-5 py-4 px-6 border-b border-border-light"
                >
                    <p>
                        เพิ่มรายการ
                    </p>
                    <button
                        onClick={onClose}
                        className="text-foreground-muted cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                <div
                    className="flex gap-2 flex-col flex-1 py-5 px-6"
                >
                    <div
                        className="flex flex-col gap-1.5"
                    >
                        <p
                            className="text-xs text-foreground-muted font-medium"
                        >
                            ร้านค้า
                        </p>
                        <input
                            value={merchant}
                            onChange={(e) => setMerchant(e.target.value)}
                            placeholder="ชื่อร้านค้า"
                            className="text-[13px] text-foreground font-semibold h-9.5 px-4 rounded-lg bg-background border border-border-strong focus:outline-none"
                        />
                        {errors.merchant && (
                            <p
                                className="text-[11px] text-[rgb(239,83,80)]"
                            >
                                {errors.merchant}
                            </p>
                        )}
                    </div>
                    <div
                        className="flex justify-between gap-2"
                    >
                        <div
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <p
                                className="text-xs text-foreground-muted font-medium"
                            >
                                หมวดหมู่
                            </p>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full text-[13px] text-foreground font-semibold h-9.5 px-5 rounded-lg bg-background border border-border-strong cursor-pointer focus:outline-none"
                            >
                                <option value="">เลือกหมวดหมู่</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.icon} {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <p
                                    className="text-[11px] text-[rgb(239,83,80)]"
                                >
                                    {errors.categoryId}
                                </p>
                            )}
                        </div>
                        <div
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <p
                                className="text-xs text-foreground-muted font-medium"
                            >
                                วันที่
                            </p>
                            <DateField
                                value={selected}
                                onChange={setSelected}
                            />
                        </div>
                    </div>
                    <div
                        className="flex flex-col gap-1.5"
                    >
                        <p
                            className="text-xs text-foreground-muted font-medium"
                        >
                            หมายเหตุ (ไม่บังคับ)
                        </p>
                        <input
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="เช่น ข้าวกลางวัน"
                            className="text-[13px] text-foreground font-semibold h-9.5 px-4 rounded-lg bg-background border border-border-strong focus:outline-none"
                        />
                    </div>
                    <div
                        className="flex flex-col gap-1.5"
                    >
                        <p
                            className="text-xs text-foreground-muted font-medium"
                        >
                            จำนวนเงิน
                        </p>
                        <label className="flex items-center gap-2 h-9.5 px-4 rounded-lg bg-background border border-border-strong">
                            <span className="text-sm text-foreground-muted">฿</span>
                            <input
                                type="number"
                                inputMode="decimal"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full bg-transparent text-right text-[13px] font-semibold text-foreground focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                        </label>
                        {errors.amount && (
                            <p
                                className="text-[11px] text-[rgb(239,83,80)]"
                            >
                                {errors.amount}
                            </p>
                        )}
                    </div>
                </div>
                <div
                    className="flex items-center justify-end py-4 px-6 boder-t border-border-strong gap-2.5"
                >
                    <button
                        onClick={onClose}
                        className="h-9.5 px-5 rounded-lg bg-background border border-border-strong text-foreground-muted text-xs font-semibold cursor-pointer active:translate-y-px"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="h-9.5 px-5 rounded-lg bg-primary text-background text-xs font-semibold cursor-pointer active:translate-y-px"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="inline-block size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                            </>
                        ) : "บันทึก"}

                    </button>
                </div>
            </div>
        </div>
    )
}
