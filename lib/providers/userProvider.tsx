"use client";

import { createContext, useContext, useState } from "react";
import type { User } from "@/lib/types/user";

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext); // ✅ value

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}
