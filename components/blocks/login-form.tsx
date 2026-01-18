"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import Loader from "@/components/ui/loader";
import NeobruCard from "../ui/neobruCard";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  async function handleOAuthLogin(provider: Provider) {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    const loaderTimer = setTimeout(() => setShowLoader(true), 300);

    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      clearTimeout(loaderTimer);
      setIsLoading(false);
      setShowLoader(false);
    }
  }

  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      {showLoader && <Loader />}

      <NeobruCard className="">
        <header className="text-left mb-4 p-4">
          <h1 className="text-xl font-semibold">
            Welcome! Let’s get you started.
          </h1>
          <p className="text-muted-foreground">
            Access your account easily with Github or Google.
          </p>
        </header>

        <main className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center p-6 gap-2 border-secondary-foreground"
            onClick={() => handleOAuthLogin("google")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center border-secondary-foreground p-6 gap-2"
            onClick={() => handleOAuthLogin("github")}
          >
            <Github className="w-5 h-5" />
            Login with Github
          </Button>
        </main>

        {error && (
          <p className="mt-4 text-red-600 text-center" role="alert">
            {error}
          </p>
        )}
      </NeobruCard>
    </section>
  );
}
