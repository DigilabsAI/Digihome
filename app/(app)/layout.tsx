
import { ThemeSwitcher } from "@/components/blocks/theme-switcher";
import AppHeader from "@/components/blocks/header-2";
import { LogoutButton } from "@/components/blocks/logout-button";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <AppHeader />
      <div className="flex-1 flex flex-col gap-20 max-w-7xl p-5 mt-16">
        {children}
      </div>
    </main>
  );
}
