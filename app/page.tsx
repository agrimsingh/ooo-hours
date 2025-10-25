import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Office Hours</h1>
          <p className="text-lg text-foreground/70">
            Book a conversation with our co-founders
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/conversation/brian"
            className="group bg-[#171717] border border-[#2a2a2a] rounded-lg p-8 hover:border-[#3a3a3a] transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Brian</h2>
                <svg
                  className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
              <p className="text-sm text-foreground/60">Co-founder</p>
              <button className="w-full bg-foreground text-background py-3 rounded-md font-medium hover:bg-foreground/90 transition-colors">
                Book Office Hours
              </button>
            </div>
          </Link>

          <Link
            href="/conversation/hsuken"
            className="group bg-[#171717] border border-[#2a2a2a] rounded-lg p-8 hover:border-[#3a3a3a] transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Hsu Ken</h2>
                <svg
                  className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
              <p className="text-sm text-foreground/60">Co-founder</p>
              <button className="w-full bg-foreground text-background py-3 rounded-md font-medium hover:bg-foreground/90 transition-colors">
                Book Office Hours
              </button>
            </div>
          </Link>
        </div>

        <div className="text-center text-sm text-foreground/50 pt-8">
          <p>3-minute conversations powered by voice AI</p>
        </div>
      </div>
    </main>
  );
}
