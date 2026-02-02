import AppHeader from "@/components/blocks/header-2";
import { getUserFromJWT } from "@/lib/actions/userAction";
import { UserProvider } from "@/lib/providers/userProvider";




export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <UserProvider initialUser={null}>
        <AppHeader />
        <div className="max-w-7xl">{children}</div>
      </UserProvider>
    </main>
  );
}
