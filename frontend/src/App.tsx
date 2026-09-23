import { Routes, Route, NavLink } from "react-router";

import Generate_Page from "./pages/generate";
import Setting_Page from "./pages/setting";
import Library_Page from "./pages/library";

const tabs = [
  { to: "/", label: "Generate" },
  { to: "/library", label: "Library" },
  { to: "/settings", label: "Settings" },
];

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-chrome-bg">
      <nav className="flex items-stretch gap-1 bg-chrome-bg px-4 pt-3">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === "/"}
            className={({ isActive }) =>
              [
                "rounded-t-lg border border-b-0 px-5 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-border-dark bg-content-bg text-text-on-light"
                  : "border-transparent text-text-on-dark-muted hover:text-text-on-dark",
              ].join(" ")
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <main className="flex-1 bg-content-bg">
        <Routes>
          <Route path="/" element={<Generate_Page />} />
          <Route path="/library" element={<Library_Page />} />
          <Route path="/settings" element={<Setting_Page />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
