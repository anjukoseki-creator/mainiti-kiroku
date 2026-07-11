import { useState } from "react";
import { StoreProvider } from "./store";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { CalendarPage } from "./pages/CalendarPage";
import { LogsPage } from "./pages/LogsPage";
import { ReviewPage } from "./pages/ReviewPage";
import { SettingsPage } from "./pages/SettingsPage";

export type Page = "home" | "calendar" | "logs" | "review" | "settings";

const PAGES: Record<Page, () => JSX.Element> = {
  home: Home,
  calendar: CalendarPage,
  logs: LogsPage,
  review: ReviewPage,
  settings: SettingsPage,
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const Current = PAGES[page];
  return (
    <StoreProvider>
      <Current />
      <Nav page={page} onChange={setPage} />
    </StoreProvider>
  );
}
