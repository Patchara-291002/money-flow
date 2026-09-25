'use client'

import { useState, useRef, useEffect } from "react"
import { DayPicker } from "@daypicker/buddhist"
import { getDefaultClassNames } from "@daypicker/react"
import "@daypicker/react/style.css"

type DateFieldProps = {
  value: Date
  onChange: (date: Date) => void
}

export default function DateField({ value, onChange }: DateFieldProps) {

    const [month, setMonth] = useState<Date>(value);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [calendarPos, setCalendarPos] = useState<{ top?: number; bottom?: number; left: number }>({ left: 0 });
    const calendarWrapperRef = useRef<HTMLDivElement>(null);
    const dateButtonRef = useRef<HTMLButtonElement>(null);
    const defaultClassNames = getDefaultClassNames();

    const toggleCalendar = () => {
        if (!isCalendarOpen && dateButtonRef.current) {
            const rect = dateButtonRef.current.getBoundingClientRect();
            const calendarHeight = 320;
            const openUp =
                window.innerHeight - rect.bottom < calendarHeight + 12 &&
                rect.top > calendarHeight + 12;
            setCalendarPos({
                top: openUp ? undefined : rect.bottom + 6,
                bottom: openUp ? window.innerHeight - rect.top + 6 : undefined,
                left: Math.max(8, Math.min(rect.left, window.innerWidth - 272)),
            });
            setMonth(value);
        }
        setIsCalendarOpen((prev) => !prev);
    };

    const selectToday = () => {
        const today = new Date();
        onChange(today);
        setMonth(today);
        setIsCalendarOpen(false);
    };

    useEffect(() => {
        if (!isCalendarOpen) return;

        const onMouseDown = (e: MouseEvent) => {
            if (!calendarWrapperRef.current?.contains(e.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsCalendarOpen(false);
        };
        const close = () => setIsCalendarOpen(false);

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", close);
        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", close);
        };
    }, [isCalendarOpen]);

    return (
        <div
            ref={calendarWrapperRef}
            className="flex flex-col w-full"
        >
            <button
                ref={dateButtonRef}
                type="button"
                onClick={toggleCalendar}
                className={`flex items-center gap-2 h-9.5 px-4 rounded-lg bg-background text-[13px] font-semibold text-foreground text-left cursor-pointer `}
            >
                <span>📅</span>
                {value.toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}
            </button>
            {isCalendarOpen && (
                <div
                    style={{ top: calendarPos.top, bottom: calendarPos.bottom, left: calendarPos.left }}
                    className="fixed z-10 p-3 rounded-xl bg-background-card border border-border-strong shadow-lg animate-[mfPop_0.14s_ease-out]"
                >
                    <DayPicker
                        mode="single"
                        required
                        selected={value}
                        onSelect={(date) => {
                            onChange(date);
                            setIsCalendarOpen(false);
                        }}
                        month={month}
                        onMonthChange={setMonth}
                        navLayout="around"
                        numerals="latn"
                        classNames={{
                            root: `${defaultClassNames.root} text-xs text-foreground [--rdp-accent-color:var(--primary)]! [--rdp-day-width:34px]! [--rdp-day-height:34px]! [--rdp-day_button-width:32px]! [--rdp-day_button-height:32px]! [--rdp-day_button-border-radius:8px]! [--rdp-nav-height:32px]! [--rdp-nav_button-width:28px]! [--rdp-nav_button-height:28px]! [--rdp-selected-border:0_solid_transparent]!`,
                            month_caption: `${defaultClassNames.month_caption} text-[13px]! font-semibold!`,
                            weekday: `${defaultClassNames.weekday} text-[10px]! font-medium! text-foreground-subtle`,
                            chevron: `${defaultClassNames.chevron} fill-foreground-muted!`,
                            button_previous: `${defaultClassNames.button_previous} rounded-lg bg-background! cursor-pointer`,
                            button_next: `${defaultClassNames.button_next} rounded-lg bg-background! cursor-pointer`,
                            selected: `${defaultClassNames.selected} text-xs! [&>button]:bg-primary! [&>button]:text-primary-foreground! [&>button]:font-semibold!`,
                        }}
                    />
                    <button
                        type="button"
                        onClick={selectToday}
                        className="w-full h-8 mt-2 rounded-lg bg-primary-bg text-primary text-xs font-semibold cursor-pointer"
                    >
                        วันนี้
                    </button>
                </div>
            )}
        </div>
    )
}
