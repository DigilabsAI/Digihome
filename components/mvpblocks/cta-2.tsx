import { cn } from "@/lib/utils";

export default function CTA2() {
  return (
    <main className={cn("flex justify-center items-center w-full px-6 lg:px-0")}>
      <div
        className="relative w-full max-w-4xl overflow-hidden bg-background p-6 sm:p-10 md:p-20
                      border-4 border-black 
                      shadow-[10px_10px_0_#000]"
      >
        <div className="absolute inset-0 hidden h-full w-full overflow-hidden md:block">
          <div className="absolute top-1/2 right-[-45%] aspect-square h-[800px] w-[800px] -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-black opacity-20"></div>
            <div className="absolute inset-0 scale-[0.8] rounded-full bg-neutral-900 opacity-20"></div>
            <div className="absolute inset-0 scale-[0.6] rounded-full bg-neutral-800 opacity-20"></div>
            <div className="absolute inset-0 scale-[0.4] rounded-full bg-neutral-700 opacity-20"></div>
            <div className="absolute inset-0 scale-[0.2] rounded-full bg-neutral-600 opacity-20"></div>
            <div className="absolute inset-0 scale-[0.1] rounded-full bg-neutral-900 opacity-20"></div>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="mb-3 text-3xl font-extrabold text-secondary-foreground sm:text-4xl md:mb-4 md:text-5xl">
            Let&apos;s Get In Touch.
          </h1>

          <p className="mb-6 max-w-md text-base font-medium text-secondary-foreground sm:text-lg md:mb-8">
            Your laboratory instruments should serve you, not the other way
            around. We&apos;re happy to help you.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <button
              className="flex w-full items-center justify-between rounded-full
                         bg-white px-5 py-3 text-black sm:w-[240px]
                         border-4 border-black
                         shadow-[4px_4px_0_#000]
                         active:translate-x-0.5 active:translate-y-0.5"
            >
              <span className="font-bold">Test Your Samples</span>
              <span className="h-5 w-5 flex-shrink-0 rounded-full bg-black"></span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
