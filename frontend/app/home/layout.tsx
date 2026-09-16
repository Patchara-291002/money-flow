import Sidebar from "@/app/components/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex md:flex-row flex-col w-full h-screen bg-background">
      <Sidebar/>
      <main className="flex-1 overflow-auto scrollbar-none">
        {children}
      </main>
    </div>
  );
}
