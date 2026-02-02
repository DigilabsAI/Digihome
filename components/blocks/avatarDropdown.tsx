"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "./logout-button";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/providers/userProvider";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "../ui/spinner";

export default function AvatarDropdown() {
  const router = useRouter();
  const { setUser, user } = useUser();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getClaims().then(({ data }) => {
      setUser(data?.claims?.profile_data ?? null);
      setLoading(false);
    });
  }, []);

  const handleManualLogout = () => {
    logout(setUser, router);
  };

  if (!user) {
    return (
      <Link
        prefetch={false}
        href="/auth/login"
        className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center space-x-2 rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200"
      >
        <span>Log in</span>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {loading ? (
          <Spinner variant="circle" />
        ) : (
          <Avatar className="cursor-pointer bg-transparent border border-border dark:border-none w-10 h-10">
            <div className="h-full w-full rounded-full bg-white">
              <Image
                src={user.avatar_url || "/default-avatar.png"}
                alt={user.name + "'s Avatar" || "User Avatar"}
                width={48}
                height={48}
              />
             <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "User"}</AvatarFallback>
            </div>
          </Avatar>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <div
          className="flex flex-col items-center justify-center py-1 gap-1
        "
        >
          <p className="px-4 text-sm text-center font-medium">{user.name}</p>
          <p className="px-4 text-xs text-muted-foreground text-center">
            {user.title}
          </p>
        </div>

        <DropdownMenuSeparator />
        {user.role === "admin" && (
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link href="/admin" className="flex w-full">
              Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <Link href={"/profile/" + user.username} className="flex w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleManualLogout}>
          <LogOut className="mr-2 h-4 w-4 text-red-600" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
