import { Route, Routes } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { BottomTabs } from "./components/BottomTabs";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { CartPage } from "./pages/CartPage";
import { OrdersPage } from "./pages/OrdersPage";
import { RewardsPage } from "./pages/RewardsPage";
import { AccountPage } from "./pages/AccountPage";

export default function App() {
  return (
    <div className="min-h-full">
      <TopBar />

      <main className="mx-auto max-w-md">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>

      <BottomTabs />
    </div>
  );
}
