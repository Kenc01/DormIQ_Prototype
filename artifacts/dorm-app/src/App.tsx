import { useState } from "react";
import StatusBar from "./components/StatusBar";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import DetailPage from "./pages/DetailPage";
import ReviewPage from "./pages/ReviewPage";
import LandlordPage from "./pages/LandlordPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import { dorms, Dorm } from "./data/dorms";

type NamedScreen = "signin" | "signup" | "settings";
type AppScreen = 0 | 1 | 2 | 3 | 4 | 5;
type Screen = NamedScreen | AppScreen;

export default function App() {
  const [screen, setScreen] = useState<Screen>("signin");
  const [selectedDorm, setSelectedDorm] = useState<Dorm | null>(null);
  const [prevScreen, setPrevScreen] = useState<AppScreen>(0);

  const navigateTo = (s: Screen) => {
    if (typeof screen === "number" && typeof s === "number") {
      setPrevScreen(screen as AppScreen);
    }
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const handleSelectDorm = (dorm: Dorm) => {
    setSelectedDorm(dorm);
    if (typeof screen === "number") setPrevScreen(screen as AppScreen);
    setScreen(5);
    window.scrollTo(0, 0);
  };

  const isAuthScreen = screen === "signin" || screen === "signup";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Phone frame — always exactly 390×812, never resizes */}
      <div
        className="relative flex flex-col bg-background overflow-hidden rounded-[40px] shadow-2xl border-[8px] border-gray-900"
        style={{ width: 390, height: 812, minWidth: 390, minHeight: 812, maxWidth: 390, maxHeight: 812 }}
      >
        {!isAuthScreen && <StatusBar />}

        {/* Scrollable content area — fills remaining space between status bar and bottom nav */}
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
          {screen === "signin" && (
            <SignInPage
              onSignIn={() => navigateTo(0)}
              onGoSignUp={() => navigateTo("signup")}
            />
          )}
          {screen === "signup" && (
            <SignUpPage
              onGoSignIn={() => navigateTo("signin")}
              onSignUp={() => navigateTo(0)}
            />
          )}
          {screen === "settings" && (
            <SettingsPage
              onBack={() => navigateTo(0)}
              onLogout={() => navigateTo("signin")}
            />
          )}
          {screen === 0 && (
            <HomePage
              onSelectDorm={handleSelectDorm}
              onBrowse={() => navigateTo(2)}
              onSearch={() => navigateTo(1)}
              onSettings={() => navigateTo("settings")}
            />
          )}
          {screen === 1 && (
            <SearchPage onSelectDorm={handleSelectDorm} />
          )}
          {screen === 2 && (
            <ResultsPage
              onSelectDorm={handleSelectDorm}
              onBack={() => navigateTo(0)}
            />
          )}
          {screen === 5 && (
            <DetailPage
              dorm={selectedDorm || dorms[0]}
              onBack={() => navigateTo(prevScreen === 5 ? 0 : prevScreen)}
            />
          )}
          {screen === 3 && (
            <ReviewPage
              onBack={() => navigateTo(0)}
              selectedDorm={selectedDorm || dorms[0]}
            />
          )}
          {screen === 4 && <LandlordPage />}
        </div>

        {!isAuthScreen && (
          <BottomNav
            currentScreen={typeof screen === "number" ? screen : 0}
            onNavigate={(s) => navigateTo(s as AppScreen)}
          />
        )}
      </div>
    </div>
  );
}
