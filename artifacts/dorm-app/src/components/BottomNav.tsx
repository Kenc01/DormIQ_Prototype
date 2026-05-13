import { Home, Search, Building, Star, ClipboardList } from "lucide-react";

interface BottomNavProps {
  currentScreen: number;
  onNavigate: (screen: number) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: 0, label: "Home",   icon: Home },
    { id: 1, label: "Search", icon: Search },
    { id: 2, label: "Browse", icon: Building },
    { id: 3, label: "Review", icon: Star },
    { id: 4, label: "List",   icon: ClipboardList },
  ];

  // screen 5 is the Detail overlay — keep the last real tab highlighted
  const activeId = currentScreen === 5 ? -1 : currentScreen;

  return (
    <div className="flex-shrink-0 h-[64px] bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex items-center justify-around px-2 z-50 rounded-b-[32px]">
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center justify-center w-14 h-full relative"
            data-testid={`nav-tab-${tab.label.toLowerCase()}`}
          >
            {isActive && (
              <div className="absolute top-1 w-1.5 h-1.5 rounded-full bg-primary-color" />
            )}
            <Icon
              className={`w-5 h-5 mb-1 ${isActive ? "text-primary-color" : "text-gray-400"}`}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={`text-[10px] font-medium ${isActive ? "text-primary-color" : "text-gray-400"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
