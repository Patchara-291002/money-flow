import DashboardHeader from "@/app/home/dashboard/components/DashboardHeader";
import SummaryCards from "@/app/home/dashboard/components/SummaryCards";
import WeeklyBarChart from "@/app/home/dashboard/components/WeeklyBarChart";
import CategoryBreakdown from "@/app/home/dashboard/components/CategoryBreakdown";
import RecentTransactions from "@/app/home/dashboard/components/RecentTransactions";

export default function Dashboard() {
  return (
    <div className="flex-1 pt-6 px-7 pb-8 overflow-y-auto">
      <DashboardHeader />
      <div
        className="mt-5.5"
      >
        <SummaryCards />
      </div>
      <div className="grid grid-cols-[1.15fr_1fr] gap-4 mt-4">
        <WeeklyBarChart />
        <CategoryBreakdown />
      </div>
      <div>
        <RecentTransactions />
      </div>
    </div>
  );
}
