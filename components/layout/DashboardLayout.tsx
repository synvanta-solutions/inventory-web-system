import type { ReactNode } from "react";

export interface DashboardLayoutProps {
  hero: ReactNode;
  stats?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
}

export function DashboardLayout({
  hero,
  stats,
  sidebar,
  children,
}: DashboardLayoutProps) {
  const contentColumnClass = sidebar ? "lg:col-span-3" : "lg:col-span-4";

  return (
    <div className="min-h-screen bg-color-background selection:bg-primary/20 w-full">
      <main className="w-full mx-auto px-3 sm:px-4 lg:px-6 pb-20">
        {hero}

        {stats ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
            {stats}
          </section>
        ) : null}

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
          <div className={`${contentColumnClass} space-y-8`}>{children}</div>

          {sidebar ? (
            <aside className="lg:col-span-1 pt-8 flex flex-col gap-6 ">
              {sidebar}
            </aside>
          ) : null}
        </section>
      </main>

      <div className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-foreground/3 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-foreground/2 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
