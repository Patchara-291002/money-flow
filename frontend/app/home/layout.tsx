import Sidebar from "@/app/components/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex w-full h-screen bg-background">
      <Sidebar/>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
