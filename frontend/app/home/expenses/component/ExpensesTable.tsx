import React from 'react'

export default function ExpensesTable() {
  return (
    <div
        className="overflow-x-scroll scrollbar-thin-custom mt-3 pb-0.5"
    >
      <div
        className="min-w-[1184px] bg-background-card border border-border-light  rounded-[14px] overflow-hidden"
      >
        <table
            className="w-full table-fixed"
        >
            <thead>
                <tr
                    className="h-10 bg-background"
                >
                    <th
                        className="text-xs font-medium text-left text-foreground-muted pl-5"
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
                        className="w-30 text-xs font-medium text-left text-foreground-muted pr-5"
                    >
                        แก้ไข
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    className="h-17.5"
                >
                    <td>

                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
