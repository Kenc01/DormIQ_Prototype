import { Link, useLocation } from "wouter";
import { Home, Search, BarChart2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dorms", label: "Browse", icon: Search },
    { href: "/compare", label: "Compare", icon: BarChart2 },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-black flex justify-center">
      <div className="w-full max-w-[430px] bg-background relative flex flex-col shadow-2xl border-x border-border/50 min-h-[100dvh]">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-24 relative">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border pb-safe">
          <div className="flex items-center justify-around px-2 h-16">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? location === "/" : location.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}