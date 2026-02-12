"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/lib/types/user";
import { createClient } from "@/lib/supabase/client";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {

  

  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getClaims().then(({ data }) => {
      setUser(data?.claims?.profile_data ?? null);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext); 

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}
