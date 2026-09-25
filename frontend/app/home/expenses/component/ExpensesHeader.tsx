'use client'

import { useState } from "react"
import EntryFormModal from "@/app/components/EntryFormModal";

export default function ExpensesHeadder() {

    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [isEntryModalOpen, setIsEntryModalOpen] = useState(false)

    return (
        <div
            className="flex justify-between"
        >
            <p
                className="font-bold text-2xl"
            >
                รายการทั้งหมด
            </p>
            <div
                className="flex gap-2.5"
            >
                <button

                    className="h-9 px-4 text-sm font-medium bg-background-subtle rounded-[10px] text-foreground/80 border border-border-light shadow-sm cursor-pointer"
                >
                    ↓ Export ▾
                </button>
                <div
                    className="relative"
                >
                    <button
                        onClick={() => setIsAddMenuOpen((prev) => !prev)}
                        className="h-9 px-4 text-sm font-medium bg-primary rounded-[10px] text-background border border-border-light shadow-sm cursor-pointer"
                    >
                        + เพิ่มรายการ ▾
                    </button>
                    {isAddMenuOpen && <div
                        className="absolute w-58 top-11 z-9 right-0 p-2 bg-background-card rounded-xl border border-border-light animate-[mfPop_0.14s_ease-out] shadow-lg"
                    >
                        <button
                            onClick={() => setIsEntryModalOpen(true)}
                            className="flex w-full gap-2.75 rouned-lg cursor-pointer p-2.5 text-left rounded-lg hover:bg-background-subtle"
                        >
                            <p
                                className="flex-none"
                            >
                                ✍️
                            </p>
                            <div>
                                <p
                                    className="text-sm font-semibold"
                                >
                                    กรอกเอง
                                </p>
                                <p
                                    className="text-xs text-foreground-muted"
                                >
                                    กรอกข้อมูลในหน้าต่างเดียว
                                </p>
                            </div>
                        </button>
                        <button
                            className="flex w-full gap-2.75 rouned-lg cursor-pointer p-2.5 text-left rounded-lg hover:bg-background-subtle"
                        >
                            <p
                                className="flex-none"
                            >
                                🧾
                            </p>
                            <div>
                                <p
                                    className="text-sm font-semibold"
                                >
                                   สแกนใบเสร็จ
                                </p>
                                <p
                                    className="text-xs text-foreground-muted"
                                >
                                    ให้ AI อ่านให้ สูงสุด 10 รูป
                                </p>
                            </div>
                        </button>
                    </div>}
                </div>
            </div>
            {isEntryModalOpen && <EntryFormModal onClose={() => setIsEntryModalOpen(false)} />}
        </div>
    )
}
